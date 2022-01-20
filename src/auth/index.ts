import {getDatabase, ref, update} from "firebase/database";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";

type LoginFunc = (login: string, password: string, setUser: SetUser, setUserState: SetUserState, userState: UserState) => void;
type UserState = { uid: string, name: string, email: string, password: string, error: string };
type SetUser = (user: { email: string, uid: string }) => void;
type SetUserState = ({}) => void;

interface IAuth {
    readonly authObservably: boolean;
    catchError: (error: { code: string, message: string }, setUserState: ({}) => void, userState: any) => void;
    writeNewUser: (uid: any, email: string, password: string) => void;
    signUp: LoginFunc;
    logIn: LoginFunc;
    logOut: (setUserState: SetUserState, userState: UserState) => void;
    observable: () => boolean;
}


export class Auth implements IAuth {

    readonly authObservably: boolean;

    catchError = (error: { code: string, message: string }, setUserState: ({}) => void, userState: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setUserState({...userState, error: errorMessage})
    }

    writeNewUser(uid: any, email: string, password: string) {
        const db = getDatabase();
        const user = {
            email,
            password
        };
        const updates: { [uid: string]: { email: string, password: string } } = {}
        updates[uid] = user;
        return update(ref(db), updates);
    }

    logIn(login: string, password: string, setUser: SetUser, setUserState: SetUserState, userState: UserState) {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, login, password)
            .then((userCredential) => {
                //this.writeNewUser(userCredential.user.uid, login, password).then(() => console.log('written user data'));
                setUser(userCredential.user);
            })
            .catch((error) => {
                this.catchError(error,setUserState,userState);
            });
    }

    logOut( setUserState: SetUserState, userState: UserState) {
        const auth = getAuth();
        signOut(auth).then(() => {
            localStorage.setItem('uid', '');
            localStorage.setItem('auth', '');
        }).catch((error) => {
            this.catchError(error,setUserState,userState);
        });
    }

    observable(): boolean {
        return false;
    }

    signUp(login: string, password: string, setUser: SetUser, setUserState: SetUserState, userState: UserState) {
        setUserState({...userState, error: ''})
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, login, password)
            .then((userCredential) => {
                this.writeNewUser(userCredential.user.uid, login, password).then(() => console.log('written user data'));
                setUser(userCredential.user);
            })
            .catch((error) => {
                this.catchError(error, setUserState, userState);
            });
    }
}