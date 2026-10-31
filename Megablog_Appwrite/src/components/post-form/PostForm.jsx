import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import service from '../../Appwrite/config'
import Button from '../Button'
import Input from '../Input'
import Select from '../Select'
import RTE from '../RTE'

export default function PostForm({ post }) {
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.$id || '',
      content: post?.content || '',
      status: post?.status || 'active',
    },
  })

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string')
      return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, '-').replace(/\s/g, '-').slice(0, 36)
    return ''
  }, [])

  useEffect(() => {
    const sub = watch((value, { name }) => {
      if (name === 'title' && !post) setValue('slug', slugTransform(value.title), { shouldValidate: true })
    })
    return () => sub.unsubscribe()
  }, [watch, slugTransform, setValue, post])

  const submit = async (data) => {
    setError('')
    setSaving(true)
    try {
      if (post) {
        const file = data.image?.[0] ? await service.uploadFile(data.image[0]) : null
        if (file) service.deleteFile(post.featuredImage)
        const dbPost = await service.updatePost(post.$id, { ...data, featuredImage: file ? file.$id : post.featuredImage })
        if (dbPost) navigate(`/post/${dbPost.$id}`)
      } else {
        const file = await service.uploadFile(data.image[0])
        if (!file) throw new Error('Image upload failed. Check bucket permissions.')
        const dbPost = await service.createPost({ ...data, featuredImage: file.$id, userId: userData.$id, ownerName: userData.name })
        if (dbPost) navigate(`/post/${dbPost.$id}`)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      {error && <p className="lg:col-span-2 text-sm text-red-300 bg-red-500/10 rounded-lg px-3 py-2">{error}</p>}
      <div className="space-y-4">
        <Input label="Title" placeholder="Give your post a title" {...register('title', { required: true })} />
        <Input
          label="Slug (URL)" placeholder="post-url"
          {...register('slug', { required: true })}
          disabled={!!post}
          onInput={(e) => setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true })}
        />
        <RTE label="Content" name="content" control={control} defaultValue={getValues('content')} />
      </div>
      <div className="space-y-4">
        <Input label="Featured image" type="file" accept="image/png, image/jpg, image/jpeg, image/gif, image/webp" {...register('image', { required: !post })} />
        {post && (
          <img src={service.getFilePreview(post.featuredImage)} alt={post.title} className="rounded-xl w-full" />
        )}
        <Select options={['active', 'inactive']} label="Status" {...register('status', { required: true })} />
        <Button type="submit" className="w-full" disabled={saving}>
          {saving ? 'Saving…' : post ? 'Update post' : 'Publish post'}
        </Button>
      </div>
    </form>
  )
}
