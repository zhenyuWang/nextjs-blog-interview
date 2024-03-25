'use client'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import { useCallback, useEffect, useState } from 'react'
import { useTheme } from '@/context/theme-context'

import { useForm, SubmitHandler } from 'react-hook-form'
import Link from 'next/link'
import FormInput from '../../components/Form/FormInput'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import EmailIcon from '@mui/icons-material/Email'
import { validationRules } from '../../utils/form'
import { toast } from 'react-toastify'
import LoadingButton from '@mui/lab/LoadingButton'

import { SignIn } from '@/app/lib/actions'

type Inputs = {
  email: string
  password: string
}

function SignInPage() {
  const router = useRouter()
  const { userInfo, setUserInfo } = useStore()
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
    const res = await SignIn(data)
    if (res?.errMsg) {
      toast.error(res.errMsg, {
        position: 'top-center',
        autoClose: 2000,
        theme,
      })
    } else {
      toast.success('Sign in successful!', {
        position: 'top-center',
        autoClose: 2000,
        theme,
      })
      setUserInfo({ email: data.email })
      setTimeout(() => {
        router.replace('/blog/list')
      }, 500)
    }
    setSubmitting(false)
  }

  return !userInfo?.email ? (
    <main className='w-100 h-screen flex flex-col items-center justify-center'>
      <div className='min-w-[300px] max-w-[360px] w-1/3 mt-[-100px]'>
        <h1 className='mb-8 text-3xl text-center font-bold text-black dark:text-white'>
          Sign In
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
              variant='outlined'
              registerOptions={{
                ...register('email', validationRules.email),
              }}
              StartIcon={EmailIcon}
              errors={errors.email}
            />
          </div>
          <div className='w-full mt-4 flex flex-col'>
            <FormInput
              label='Password'
              placeholder='please input your password'
              helperText='8~20 non-space characters'
              variant='outlined'
              registerOptions={{
                ...register('password', validationRules.password),
              }}
              type={isPasswordVisible ? 'text' : 'password'}
              StartIcon={isPasswordVisible ? LockOpenIcon : LockIcon}
              EndIcon={isPasswordVisible ? VisibilityOffIcon : VisibilityIcon}
              endAdornmentClick={togglePasswordVisibility}
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
        <div className='flex justify-between mt-4'>
          <Link className='text-sky-500' href='/sign-up'>
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  ) : null
}

export default observer(SignInPage)
