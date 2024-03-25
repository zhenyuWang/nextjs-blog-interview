'use server'

import { User, Blog } from './models'
import { connectToDB } from './utils'
// @ts-ignore
import bcrypt from 'bcrypt'

const EMAIL_VERIFICATION_CODE_EXPIRY = 60 * 1000
const EMAIL_VERIFICATION_CODE_MAP = new Map()
let salt = '$2b$10$Fvf2m0p13O8FW8n4FdX5cO'

const generateVerificationCode = () => {
  return Math.round(100000 + Math.random() * 900000)
}

export const generateEmailVerificationCode = (email: string) => {
  if (EMAIL_VERIFICATION_CODE_MAP.has(email)) {
    const preCodeInfo = EMAIL_VERIFICATION_CODE_MAP.get(email)
    const now = Date.now()
    if (now - preCodeInfo.time < EMAIL_VERIFICATION_CODE_EXPIRY) {
      return { errMsg: 'Please wait for a while before requesting a new code.' }
    }
    const code = generateVerificationCode()
    EMAIL_VERIFICATION_CODE_MAP.set(email, { code, time: now })
    return { code }
  }
  const code = generateVerificationCode()
  EMAIL_VERIFICATION_CODE_MAP.set(email, { code, time: Date.now() })

  setTimeout(() => {
    EMAIL_VERIFICATION_CODE_MAP.delete(email)
  }, EMAIL_VERIFICATION_CODE_EXPIRY)

  return { code }
}

export const createUser = async (userInfo: any) => {
  const { email, password } = userInfo

  try {
    connectToDB()

    const user = await User.findOne({ email })
    if (user) {
      return { errMsg: 'User already exists.' }
    }

    if (!salt) {
      salt = await bcrypt.genSalt(10)
    }
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      email,
      password: hashedPassword,
    })

    await newUser.save()
  } catch (err) {
    return { errMsg: 'Failed to create user!' }
  }
}

export const SignIn = async (userInfo: any) => {
  const { email, password } = userInfo

  try {
    connectToDB()

    const user = await User.findOne({ email })
    if (!user) {
      return { errMsg: 'User not exist.' }
    }

    if (!salt) {
      salt = await bcrypt.genSalt(10)
    }
    const hashedPassword = await bcrypt.hash(password, salt)

    if (user.password !== hashedPassword) {
      return { errMsg: 'Email or password is incorrect.' }
    }
  } catch (err) {
    console.log('createUser error:', err)
    return { errMsg: 'Failed to create user!' }
  }
}

export const fetchBlogs = async () => {
  try {
    connectToDB()

    return await Blog.find()
  } catch (err) {
    console.log(err)
    return { errMsg: 'Failed to fetch blogs!' }
  }
}

export const fetchBlog = async (id: string) => {
  try {
    connectToDB()
    return await Blog.findById(id)
  } catch (err) {
    console.log(err)
    return { errMsg: 'Failed to fetch blog!' }
  }
}

export const createBlog = async (blogInfo: any) => {
  const { title, publishDate, content } = blogInfo
  try {
    connectToDB()
    const newBlog = new Blog({
      title,
      publishDate,
      content,
    })
    await newBlog.save()
  } catch (err) {
    // TODO: optimize request failure interactions
    console.log(err)
    return { errMsg: 'Failed to create blog!' }
  }
}

export const deleteBlog = async (id: string) => {
  try {
    connectToDB()

    await Blog.findByIdAndDelete(id)
    return {}
  } catch (err) {
    // TODO: optimize request failure interactions
    console.log(err)
    return { errMsg: 'Failed to delete blog!' }
  }
}

export const updateBlog = async (blogInfo: any) => {
  try {
    connectToDB()
    const { _id, title, publishDate, content } = blogInfo
    const updateFields = {
      title,
      publishDate,
      content,
    }

    await Blog.findByIdAndUpdate(_id, updateFields)
    return {}
  } catch (err) {
    console.log(err)
    return { errMsg: 'Failed to update blog!' }
  }
}
