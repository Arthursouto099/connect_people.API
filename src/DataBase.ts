import 'dotenv/config'
import postgres from "postgres";

let url: string = ''
if(process.env.DATABASE_URL !== undefined) {
    url = process.env.DATABASE_URL
}


export const sql = postgres(url, {ssl: 'require'})







