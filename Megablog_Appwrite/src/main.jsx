import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import store from './store/store'
import App from './App'
import './index.css'
import { AuthLayout } from './components'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AddPost from './pages/AddPost'
import EditPost from './pages/EditPost'
import MyPost from './pages/MyPost'
import Post from './pages/Post'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <AuthLayout authentication={false}><Login /></AuthLayout> },
      { path: '/signup', element: <AuthLayout authentication={false}><Signup /></AuthLayout> },
      { path: '/my-posts', element: <AuthLayout authentication><MyPost /></AuthLayout> },
      { path: '/add-post', element: <AuthLayout authentication><AddPost /></AuthLayout> },
      { path: '/edit-post/:slug', element: <AuthLayout authentication><EditPost /></AuthLayout> },
      { path: '/post/:slug', element: <AuthLayout authentication><Post /></AuthLayout> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
