'use client'
import { useStore } from '@/store'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'
import Image from 'next/image'

const NavBar = () => {
  const router = useRouter()

  type UserInfo = { email: string; password: string }

  const { userInfo, isAdmin, setUserInfo } = useStore()

  const [_isAdmin, setIsAdmin] = useState(false)
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    setIsAdmin(isAdmin())
    setIsLogin(!!userInfo.email)
  }, [userInfo, isAdmin])

  const [showLeftMenu, setShowLeftMenu] = useState(false)
  const [showRightMenu, setShowRightMenu] = useState(false)

  const logout = () => {
    localStorage.removeItem('userInfo')
    setUserInfo({ email: '' } as UserInfo)
    router.replace('/sign-in')
  }

  return (
    <nav className='fixed z-50 w-full h-20 bg-sky-500 dark:bg-sky-800 px-20'>
      <div className='w-full h-full max-w-[1200px] m-auto flex items-center px-2 justify-between'>
        <div className='flex items-center'>
          <div className='items-center cursor-pointer hidden sm:flex'>
            <div className='w-10 h-10 overflow-hidden rounded-full'>
              <Image
                width={40}
                height={40}
                src='/images/avatar.png'
                alt='Logo'
                priority={true}
                className='w-100 hover:scale-110 transition-all'
              />
            </div>
            <h1 className='pl-2 font-bold text-lg text-black dark:text-white'>
              LOGO
            </h1>
          </div>
          <div className='cursor-pointer relative block sm:hidden'>
            <MenuIcon onClick={() => setShowLeftMenu(!showLeftMenu)} />
            {showLeftMenu && (
              <div
                className='w-32 cursor-pointer absolute bg-sky-400 dark:bg-slate-400 text-black dark:text-white rounded-sm p-2 top-14 left-0 z-10'
                onClick={() => setShowLeftMenu(false)}
              >
                <div className='h-10 leading-9'>
                  <Link href='/blog/list'>Blog List</Link>
                </div>
                {_isAdmin && (
                  <div className='h-10 leading-9'>
                    {' '}
                    <Link href='/blog/add'>Publish Blog</Link>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className='hidden sm:flex pl-4 text-blue-700 dark:text-sky-500'>
            <div className=' text-lg'>
              <Link href='/blog/list'>Blog List</Link>
            </div>
            {_isAdmin && (
              <div className='pl-4 text-lg'>
                <Link href='/blog/add'>Publish Blog</Link>
              </div>
            )}
          </div>
        </div>

        {isLogin ? (
          <div className='relative'>
            <div
              className='w-12 h-12 overflow-hidden rounded-full'
              onClick={() => setShowRightMenu(!showRightMenu)}
            >
              <Image
                width={50}
                height={50}
                src='/images/avatar.png'
                alt='Logo'
                priority={true}
                className='w-100 hover:scale-110 transition-all  cursor-pointer'
              />
              {showRightMenu && (
                <div
                  className='min-w-32 cursor-pointer absolute bg-sky-400 dark:bg-slate-400 text-black dark:text-white rounded-sm p-2 top-16 right-0 z-10'
                  onClick={() => setShowRightMenu(false)}
                >
                  <div className='h-10 leading-9'>{userInfo.email}</div>
                  <div
                    className='h-10 leading-9 text-center text-blue-800 dark:text-sky-700'
                    onClick={logout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className='h-full flex items-center text-blue-700 dark:text-sky-500'>
            <Link href='/sign-in'>Sign In</Link>
            <Link className='ml-2' href='/sign-up'>
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar
