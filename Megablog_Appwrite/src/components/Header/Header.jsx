import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import Container from '../container/Container'
import Logo from '../Logo'
import LogoutBtn from './LogoutBtn'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const [open, setOpen] = useState(false)

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'My Posts', slug: '/my-posts', active: authStatus },
    { name: 'Write a Post', slug: '/add-post', active: authStatus },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
  ]

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-xl transition-colors ${isActive ? 'bg-white/15 text-white' : 'text-slate-200 hover:bg-white/10'}`

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-ink-900/80 border-b border-white/10">
      <Container>
        <nav className="flex items-center justify-between h-16">
          <Link to="/" className="text-white"><Logo /></Link>

          <button className="md:hidden text-white p-2" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} /></svg>
          </button>

          <ul className="hidden md:flex items-center gap-1">
            {navItems.filter((i) => i.active).map((i) => (
              <li key={i.name}><NavLink to={i.slug} end className={linkClass}>{i.name}</NavLink></li>
            ))}
            {authStatus && <li><LogoutBtn /></li>}
          </ul>
        </nav>

        {open && (
          <ul className="md:hidden pb-4 flex flex-col gap-1" onClick={() => setOpen(false)}>
            {navItems.filter((i) => i.active).map((i) => (
              <li key={i.name}><NavLink to={i.slug} end className={linkClass}>{i.name}</NavLink></li>
            ))}
            {authStatus && <li><LogoutBtn /></li>}
          </ul>
        )}
      </Container>
    </header>
  )
}
export default Header
