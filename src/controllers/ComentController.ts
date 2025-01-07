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
        const result = await sql`insert into comentario (comentario, id_post) values (${[coment.comentario]}, ${coment.id_post} )`
    }
    

    static async deleteComent(id: number): Promise<void> {
        const result = await sql`delete from comentario where id = ${id}`
    }
}