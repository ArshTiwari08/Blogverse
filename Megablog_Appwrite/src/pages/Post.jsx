import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import parse from 'html-react-parser'
import service from '../Appwrite/config'
import { getOwnerName } from '../conf/users'
import { Avatar, Button, Container } from '../components'

export default function Post() {
  const [post, setPost] = useState(null)
  const [views, setViews] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  const isAuthor = post && userData ? post.userId === userData.$id : false

  useEffect(() => {
    if (!slug) return navigate('/')
    service.getPost(slug).then((p) => (p ? setPost(p) : navigate('/')))
  }, [slug, navigate])

  // count one view per logged-in user (the author's own visits are not counted)
  useEffect(() => {
    if (!post || !userData) return
    const run = async () => {
      if (post.userId !== userData.$id) await service.recordView(post.$id, userData.$id)
      setViews(await service.getViewCount(post.$id))
    }
    run()
  }, [post, userData])

  const deletePost = async () => {
    if (!window.confirm('Delete this post? This cannot be undone.')) return
    const ok = await service.deletePost(post.$id)
    if (ok) {
      service.deleteFile(post.featuredImage)
      navigate('/my-posts')
    }
  }

  if (!post) return null
  const img = service.getFilePreview(post.featuredImage)
  const name = getOwnerName(post)
  const date = new Date(post.$createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <Container className="py-12">
      <div className="max-w-3xl mx-auto">
        {/* full image, never cropped: blurred copy fills the frame behind it */}
        <div className="relative overflow-hidden rounded-3xl bg-ink-800 shadow-2xl shadow-black/30">
          <img src={img} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-60" />
          <img src={img} alt={post.title} className="relative mx-auto w-full max-h-[560px] object-contain" />
        </div>

        <div className="mt-8 flex items-start justify-between gap-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">{post.title}</h1>
          {isAuthor && (
            <div className="flex gap-2 shrink-0">
              <Link to={`/edit-post/${post.$id}`}><Button variant="ghost">Edit</Button></Link>
              <Button variant="danger" onClick={deletePost}>Delete</Button>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center gap-3 text-slate-300">
          <Avatar name={name} size={40} />
          <span><span className="text-white font-medium">{name}</span> · {date}{views !== null && <> · {views} {views === 1 ? 'view' : 'views'}</>}</span>
        </div>

        <article className="post-content mt-8 rounded-2xl bg-paper text-ink-900 p-8">{parse(post.content)}</article>
      </div>
    </Container>
  )
}
