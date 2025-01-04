import 'dotenv/config'
import postgres from "postgres";

const url: string = process.env.DATABASE_URL || ''

if(!url) {
    throw new Error('DATABASE_URL is not defined in the environment');
}


export const sql = postgres(url, {ssl: 'require'})



