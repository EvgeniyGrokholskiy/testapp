type LoginFunc = (email: string, password: string) => Promise<any>;

export interface IAuth {
    readonly authObservably: boolean;
    get status(): boolean;
    isAuth: () => void
    signUp: LoginFunc;
    logIn: LoginFunc;
    logOut: () => void;
    observable: () => boolean;
}