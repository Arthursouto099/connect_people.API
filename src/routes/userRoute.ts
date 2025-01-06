import express, {Request, Response} from 'express'
import { User } from '../models/User'
import { UserController } from '../controllers/UserController'
import { PasswordSecurity } from '../classes/PasswordSecurity'
import { Login } from '../models/Login'

const userRouter = express.Router()


userRouter.get("/all", async (req: Request, res: Response): Promise<any> => {
    try {
        const query = await UserController.getAllUsers()
        return res.status(200).json(query)
    }
    catch(error: any) {
        return res.status(500)
    }
   
})


userRouter.get('/:id',async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id
        const user = await UserController.getUserById(parseInt(id))
        return res.status(200).json(user)
    }
    catch(error: any) {
        return res.status(500).json({error})
    }
})


userRouter.post("/access", async (req: Request<Login>, res: Response): Promise<any> => {

    try{
        const { email, password } = req.body

        const existsEmail = await UserController.existsEmail(email)

        if(existsEmail) {
            const user = await UserController.getUserByEmail(email)
            const comparator = await PasswordSecurity.comparePasswordEncrypt(password, user.password)

            if(comparator) {
                return  res.status(200).json({message: "Acesso liberado", user: user})
            }
        }


        return res.status(400).json({message: "Acesso negado"})

        
    }
    catch(error: any) {
        console.error('Algo deu errado', error.message)
        return res.status(500).json({message: "Acesso negado" })
    }
    

})

userRouter.post("/insert", async (req: Request<User>, res: Response): Promise<any> => {

    try {
        const { name, age, email, password } = req.body

        const existsEmaiil = await UserController.existsEmail(email)

        if(existsEmaiil === true) {
            return res.status(400).json({message: 'Já existe um usuario com esse email'})
        }

        const newUserInDb = new User(name, age, email, await PasswordSecurity.encryptPassword(password))
        await UserController.postUser(newUserInDb)
        const user = await UserController.getUserByEmail(email)
        return res.status(201).json({ message: "Usuario adicionado com sucesso" , user: user})
    }
    catch(error: any) {
        console.error("Algo deu errado", error.message)
        return res.status(500).json({message: "Problemas internos"})
    }

})

userRouter.put('/update/:id', async (req: Request , res: Response): Promise<any> => {
    
    try {
        const {name, age, email, password } = req.body
        const newUser = new User(name, age, email, await PasswordSecurity.encryptPassword(password))
        await UserController.putUser(req.params.id, newUser)
        return res.status(200).json({message: 'Usuario editado com sucesso.'})
        
    }
    catch(error: any) {
        return res.status(500).json({error: error})
    }
})


userRouter.delete('/delete/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        await UserController.deleteUser(req.params.id)
        return res.status(200).json({message: 'User deletado com sucesso'})
    }
    catch(error: any) {
        return res.status(500).json({error: error})
    }
})


export default userRouter