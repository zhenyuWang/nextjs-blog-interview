'use client'

import { useRouter } from 'next/navigation'
import { useStore } from '@/store'
import { useEffect } from 'react'

import Image from 'next/image'

export default function Home() {
  const router = useRouter()
  const { userInfo } = useStore()
  useEffect(() => {
    if (!userInfo?.email) {
      router.replace('/sign-in')
    } else {
      router.replace('/blog/list')
    }
  }, [userInfo, router])

  return userInfo?.email ? (
    <main className='flex min-h-screen flex-col items-center'>
      <Image
        className='rounded-[50%] mt-60'
        src='/images/avatar.png'
        alt='avatar'
        width={100}
        height={100}
      />
      <h1 className='mt-6 text-lg text-black dark:text-white'>
        Nextjs development framework
      </h1>
    </main>
  ) : null
}
