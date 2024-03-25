import { fetchBlogs } from '../../lib/actions'

import type { Blog } from '@/types/blog'

import NavBar from '@/components/NavBar/NavBar'
import BlogList from '@/components/Blog/List'

export default async function BlogListPage() {
  const blogs = await fetchBlogs()
  let blogList: Blog[] = []

  if (Array.isArray(blogs)) {
    blogList = blogs.map((blog) => {
      return {
        _id: blog._id.toString(),
        title: blog.title,
        content: blog.content,
        publishDate: blog.publishDate,
      }
    })
  }
  return (
    <>
      <NavBar />
      <BlogList list={blogList} />
    </>
  )
}
