import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    publishDate: {
      type: String,
    },
  },
  { timestamps: true },
)

export const User = mongoose.models.User || mongoose.model('User', userSchema)
export const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema)
