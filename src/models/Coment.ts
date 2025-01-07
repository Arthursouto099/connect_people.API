export class Coment {
    comentario: string 
    id_post: number
    id_user: number
    user_name: string

    constructor(comentario: string, id_post: number, id_user: number, user_name: string) {
        this.comentario = comentario
        this.id_post = id_post
        this.id_user = id_user
        this.user_name = user_name

    }
}