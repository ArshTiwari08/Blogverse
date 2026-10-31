import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../../Appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () =>
    authService.logout().then(() => {
      dispatch(logout())
      navigate('/')
    })
  return (
    <button onClick={handleLogout} className="px-4 py-2 rounded-xl text-slate-100 hover:bg-white/10 transition-colors">
      Logout
    </button>
  )
}
export default LogoutBtn
