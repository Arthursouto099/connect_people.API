import express from 'express'
import userRouter from './userRoute'
import postRouter from './postRoute'

const router = express.Router()

router.use('/users', userRouter )
router.use('/posts', postRouter)



export default router