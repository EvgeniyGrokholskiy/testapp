import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {getDatabase, ref, update} from "firebase/database";

type LoginFunc = (login: string, password: string, setUser: () => any, setError: (errormessage: string) => void) => void

type IAuth = {
    readonly authObservably: boolean;
    catchError: (error: any, setError: (errormessage: string) => void) => void;
    writeNewUser: (uid: any, email: string, password: string) => void;
    signUp: LoginFunc;
    logIn: LoginFunc;
    logOut: (setError: (errormessage: string) => void) => void;
    observable: () => boolean;
}

export class Auth implements IAuth {
    readonly authObservably: boolean;

    catchError = (error: any, setError: (errormessage: string) => void) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
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

    logIn(login: string, password: string, setUser: (user: { email: string, uid: string }) => void, setError: (errormessage: string) => void): void {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, login, password)
            .then((userCredential) => {
                this.writeNewUser(userCredential.user.uid, login, password).then(() => console.log('written user data'));
                setUser(userCredential.user);
            })
            .catch((error) => {
                this.catchError(error, setError);
            });
    }

    logOut(setError: (errormessage: string) => void): void {
        const auth = getAuth();
        signOut(auth).then(() => {
            localStorage.setItem('uid', '');
            localStorage.setItem('auth', '');
        }).catch((error) => {
            this.catchError(error, setError);
        });
    }

    observable(): boolean {
        return false;
    }

    signUp(login: string, password: string, setUser: (user: { email: string, uid: string }) => void, setError: (errormessage: string) => void): void {
        setError('');
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, login, password)
            .then((userCredential) => {
                this.writeNewUser(userCredential.user.uid, login, password).then(() => console.log('written user data'));
                setUser(userCredential.user);
            })
            .catch((error) => {
                this.catchError(error, setError);
            });
    }
}