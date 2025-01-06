import express, {Request, Response} from 'express'
import { PostController } from '../controllers/PostController'
import { Post } from '../models/Post'

const postRouter = express.Router()

postRouter.get('/', async(req: Request, res: Response): Promise<any> => {
    try {
        const query = await PostController.getAllPost()
        return res.status(200).json(query)
    }
    catch(error: any) {
        return res.status(500).json({error: error})
    }
})

postRouter.get('/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        const query = await PostController.getAllPostsByIdUser(Number(req.params.id))
        return res.status(200).json(query)
    }
    catch(error: any) {
        return res.status(500).json({error: error})
    }
})

postRouter.post('/setPost', async(req: Request<Post>, res: Response): Promise<any> => {
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

postRouter.put('/editPost/:id', async (req: Request, res: Response): Promise<any> => {
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

postRouter.delete('/deletePost/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id
        await PostController.deletePost(parseInt(id))
        return res.status(200).json({message: 'Post deletado com sucesso'})
    }
    catch (error: any) {
       return res.status(500).json({message: error})
    }
})

export default postRouter