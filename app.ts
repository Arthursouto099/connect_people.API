import express, { Request, Response } from 'express'
import helmet from 'helmet'
import path from 'path'
import cors from 'cors'
import 'dotenv/config'
import router from './src/routes/routerMain'


const app = express()
const portEnv = process.env.PORT || 4000



app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../public')))
app.use('/', router)

app.get('/ping', (req: Request, res: Response) => {
    res.send('pong')
})



app.listen(portEnv,  () => {
    console.log(`Server is running on port ${portEnv}`)
});
