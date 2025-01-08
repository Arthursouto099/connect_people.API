import express, {Request, Response} from 'express'
import { ComentController } from '../controllers/ComentController'
import { Coment } from '../models/Coment'

const comentRouter = express.Router()



comentRouter.get('/', async (req: Request, res: Response):Promise<any> => {
try {
    const query = await ComentController.getAllComents()
    return res.status(200).json(query)
}
catch(error: any) {
    return res.status(500).json({error})
}

})


comentRouter.get('/:id', async (req: Request, res: Response): Promise<any> => {

try {
    const idPost = req.params.id
    const query = await ComentController.getALlComentsByIdPost(Number(idPost))
    return res.status(200).json(query)
}
catch(error: any) {
    return res.status(500).json({error})
}

})

comentRouter.post('/insertComent', async (req: Request<Coment>, res: Response): Promise<any> => {

    try {
        const {comentario, id_post, id_user, user_name} = req.body
        const coment = new Coment(comentario, id_post, id_user, user_name)
        await ComentController.postComent(coment)
        return res.status(201).json({message: 'Comentario criado com sucesso'})
    }
    catch(error: any) {
        return res.status(500).json({error})
    }

})

comentRouter.put('/updateComent/:id',  async (req: Request<Coment>, res: Response): Promise<any> => {
    try {
        const {comentario, id_post, id_user, user_name} = req.body
        const coment = new Coment(comentario, id_post, id_user, user_name)
        await ComentController.PutComent(Number(req.params), coment)
        return res.status(201).json({message: 'Comentario editado com sucesso'})
    }
    catch(error: any) {
        return res.status(500).json({error})
    }
} )

comentRouter.delete('/deleteComent/:id', async (req: Request, res: Response): Promise<any> => {

    try {
        const idComent = req.params.id
        await ComentController.deleteComent(Number(idComent))
        return res.status(200).json({message: 'Comentario deletado com sucesso'})
    }
    catch(error: any) {
        return res.status(500).json({error})
    }

    
})

comentRouter.delete('/deleteAllComents/:id',  async(req: Request, res: Response): Promise<any> => {
    try {
        const id_post = req.params.id
        await ComentController.deleteComentByIdPost(Number(id_post))
        return res.status(200).json({message: 'Comentarios deletados com sucesso'})    
    }
    catch(error: any) {
        return res.status(500).json({error})
    }
})





export default comentRouter