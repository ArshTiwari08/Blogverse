import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <Container className="py-12">
      <h1 className="font-display text-4xl font-bold text-white mb-8">Write a post</h1>
      <PostForm />
    </Container>
  )
}
export default AddPost
