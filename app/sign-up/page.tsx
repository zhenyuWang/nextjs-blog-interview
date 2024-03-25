'use client'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useStore } from '@/store'
import { useTheme } from '@/context/theme-context'

import { useForm, SubmitHandler } from 'react-hook-form'
import Link from 'next/link'
import FormInput from '../../components/Form/FormInput'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { validationRules } from '../../utils/form'
import { toast } from 'react-toastify'
import LoadingButton from '@mui/lab/LoadingButton'

import { createUser } from '@/app/lib/actions'

type Inputs = {
  email: string
  password: string
}

export default function SignUp() {
  const router = useRouter()
  const { userInfo } = useStore()
  useEffect(() => {
    if (userInfo?.email) {
      router.replace('/blog/list')
    }
  }, [userInfo, router])

  const themeContext = useTheme()
  const theme = themeContext?.theme

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = useCallback(
    () => setIsPasswordVisible(!isPasswordVisible),
    [isPasswordVisible],
  )

  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    setSubmitting(true)
    const res = await createUser({ ...data })
    if (res?.errMsg) {
      toast.error(res.errMsg, {
        position: 'top-center',
        autoClose: 2000,
        theme,
      })
    } else {
      toast.success('Sign up successful!', {
        position: 'top-center',
        autoClose: 2000,
        theme,
      })
      setTimeout(() => {
        router.replace('/sign-in')
      }, 500)
    }
    setSubmitting(false)
  }

  return !userInfo?.name ? (
    <main className='w-100 h-screen flex flex-col items-center justify-center'>
      <div className='min-w-[300px] max-w-[360px] w-1/3 mt-[-100px]'>
        <h1 className='mb-8 text-3xl text-center font-bold text-black dark:text-white'>
          Sign Up
        </h1>
        <form
          className='flex flex-col items-center'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='w-full flex flex-col'>
            <FormInput
              label='Email'
              placeholder='please input your email'
              helperText='The email you used to register your account'
              StartIcon={EmailIcon}
              registerOptions={{
                ...register('email', validationRules.email),
              }}
              errors={errors.email}
            />
          </div>
          <div className='w-full mt-4 flex flex-col'>
            <FormInput
              label='Password'
              placeholder='please input your password'
              helperText='8~20 non-space characters'
              registerOptions={{
                ...register('password', validationRules.password),
              }}
              StartIcon={isPasswordVisible ? LockOpenIcon : LockIcon}
              EndIcon={isPasswordVisible ? VisibilityOffIcon : VisibilityIcon}
              endAdornmentClick={togglePasswordVisibility}
              type={isPasswordVisible ? 'text' : 'password'}
              errors={errors.password}
            />
          </div>
          <LoadingButton
            className='w-full mt-6 py-3 bg-sky-400 text-black dark:text-white hover:bg-sky-500 active:bg-sky-600 transition-all'
            loading={submitting}
            type='submit'
          >
            Submit
          </LoadingButton>
        </form>
        <div className='mt-4'>
          <Link className='text-sky-500' href='/sign-in'>
            Sign In
          </Link>
        </div>
      </div>
    </main>
  ) : null
}
