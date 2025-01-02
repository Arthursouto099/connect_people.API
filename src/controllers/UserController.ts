import { sql } from "../DataBase"
import { User } from "../models/User"



export class UserController {

    

     static async getAllUsers() {
          const rows = await sql`select * from users`
          return rows
     }

     static async getUserById(id: number) {
          const result = await sql`select * from users where id = ${id}`
          return result
     }

     static async getUserByEmail(email: string) {
          const result = await sql`select * from users where email = ${email}`
          return result[0]
     }


     static async existsEmail(email: string): Promise<boolean> {
          const result = await sql`select * from users where email = ${email}`
          if(result.length !== 0) {
               return true
          }
          return false
          
     }


     static async postUser(user: User): Promise<void> {
          const result = await sql`insert into users (name, age, email, password) values(${user.name}, ${user.age}, ${user.email}, ${user.getPassword()})`
     }

     static async putUser(id: string, user: User): Promise<void> {
          const result = await sql`update  users set name = ${user.name}, age = ${user.age}, email = ${user.email}, password = ${user.getPassword()} where id = ${parseInt(id)}`
     }

     static async deleteUser(id: string): Promise<void> {
          const result = await sql`delete from users where id = ${id}`
     }

     


}