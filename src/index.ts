import 'reflect-metadata'

import dotenv from 'dotenv'
import mongoose from 'mongoose'
import app from './app'

dotenv.config()
const connString = process.env.CONNECTION_STRING ?? ''
const port = process.env.PORT
const env = process.env.NODE_ENV

if (env != 'production') mongoose.set('debug', true)

mongoose
  .connect(connString)
  .then((_) => {
    console.log('Connected to db')
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
  })
  .catch((err) => {
    console.error(err)
  })
