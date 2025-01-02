import bcripty from 'bcryptjs'

export class PasswordSecurity  {


    static async encryptPassword(password: string): Promise<string> {
        const encryptPassword = await bcripty.hash(password, 8)
        return encryptPassword

    }

    static async comparePasswordEncrypt(password: string, encryptedPassword: string): Promise<boolean> {
        const comparator = await bcripty.compare(password, encryptedPassword)
        return comparator
    }

    

}