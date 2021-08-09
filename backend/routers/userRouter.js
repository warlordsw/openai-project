import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import { generateToken, isAuth } from '../utils.js'
import User from '../models/userModel.js'
import OpenAI from 'openai-api'
import dotenv from 'dotenv'

dotenv.config()

const userRouter = express.Router()

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const openai = new OpenAI(OPENAI_API_KEY)
userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user),
        })
        return
      }
    }
    res.status(401).send({ message: 'Invalid User Email or Password' })
  })
)

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    })
    try {
      const createdUser = await user.save()
      res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        token: generateToken(createdUser),
      })
    } catch (error) {
      res.status(409).send({ message: 'Email is already taken' })
    }
  })
)

userRouter.post(
  '/openai',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const data = req.body.movieText
    const openaiData = `"Back to Future: 👨👴🚗🕒\nBatman: 🤵🦇\nTransformers: 🚗🤖\nWonder Woman: 👸🏻👸🏼👸🏽👸🏾👸🏿\nWinnie the Pooh: 🐻🐼🐻\nThe Godfather: 👨👩👧🕵🏻‍♂️👲💥\nGame of Thrones: 🏹🗡🗡🏹\n${data}:"`

    try {
      const gptResponse = await openai.complete({
        engine: 'davinci',
        prompt: openaiData,
        maxTokens: 50,
        temperature: 0.9,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ['\n'],
      })
      console.log(gptResponse.data)
      if (gptResponse.data.choices[0].text === '') {
        return res
          .status(400)
          .send({ message: 'openai couldnt answer. Please try again' })
      }
      res.send(gptResponse.data.choices[0].text)
    } catch (error) {
      res.status(503).send({ message: 'Service unavailable' })
    }
  })
)

export default userRouter
