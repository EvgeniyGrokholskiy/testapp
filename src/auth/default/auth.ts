import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {Subject} from "rxjs";
import {IAuth} from "../index";
import {db} from "../../db/default/db";
import {initializeApp} from "firebase/app";
import {IFirebaseconfig} from "../../firebaseconfig";


class AuthDefault implements IAuth {

    readonly authObservably: boolean;
    private readonly auth: any;
    private subject = new Subject<boolean>();


    constructor(firebaseConfig: IFirebaseconfig) {
        const app = initializeApp(firebaseConfig);
        this.auth = getAuth()
    }

    get status(): boolean {
        return this.auth.CurrentUser !== null
    }

    isAuth() {
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                this.subject.next(true)
            } else {
                this.subject.next(false)
            }
        });
    }

    logIn(email: string, password: string): Promise<any> {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    logOut(): Promise<void> {
        return signOut(this.auth);
    }

    signUp(email: string, password: string): Promise<any> {
        return createUserWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
                db.writeNewUser(userCredential.user.uid, email, password).then((data) => console.log(`written user data: ${data}`));
                return userCredential;
            })
    }

    observable(): any {
        return this.subject;
    }
}

export default AuthDefault;