'use client'

import { fetchBlogs } from '../../lib/actions'

import type { Blog } from '@/types/blog'

import NavBar from '@/components/NavBar/NavBar'
import BlogList from '@/components/Blog/List'
import { useEffect, useState } from 'react'

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    async function getBlogs() {
      const blogs = await fetchBlogs()
      if (Array.isArray(blogs)) {
        setBlogs(
          blogs.map((blog) => {
            return {
              _id: blog._id.toString(),
              title: blog.title,
              content: blog.content,
              publishDate: blog.publishDate,
            }
          }),
        )
      }
    }
    getBlogs()
  }, [])
  return (
    <>
      <NavBar />
      <BlogList list={blogs} />
    </>
  )
}
