import {IAuth} from "../index";
import {db} from "../../db/default/db";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {Subject} from "rxjs";


class AuthDefault implements IAuth {

    readonly authObservably: boolean;
    private auth: any;
    private subject = new Subject<boolean>();

    get status(): boolean {
        this.auth = getAuth()
        debugger
        return this.auth.CurrentUser != null
    }

    logIn(email: string, password: string): Promise<any> {
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password);
    }

    logOut(): Promise<void> {
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

    observable(): any {
        return this.subject;
    }


}

export const auth = new AuthDefault;