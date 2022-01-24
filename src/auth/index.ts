type LoginFunc = (email: string, password: string) => Promise<any>;

export interface IAuth {
    readonly authObservably: boolean;
    signUp: LoginFunc;
    logIn: LoginFunc;
    logOut: () => void;
    observable: () => boolean;
}