import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// authentication = true  → page needs login
// authentication = false → page is for guests only (login / signup)
export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    if (authentication && authStatus !== authentication) navigate('/login')
    else if (!authentication && authStatus !== authentication) navigate('/')
    setLoader(false)
  }, [authStatus, navigate, authentication])

  return loader ? <p className="text-center py-20 text-slate-300">Loading…</p> : <>{children}</>
}
