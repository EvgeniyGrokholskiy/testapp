import {IAuth} from "../index";
import {db} from "../../db/default/db";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";


class Auth implements IAuth {

    readonly authObservably: boolean;
    //private _auth;
    constructor() {
        //this._auth = getAuth()

    }

    logIn(email: string, password: string): Promise<any> {
        debugger
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password);
    }

    logOut():Promise<void> {
        const auth = getAuth();
        return signOut(auth);
    }

    signUp(email: string, password: string): Promise<any> {
        const auth = getAuth();
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                db.writeNewUser(userCredential.user.uid, email, password).then((data) => console.log(`written user data: ${data}`));
                return userCredential;
            })
    }

    observable(): boolean {
        return false;
    }
}

export const auth = new Auth;