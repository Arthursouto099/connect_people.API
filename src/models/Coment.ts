export class Coment {
    comentario: string 
    id_post: number
    id_user: number

    constructor(comentario: string, id_post: number, id_user: number) {
        this.comentario = comentario
        this.id_post = id_post
        this.id_user = id_user

    }
}