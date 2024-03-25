'use client'

import { useTheme } from '@/context/theme-context'
import Link from 'next/link'
import GitHubIcon from '@mui/icons-material/GitHub'

export default function ThemeSwitch() {
  const themeContext = useTheme()
  const theme = themeContext?.theme

  return (
    <Link
      href='https://github.com/zhenyuWang/nextjs-blog-interview'
      target='_blank'
      className='fixed bottom-14 right-4 z-50 shadow-2xl hover:scale-[1.15] active:scale-105 transition-all'
    >
      <GitHubIcon
        sx={{
          color: `${theme === 'light' ? 'black' : 'white'}`,
        }}
      />
    </Link>
  )
}
