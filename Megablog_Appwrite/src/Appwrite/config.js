import conf from '../conf/conf.js'
import { Client, ID, Databases, Storage, Query } from 'appwrite'

export class Service {
  client = new Client()
  databases
  bucket

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.client)
  }

  // CREATE  (slug is used as the document id)
  async createPost({ title, slug, content, featuredImage, status, userId, ownerName, category }) {
    return await this.databases.createDocument(
      conf.appwriteDatabaseId, conf.appwriteCollectionId, slug,
      { title, content, featuredImage, status, userId, ownerName, category }
    )
  }

  // UPDATE
  async updatePost(slug, { title, content, featuredImage, status, category }) {
    return await this.databases.updateDocument(
      conf.appwriteDatabaseId, conf.appwriteCollectionId, slug,
      { title, content, featuredImage, status, category }
    )
  }

  // DELETE
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
      return true
    } catch (error) {
      console.log('Appwrite deletePost error:', error)
      return false
    }
  }

  // READ one
  async getPost(slug) {
    try {
      return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
    } catch (error) {
      console.log('Appwrite getPost error:', error)
      return null
    }
  }

  // READ many
  async getPosts(queries = [Query.equal('status', 'active')]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId, conf.appwriteCollectionId,
        [...queries, Query.orderDesc('$createdAt'), Query.limit(100)]
      )
    } catch (error) {
      console.log('Appwrite getPosts error:', error)
      return null
    }
  }

  // VIEWS: one document per (post, logged-in user) in the `views` collection
  viewing = new Set()

  async recordView(postId, userId) {
    const key = postId + userId
    console.log('[views] table:', conf.appwriteViewsCollectionId, '| post:', postId, '| user:', userId)
    if (this.viewing.has(key)) return // blocks the double call from React StrictMode
    this.viewing.add(key)
    try {
      const found = await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteViewsCollectionId,
        [Query.equal('postId', postId), Query.equal('userId', userId), Query.limit(1)])
      if (found.total === 0) {
        await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteViewsCollectionId, ID.unique(), { postId, userId })
        console.log('[views] view saved')
      } else {
        console.log('[views] already counted for this user')
      }
    } catch (error) {
      console.log('Appwrite recordView error:', error)
    } finally {
      this.viewing.delete(key)
    }
  }

  async getViewCount(postId) {
    try {
      const res = await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteViewsCollectionId,
        [Query.equal('postId', postId), Query.limit(1)])
      return res.total
    } catch (error) {
      console.log('Appwrite getViewCount error:', error)
      return 0
    }
  }

  async getMyViewedIds(userId) {
    try {
      const res = await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteViewsCollectionId,
        [Query.equal('userId', userId), Query.limit(500)])
      return new Set(res.documents.map((d) => d.postId))
    } catch (error) {
      console.log('Appwrite getMyViewedIds error:', error)
      return new Set()
    }
  }

  // Old posts have no ownerName: when the owner is logged in, save their registered name onto them.
  backfillAuthor(posts, userData) {
    if (!userData) return posts
    return posts.map((p) => {
      if (!p.ownerName && p.userId === userData.$id) {
        this.databases
          .updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, p.$id, { ownerName: userData.name })
          .catch((e) => console.log('backfill ownerName failed:', e))
        return { ...p, ownerName: userData.name }
      }
      return p
    })
  }

  // FILES
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file)
    } catch (error) {
      console.log('Appwrite uploadFile error:', error)
      return null
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId)
      return true
    } catch (error) {
      console.log('Appwrite deleteFile error:', error)
      return false
    }
  }

  getFilePreview(fileId) {
    return String(this.bucket.getFileView(conf.appwriteBucketId, fileId))
  }
}

const service = new Service()
export default service
