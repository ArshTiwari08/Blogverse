import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import service from '../Appwrite/config'
import { getOwnerName } from '../conf/users'
import { Container, PostCard, Button } from '../components'

function Home() {
  const authStatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userData)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [viewed, setViewed] = useState(new Set())

  useEffect(() => {
    if (!authStatus) { setLoading(false); return }
    if (userData) service.getMyViewedIds(userData.$id).then(setViewed)
    service.getPosts().then((res) => {
      if (res) setPosts(service.backfillAuthor(res.documents, userData))
      setLoading(false)
    })
  }, [authStatus, userData])

  const shown = useMemo(() => {
    const q = search.trim().toLowerCase()
    return q ? posts.filter((p) => p.title.toLowerCase().includes(q) || getOwnerName(p).toLowerCase().includes(q)) : posts
  }, [posts, search])

  if (!authStatus) {
    return (
      <Container className="py-24">
        <div className="mx-auto max-w-lg rounded-3xl bg-paper text-ink-900 p-10 text-center shadow-2xl shadow-black/30">
          <div className="text-5xl">🔐</div>
          <h1 className="mt-4 font-display text-3xl font-bold">Login to read posts</h1>
          <p className="mt-2 text-slate-600">Log in to explore and read stories from the BlogVerse community.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/login"><Button>Log in</Button></Link>
            <Link to="/signup"><Button variant="ghost" className="!text-ink-900 !border-ink-900/20 !bg-ink-900/5 hover:!bg-ink-900/10">Create account</Button></Link>
          </div>
        </div>
      </Container>
    )
  }

  const first = (userData?.name || 'writer').split(' ')[0]

  return (
    <Container className="py-10">
      {/* welcome banner */}
      <section className="relative overflow-hidden rounded-3xl p-8 md:p-12 ring-1 ring-white/15" style={{ background: 'linear-gradient(120deg, #3a2d5c 0%, #2a3350 45%, #8a3a55 100%)' }}>
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-coral-500/25 blur-3xl" aria-hidden="true" />
        <h1 className="relative font-display text-4xl md:text-5xl font-bold text-white leading-tight">Hi {first}, what will you write today?</h1>
        <p className="relative mt-3 max-w-xl text-slate-200">Read what the community is sharing, or publish a story of your own.</p>
        <div className="relative mt-6 flex flex-wrap items-center gap-3">
          <Link to="/add-post"><Button>Write a story</Button></Link>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or author"
            aria-label="Search stories"
            className="w-full sm:w-80 px-4 py-2.5 rounded-xl bg-white/15 border border-white/20 text-white placeholder-slate-300 outline-none focus:border-coral-400"
          />
        </div>
      </section>

      <div className="mt-10 flex items-baseline justify-between">
        <h2 className="font-display text-3xl font-bold text-white">All stories</h2>
        <span className="text-sm text-slate-300">{shown.length} {shown.length === 1 ? 'story' : 'stories'}</span>
      </div>

      {loading ? (
        <p className="mt-10 text-slate-300">Loading stories…</p>
      ) : shown.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-white/20 p-10 text-center">
          <p className="text-slate-200">{search ? 'No stories match your search.' : 'No stories yet. Be the first to write one.'}</p>
          {!search && <Link to="/add-post"><Button className="mt-4">Write a story</Button></Link>}
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((p) => <PostCard key={p.$id} {...p} viewedByMe={viewed.has(p.$id)} />)}
        </div>
      )}
    </Container>
  )
}
export default Home
