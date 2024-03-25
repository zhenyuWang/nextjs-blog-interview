import mongoose from 'mongoose'

const connection = { isConnected: false }

export const connectToDB = async () => {
  try {
    if (connection.isConnected) return
    const db = await mongoose.connect(process.env.DB_CONNECT_URL!)
    connection.isConnected = !!db.connections[0].readyState
  } catch (error: any) {
    console.log('connectToDB error: ', error)
    throw new Error(error.message)
  }
}
