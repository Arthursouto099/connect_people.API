import express from 'express'
import userRouter from './userRoute'
import postRouter from './postRoute'
import comentRouter from './comentRoute'

const router = express.Router()

router.use('/users', userRouter )
router.use('/posts', postRouter)
router.use('/coments', comentRouter)



export default router