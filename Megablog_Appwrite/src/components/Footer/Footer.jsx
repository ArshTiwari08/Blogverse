import { Link } from 'react-router-dom'
import Container from '../container/Container'
import Logo from '../Logo'

const linkCls = 'block text-slate-200 hover:text-coral-400 transition-colors py-1'

function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-ink-900 text-slate-300">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1.2fr]">
          <div>
            <Logo className="text-white" />
            <p className="mt-4 text-sm leading-relaxed max-w-sm">
              BlogVerse is a modern blogging platform designed to give people a simple and engaging space to share their ideas, knowledge, experiences, and stories.
            </p>
            <p className="mt-2 text-sm">Write. Share. Discover. Welcome to BlogVerse.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Explore</h4>
            <Link className={linkCls} to="/">Home</Link>
            <Link className={linkCls} to="/my-posts">My Posts</Link>
            <Link className={linkCls} to="/add-post">Write a Post</Link>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Account</h4>
            <Link className={linkCls} to="/login">Login</Link>
            <Link className={linkCls} to="/signup">Create Account</Link>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">BlogVerse</h4>
            <p className="text-sm">Share your thoughts. Discover new perspectives. Connect through stories.</p>
          </div>
        </div>
        <p className="mt-10 text-sm text-slate-400">© {new Date().getFullYear()} BlogVerse. All rights reserved.</p>
      </Container>
    </footer>
  )
}
export default Footer
