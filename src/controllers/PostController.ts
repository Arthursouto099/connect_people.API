import { Post } from "../models/Post";
import { sql } from "../DataBase";

export class PostController {
    
    static async getAllPost() {
        const rows  = await sql`select * from postagem`
        return rows
    }

    static async getAllPostsByIdUser(id_user: number ) {
        const rows = await sql `select * from postagem where id_user = ${id_user}`
        return rows
    }

    static async setPost(post: Post): Promise<void> {
        const result = await sql`insert into postagem (titulo, conteudo, data_postagem, id_user ) values (${post.titulo}, ${post.conteudo}, ${post.data_postagem}, ${post.id_user} )`
    }

    static async putPost(idUser: number, post: {titulo: string, conteudo: string, data_postagem: string}, editByTitle: string): Promise<void> {
        const result = await sql`update postagem set titulo = ${post.titulo}, conteudo = ${post.conteudo}, data_postagem = ${post.data_postagem} where id_user = ${idUser} and titulo = ${editByTitle}`
    }

    static async deletePost(id: number): Promise<void> {
        const result = await sql`delete from postagem where id = ${id}`
    }
}