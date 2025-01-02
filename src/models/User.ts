
export class User {
    name: string
    age: number
    email: string
    private __password: string


    constructor(name: string, age: number, email: string, password: string) {
        this.name = name
        this.age = age
        this.email = email
        this.__password =  password
    }

    getPassword(): string {
        return this.__password
    }

    setPassword(value: string): string {
        return this.__password = value
    }

}

