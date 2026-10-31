import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import authService from '../Appwrite/auth'
import { login as authLogin } from '../store/authSlice'
import Button from './Button'
import Input from './Input'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const login = async (data) => {
    setError('')
    setLoading(true)
    try {
      await authService.login(data)
      const userData = await authService.getCurrentUser()
      if (userData) {
        dispatch(authLogin({ userData }))
        navigate('/')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl bg-white/10 backdrop-blur border border-white/15 p-8 shadow-2xl">
      <h2 className="font-display text-3xl font-bold text-white">Welcome back</h2>
      <p className="mt-2 text-slate-300">
        New here? <Link to="/signup" className="text-coral-400 hover:underline">Create an account</Link>
      </p>
      {error && <p className="mt-4 text-sm text-red-300 bg-red-500/10 rounded-lg px-3 py-2">{error}</p>}
      <form onSubmit={handleSubmit(login)} className="mt-6 space-y-4">
        <Input label="Email" type="email" placeholder="you@example.com" {...register('email', { required: true })} />
        <Input label="Password" type="password" placeholder="Your password" {...register('password', { required: true })} />
        <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Signing in…' : 'Log in'}</Button>
      </form>
    </div>
  )
}
export default Login
