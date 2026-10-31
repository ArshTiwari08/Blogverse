import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../Appwrite/config'
import { Container, PostForm } from '../components'

function EditPost() {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!slug) return navigate('/')
    service.getPost(slug).then((p) => (p ? setPost(p) : navigate('/')))
  }, [slug, navigate])

  return post ? (
    <Container className="py-12">
      <h1 className="font-display text-4xl font-bold text-white mb-8">Edit post</h1>
      <PostForm post={post} />
    </Container>
  ) : null
}
export default EditPost
