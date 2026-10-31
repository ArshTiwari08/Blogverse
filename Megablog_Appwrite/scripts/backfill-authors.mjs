// One-time script: copies each author's registered name (Appwrite Auth > Users)
// onto every post in the `articles` collection, so all posts show their owner name.
//
// Run:  APPWRITE_API_KEY=your_key npm run backfill-authors          (Mac/Linux)
//       $env:APPWRITE_API_KEY="your_key"; npm run backfill-authors  (Windows PowerShell)
// API key scopes needed: users.read, documents.read, documents.write
import fs from 'fs'
import { Client, Databases, Users, Query } from 'node-appwrite'

const env = {}
for (const line of fs.readFileSync('.env', 'utf8').split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"]*)"?\s*$/)
  if (m) env[m[1]] = m[2]
}
const apiKey = process.env.APPWRITE_API_KEY
if (!apiKey) { console.error('Set APPWRITE_API_KEY first.'); process.exit(1) }

const client = new Client()
  .setEndpoint(env.VITE_APPWRITE_URL)
  .setProject(env.VITE_APPWRITE_PROJECT_ID)
  .setKey(apiKey)
const db = new Databases(client)
const users = new Users(client)
const DB = env.VITE_APPWRITE_DATABASE_ID
const COL = env.VITE_APPWRITE_COLLECTION_ID

// 1. load every post
const posts = []
let cursor = null
while (true) {
  const q = [Query.limit(100)]
  if (cursor) q.push(Query.cursorAfter(cursor))
  const res = await db.listDocuments(DB, COL, q)
  posts.push(...res.documents)
  if (res.documents.length < 100) break
  cursor = res.documents[res.documents.length - 1].$id
}
console.log(`Found ${posts.length} posts`)

// 2. look up each owner once
const names = {}
for (const id of new Set(posts.map((p) => p.userId))) {
  try { names[id] = (await users.get(id)).name }
  catch { console.log(`  user ${id} not found (deleted?)`) }
}

// 3. save the name on posts that are missing it or have a different one
let updated = 0
for (const p of posts) {
  const name = names[p.userId]
  if (name && p.ownerName !== name) {
    await db.updateDocument(DB, COL, p.$id, { ownerName: name })
    console.log(`  ${p.title} -> ${name}`)
    updated++
  }
}
console.log(`Done. Updated ${updated} posts.`)
