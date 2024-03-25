'use client'

import type { Blog } from '@/types/blog'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useStore } from '@/store'

import ReactMarkdown from 'react-markdown'

export default function Blog({ blog }: { blog: Blog }) {
  const router = useRouter()

  const { userInfo } = useStore()
  useEffect(() => {
    if (!userInfo?.email) {
      router.replace('/sign-in')
    }
  }, [userInfo, router])

  const { title, publishDate, content } = blog

  return (
    <main className='w-100 flex flex-col items-center pt-28 pb-10 px-10'>
      <div className='w-full max-w-[1200px text-black dark:text-white'>
        <div className='text-2xl font-bold text-center'>{title}</div>
        <div className='mt-4 mb-6 text-sm text-center'>
          Publish Date: {publishDate}
        </div>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </main>
  )
}
