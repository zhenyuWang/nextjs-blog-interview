'use client'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store'
import { useEffect, useState } from 'react'
import { useTheme } from '@/context/theme-context'

import NavBar from '@/components/NavBar/NavBar'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import FormInput from '../../../components/Form/FormInput'
import PersonIcon from '@mui/icons-material/Person'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { validationRules } from '../../../utils/form'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import MDEditor from '@uiw/react-md-editor'
import { toast } from 'react-toastify'
import LoadingButton from '@mui/lab/LoadingButton'

import { createBlog } from '../../lib/actions'

type Inputs = {
  title: string
  content: string
  publishDate: string
}

export default function CreateBlog() {
  const router = useRouter()

  const { isAdmin } = useStore()
  useEffect(() => {
    if (!isAdmin()) {
      router.replace('/sign-in')
    }
  }, [isAdmin, router])

  const themeContext = useTheme()
  const theme = themeContext?.theme

  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    setSubmitting(true)
    if (!content) {
      toast.error('Blog content is required!', {
        position: 'top-center',
        autoClose: 2000,
        theme,
      })
      setSubmitting(false)
      return
    }
    data.publishDate = dayjs(data.publishDate).format('YYYY-MM-DD')

    const res = await createBlog({ ...data, content })
    if (res?.errMsg) {
      toast.error(res.errMsg, {
        position: 'top-center',
        autoClose: 2000,
        theme,
      })
    } else {
      toast.success('Create blog successful!', {
        position: 'top-center',
        autoClose: 2000,
        theme,
      })
      setTimeout(() => {
        router.replace('/blog/list')
      }, 500)
    }
    setSubmitting(false)
  }

  return (
    <>
      <NavBar />
      <main className='w-100 pt-48 flex flex-col items-center justify-center'>
        <div className='min-w-[300px] max-w-[800px] w-10/12 mt-[-100px]'>
          <h1 className='mb-16 text-3xl text-center font-bold text-black dark:text-white'>
            Create Blog
          </h1>
          <form
            className='flex flex-col items-center'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='w-full flex flex-col lg:flex-row justify-between'>
              <div className='w-full flex flex-col'>
                <FormInput
                  label='Title'
                  placeholder='please input your title'
                  className='min-w-[300px] max-w-[360px]'
                  helperText=''
                  variant='outlined'
                  registerOptions={{
                    ...register('title', validationRules.blogTitle),
                  }}
                  StartIcon={PersonIcon}
                  errors={errors.title}
                />
              </div>
              <div className='flex flex-col'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name='publishDate'
                    control={control}
                    rules={{ required: 'Publish date is required' }}
                    render={({ field: { onChange, value } }) => (
                      <DatePicker
                        label='publish date'
                        value={value}
                        className='min-w-[300px] max-w-[360px] mt-6 lg:mt-0 custom-input'
                        minDate={dayjs().subtract(150, 'year')}
                        maxDate={dayjs()}
                        views={['year', 'month', 'day']}
                        onChange={onChange}
                      />
                    )}
                  />
                </LocalizationProvider>
                <span className='mt-1 mb-5 text-orange-500 text-sm'>
                  {errors.publishDate?.message}
                </span>
              </div>
            </div>
            <div className='w-full flex flex-col'>
              <div className='pb-4'>Content:</div>
              <MDEditor
                value={content}
                onChange={(value) => setContent(value || '')}
              />
            </div>
            <LoadingButton
              className='w-full max-w-[360px] mt-6 py-3 bg-sky-400 text-black dark:text-white hover:bg-sky-500 active:bg-sky-600 transition-all'
              loading={submitting}
              type='submit'
            >
              Submit
            </LoadingButton>
          </form>
        </div>
      </main>
    </>
  )
}
