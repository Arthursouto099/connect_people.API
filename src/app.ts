import express, { Request, Response } from 'express'
import helmet from 'helmet'
import path from 'path'
import { User } from './models/User'
import { PasswordSecurity } from './classes/PasswordSecurity'
import { Login } from './models/Login'
import { UserController } from './controllers/UserController'
import cors from 'cors'
import { PostController } from './controllers/PostController'
import { Post } from './models/Post'
import { sql } from './DataBase'



const app = express()




app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../public')))



app.get("/", async (req: Request, res: Response): Promise<any> => {
    try {
        const query = await UserController.getAllUsers()
        return res.status(200).json(query)
    }
    catch(error: any) {
        return res.status(500)
    }
   
})


app.get('/users/:id',async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id
        const user = await UserController.getUserById(parseInt(id))
        return res.status(200).json(user)
    }
    catch(error: any) {
        return res.status(500).json({error})
    }
})


app.post("/access", async (req: Request<Login>, res: Response): Promise<any> => {

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

app.post("/insert", async (req: Request<User>, res: Response): Promise<any> => {

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

app.put('/update/:id', async (req: Request , res: Response): Promise<any> => {
    
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


app.delete('/delete/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        await UserController.deleteUser(req.params.id)
        return res.status(200).json({message: 'User deletado com sucesso'})
    }
    catch(error: any) {
        return res.status(500).json({error: error})
    }
})


app.get('/posts', async(req: Request, res: Response): Promise<any> => {
    try {
        const query = await PostController.getAllPost()
        return res.status(200).json(query)
    }
    catch(error: any) {
        return res.status(500).json({error: error})
    }
})

app.get('/posts/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        const query = await PostController.getAllPostsByIdUser(Number(req.params.id))
        return res.status(200).json(query)
    }
    catch(error: any) {
        return res.status(500).json({error: error})
    }
})

app.post('/setPost', async(req: Request<Post>, res: Response): Promise<any> => {
    try {
        const {titulo, conteudo, data_postagem, id_user} = req.body
        const newPost = new Post(titulo, conteudo, data_postagem, id_user)
        await PostController.setPost(newPost)
        return res.status(201).json({message: 'Post concluido'})
    }
    catch(error: any) {
        console.log(error)
        return res.status(500).json({error: error})
    }
})

app.put('/editPost/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id
        const {titulo, conteudo, data_postagem, editByTitle} = await req.body
        const postEdited = {
            titulo,
            conteudo,
            data_postagem
        }
        await PostController.putPost(parseInt(id), postEdited, editByTitle)
        return res.status(200).json({message: 'Post editado com sucesso'})

        
    }
    catch(error: any) {
       return res.status(500).json({message: error})
    }
})

app.post('/deletePost/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id
        const {titulo} = await req.body
        await PostController.deletePost(parseInt(id), titulo)
        return res.status(200).json({message: 'Post deletado com sucesso'})
    }
    catch (error: any) {
        res.status(500).json({message: error})
    }
})

const portEnv = process.env.PORT !== undefined ? process.env.PORT : 2007;

app.listen(portEnv, () => {
    console.log(`Server is running on port ${portEnv}`);
});
