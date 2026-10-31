import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Query } from 'appwrite'
import service from '../Appwrite/config'
import { Container, PostCard, Button } from '../components'

function MyPost() {
  const userData = useSelector((state) => state.auth.userData)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userData) return
    service.getPosts([Query.equal('userId', userData.$id)]).then((res) => {
      if (res) setPosts(service.backfillAuthor(res.documents, userData))
      setLoading(false)
    })
  }, [userData])

  return (
    <Container className="py-12">
      <div className="flex items-end justify-between gap-4">
        <h1 className="font-display text-4xl font-bold text-white">My posts</h1>
        <Link to="/add-post"><Button>Write a post</Button></Link>
      </div>
      {loading ? (
        <p className="mt-10 text-slate-300">Loading…</p>
      ) : posts.length === 0 ? (
        <p className="mt-10 text-slate-300">You haven’t written anything yet. Start with your first post.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((p) => <PostCard key={p.$id} {...p} showStatus />)}
        </div>
      )}
    </Container>
  )
}
export default MyPost
