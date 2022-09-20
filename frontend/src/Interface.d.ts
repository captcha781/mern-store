import { FormEvent } from "react"

interface AuthType {
    auth: boolean
}

interface UserType {
    name: string,
    username: string,
    mail: string,
    password: string,
    type: string,
    status: boolean
}

interface InitialStateType {
    auth: boolean,
    user: null|UserType
}

interface SigninSubmitHandler {
    (e:FormEvent) : void
}

interface SignupSubmitHandler {
    (e:FormEvent) : void
}