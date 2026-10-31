import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import authService from '../Appwrite/auth'
import { login } from '../store/authSlice'
import Button from './Button'
import Input from './Input'

function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const create = async (data) => {
    setError('')
    setLoading(true)
    try {
      await authService.createAccount(data)
      const userData = await authService.getCurrentUser()
      if (userData) {
        dispatch(login({ userData }))
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
      <h2 className="font-display text-3xl font-bold text-white">Create your account</h2>
      <p className="mt-2 text-slate-300">
        Already registered? <Link to="/login" className="text-coral-400 hover:underline">Log in</Link>
      </p>
      {error && <p className="mt-4 text-sm text-red-300 bg-red-500/10 rounded-lg px-3 py-2">{error}</p>}
      <form onSubmit={handleSubmit(create)} className="mt-6 space-y-4">
        <Input label="Full name" placeholder="Your name" {...register('name', { required: true })} />
        <Input label="Email" type="email" placeholder="you@example.com" {...register('email', { required: true })} />
        <Input label="Password" type="password" placeholder="At least 8 characters" {...register('password', { required: true, minLength: 8 })} />
        <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Creating…' : 'Create account'}</Button>
      </form>
    </div>
  )
}
export default Signup
