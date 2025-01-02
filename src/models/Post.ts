export class Post {
    titulo: string
    conteudo: string
    data_postagem: string
    id_user: number

    constructor(titulo: string, conteudo: string, data_postagem: string, id_user: number) {
        this.titulo = titulo
        this.conteudo = conteudo
        this.data_postagem = data_postagem
        this.id_user = id_user
    }
    
}

