export class Login {
    email: string
    private _password: string

    constructor(email: string, password: string) {
        this.email = email
        this._password = password
    }

    getPassword(): string {
        return this._password
    }

    
}