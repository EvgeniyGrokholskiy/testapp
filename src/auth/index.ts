import {child, get, getDatabase, ref, update} from "firebase/database";
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

abstract class ITest {
    readonly authObservably: boolean;
    private static writeNewUser: (uid: any, email: string, password: string) => any;
    public static signUp: LoginFunc;
    public static logIn: LoginFunc;
    public static logOut: (setUserState: SetUserState, userState: UserState) => void;
    public static observable: () => boolean;
}


export class Auth extends ITest{

    readonly authObservably: boolean;

    private static _writeNewUser(uid: any, email: string, password: string) {
        const db = getDatabase();
        const user = {
            email,
            password
        };
        const updates: { [uid: string]: { email: string, password: string } } = {}
        updates[uid] = user;
        return update(ref(db), updates);
    }

    public static logIn(login: string, password: string):any {
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, login, password);
    }

    public static logOut() {
        const auth = getAuth();
        return signOut(auth);
    }

    public static signUp(login: string, password: string) {
        const auth = getAuth();
        return createUserWithEmailAndPassword(auth, login, password)
            .then((userCredential) => {
                this._writeNewUser(userCredential.user.uid, login, password).then(() => console.log('written user data'));
                return userCredential;
            })
    }

    public static getUserData = () => {
        const dbRef = ref(getDatabase());
        const path = sessionStorage.getItem('uid');
        return get(child(dbRef, `/${path}`)).then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log("No data available");
            }
        })
    }

    public static observable(): boolean {
        return false;
    }
}