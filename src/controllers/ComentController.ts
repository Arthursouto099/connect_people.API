import { sql } from "../DataBase"
import { Coment } from "../models/Coment"

export class ComentController {


    static async getAllComents() {
        const rows = await sql`select * from comentario`
        return rows
    }

    static async getALlComentsByIdPost(id: number) {
        const rows = await sql`select * from comentario where id_post = ${id}`
        return rows
    }

    static async postComent(coment: Coment): Promise<void> {
        const result = await sql`insert into comentario (comentario, id_post, id_user, user_name) values (${[coment.comentario]}, ${coment.id_post}, ${coment.id_user}, ${coment.user_name} )`
    }
    
    static async PutComent(id: number, coment: Coment): Promise<void> {
        const result = await sql`update comentario set comentario = ${coment.comentario}, id_post = ${coment.id_post}, id_user = ${coment.id_user}, user_name = ${coment.user_name} where id = ${id} `
    }

    static async deleteComent(id: number): Promise<void> {
        const result = await sql`delete from comentario where id = ${id}`
    }

    static async deleteComentByIdPost(id_post: number): Promise<void> {
        const result = await sql`delete from comentario where id_post = ${id_post}`
    }
}