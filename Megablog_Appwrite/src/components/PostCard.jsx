import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import service from '../Appwrite/config'
import Avatar from './Avatar'
import { getOwnerName } from '../conf/users'

const plainText = (html = '') => html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()

function PostCard({ $id, title, content, featuredImage, status, ownerName, userId, category, $createdAt, showStatus = false, viewedByMe = false }) {
  const [views, setViews] = useState(null)
  useEffect(() => { service.getViewCount($id).then(setViews) }, [$id])
  const name = getOwnerName({ ownerName, userId })
  const text = plainText(content)
  const date = $createdAt ? new Date($createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : ''
  const img = service.getFilePreview(featuredImage)

  return (
    <Link to={`/post/${$id}`} className="group flex flex-col rounded-2xl overflow-hidden bg-paper text-ink-900 shadow-lg shadow-black/25 ring-1 ring-white/10 hover:-translate-y-1 hover:shadow-2xl hover:shadow-coral-500/10 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral-400">
      {/* owner on top */}
      <div className="flex items-center gap-3 p-4">
        <Avatar name={name} size={40} />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm leading-tight truncate">{name}</p>
          <p className="flex items-center gap-1 text-xs text-slate-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" /><circle cx="12" cy="12" r="3" /></svg>
            {views === null ? '…' : views} {views === 1 ? 'view' : 'views'}
          </p>
        </div>
        {viewedByMe && !showStatus && (
          <span className="shrink-0 text-xs font-medium px-2.5 py-1 rounded-full bg-sky-100 text-sky-700">✓ Viewed</span>
        )}
        {showStatus && (
          <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
            {status === 'active' ? 'Published' : 'Draft'}
          </span>
        )}
      </div>

      {/* whole picture is always visible; blurred copy fills any spare space */}
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-800">
        <img src={img} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover scale-110 blur-xl opacity-70" />
        <img src={img} alt={title} loading="lazy" className="relative h-full w-full object-contain group-hover:scale-[1.03] transition-transform duration-500" />
      </div>

      <div className="flex-1 p-4">
        <span className="inline-block mb-2 text-xs font-semibold px-2.5 py-1 rounded-full bg-coral-500/10 text-coral-600">{category || 'Other'}</span>
        <h3 className="font-display text-xl font-semibold leading-snug line-clamp-2">{title}</h3>
        {text && <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-3">{text}</p>}
      </div>

      {/* posted date at the bottom */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-ink-900/10 text-xs">
        <span className="text-slate-500">Posted on {date}</span>
        <span className="font-semibold text-coral-600 group-hover:underline">Read story</span>
      </div>
    </Link>
  )
}
export default PostCard
