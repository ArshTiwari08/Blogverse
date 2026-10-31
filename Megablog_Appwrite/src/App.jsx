import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import authService from './Appwrite/auth'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => (userData ? dispatch(login({ userData })) : dispatch(logout())))
      .finally(() => setLoading(false))
  }, [dispatch])

  if (loading) return <div className="min-h-screen grid place-items-center text-slate-300">Loading BlogVerse…</div>

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  )
}
export default App
