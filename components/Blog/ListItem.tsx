'use client'

import type { Blog } from '@/types/blog'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Blog({ blog }: { blog: Blog }) {
  const { title, publishDate } = blog

  const router = useRouter()

  const goDetailPage = (id: string) => {
    router.push(`/blog/detail/${id}`)
  }

  return (
    <div
      onClick={() => goDetailPage(blog._id)}
      className='flex mb-8 bg-white dark:bg-slate-700 rounded-md shadow cursor-pointer'
    >
      <div className='w-[220px] overflow-hidden'>
        <Image
          width={220}
          height={220}
          src='/images/article-cover.jpg'
          alt={title}
          priority={true}
          className='w-100 hover:scale-110 transition-all'
        />
      </div>
      <div className='px-8 -mt-10 flex justify-center flex-col text-black dark:text-white'>
        <div className='font-bold text-lg pb-4 overflow-hidden overflow-ellipsis whitespace-nowrap'>
          {title}
        </div>
        <div>{publishDate}</div>
      </div>
    </div>
  )
}
