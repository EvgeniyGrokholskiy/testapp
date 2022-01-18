type LoginFunc = (login: string, password: string) => void

export interface IAuth {
    readonly authObservably: boolean
    signUp: LoginFunc
    logIn: LoginFunc
    logOut: () => void
    observable: () => boolean
}