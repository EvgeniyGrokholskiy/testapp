type LoginFunc = (email: string, password: string) => Promise<any>;

export interface IAuth {
    readonly authObservably: boolean;
    //writeNewUser: (uid: any, email: string, password: string) => void;
    signUp: LoginFunc;
    logIn: LoginFunc;
    logOut: () => void;
    observable: () => boolean;
}