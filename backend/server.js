import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routers/userRouter.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const CONNECTION_URL =
  'mongodb+srv://caner:delidana@cluster0.ehi11.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

app.use('/api/users', userRouter)
app.get('/', (req, res) => {
  res.send('Server is Ready')
})

const port = process.env.port || 5001
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`)
})
