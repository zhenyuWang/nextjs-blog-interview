import { fetchBlog } from '../../../lib/actions'

import NavBar from '@/components/NavBar/NavBar'
import BlogItem from '@/components/Blog/Item'

export default async function BlogDetailPage({ params }: { params: any }) {
  const { id } = params
  const blog = await fetchBlog(id)
  const blogInfo = {
    _id: blog._id.toString(),
    title: blog.title,
    content: blog.content,
    publishDate: blog.publishDate,
  }

  return (
    <>
      <NavBar />
      <BlogItem blog={blogInfo} />
    </>
  )
}
