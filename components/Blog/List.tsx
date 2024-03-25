'use client'

import type { Blog } from '@/types/blog'

import ListItem from './ListItem'

export default function BlogList({ list }: { list: Blog[] }) {
  return (
    <main className='w-100 pt-28 px-10 flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold text-black dark:text-white'>
        Blog List
      </h1>
      <div className='w-full min-w-[300px] max-w-[600px] pt-10'>
        {list.map((blog) => (
          <ListItem key={blog._id} blog={blog} />
        ))}
      </div>
    </main>
  )
}
