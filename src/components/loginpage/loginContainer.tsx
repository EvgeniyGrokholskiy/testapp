import Logout from "../logout";
import LoginPage from "./loginPage";
import React, {ReactElement, useEffect, useState} from 'react';
import {child, get, getDatabase, ref, update} from "firebase/database";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {Auth} from "../../auth";


class LoginClassContainer extends React.Component<any, any> {
    private __Auth:any = Auth
    constructor(props:any) {
        super(props);
        this.state = {
            isAuth: false,
            uid: '',
            name: '',
            email: '',
            password: '',
            error: ''
        }
    }

    setIsAuth = () => {
        this.setState({isAuth: true});
    }

    catchError = (error: { code: string, message: string }) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.setState({error: errorMessage});
    }

    handleChangeEmail = (event: any) => {
        this.setState({email: event.currentTarget.value, error: ''});
    }

    handleChangePassword = (event: any) => {
        this.setState({password: event.currentTarget.value, error: ''})
    }

    setUser = ({email, uid}: { email: string, uid: string }) => {
        this.setState({email, uid, isAuth:true})
        sessionStorage.setItem('uid', uid);
        sessionStorage.setItem('auth', 'true');
    }

    setUserObj = ({email, password}: { email: string, password: string }) => {
        this.setState({email, password, isAuth: true});
    }

    login = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.state.email, this.state.password)
            .then((userCredential) => {
                this.setUser(userCredential.user);
            })
            .catch((error) => {
                this.catchError(error);
            });
    }

    signUp = () => {
        const auth = getAuth();
        this.setState({error: ''});
        createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
            .then((userCredential) => {
                this.writeNewUser(userCredential.user.uid, this.state.email, this.state.password).then(() => console.log('written user data'));
                this.setUser(userCredential.user);
            })
            .catch((error) => {
                this.catchError(error);
            });
    }

    logout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            sessionStorage.setItem('uid', '');
            sessionStorage.setItem('auth', '');
            this.setState({name: '', email: '', password: '',isAuth: false});
        }).catch((error) => {
            this.catchError(error);
        });
    }

    writeNewUser = (uid: any, email: string, password: string) => {
        const db = getDatabase();
        const user = {
            email: email,
            password: password
        };
        const updates: { [uid: string]: { email: string, password: string } } = {}
        updates[uid] = user;
        return update(ref(db), updates);
    }

    getUserData = () => {
        const dbRef = ref(getDatabase());
        const path = sessionStorage.getItem('uid');
        if (path === '') return
        get(child(dbRef, `/${path}`)).then((snapshot) => {
            if (snapshot.exists()) {
                this.setUserObj(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    componentDidMount() {
        this.getUserData();
    }

    render():ReactElement{

        const conditionalRender = sessionStorage.getItem('auth') === '' && !this.state.isAuth

        return (
            <>
                {
                    conditionalRender ?

                        <LoginPage email={this.state.email}
                                   handleChangeEmail={this.handleChangeEmail}
                                   password={this.state.password}
                                   handleChangePassword={this.handleChangePassword}
                                   error={this.state.error}
                                   login={this.login}
                                   signIn={this.signUp}
                        />

                        :

                        <Logout name={this.state.email}
                                email={this.state.email}
                                password={this.state.password}
                                error={this.state.error} logout={this.logout}
                        />

                }
            </>
        )
    }
}


const LoginContainer = () => {

    const [userState, setUserState] = useState({
        isAuth: false ,uid: '', name: '', email: '', password: '', error: ''
    })

    const setIsAuth = () => {
        setUserState({...userState, isAuth: true});
    }

    const catchError = (error: { code: string, message: string }) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setUserState({...userState, error: errorMessage})
    }

    const handleChangeEmail = (event: any) => {
        setUserState({...userState, email: event.currentTarget.value, error: ''})
    }

    const handleChangePassword = (event: any) => {
        setUserState({...userState, password: event.currentTarget.value, error: ''})
    }

    const setUser = ({email, uid}: { email: string, uid: string }) => {
        setUserState({...userState, email, uid})
        sessionStorage.setItem('uid', uid);
        sessionStorage.setItem('auth', 'true');
        setIsAuth();
    }

    const setUserObj = ({email, password}: { email: string, password: string }) => {
        setUserState({...userState, email, password, isAuth: true});
    }

    const login = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, userState.email, userState.password)
            .then((userCredential) => {
                writeNewUser(userCredential.user.uid, userState.email, userState.password).then(() => console.log('written user data'));
                setUser(userCredential.user);
            })
            .catch((error) => {
                catchError(error);
            });
    }

    const signUp = () => {
        const auth = getAuth();
        setUserState({...userState, error: ''});
        createUserWithEmailAndPassword(auth, userState.email, userState.password)
            .then((userCredential) => {
                writeNewUser(userCredential.user.uid, userState.email, userState.password).then(() => console.log('written user data'));
                setUser(userCredential.user);
            })
            .catch((error) => {
                catchError(error);
            });
    }

    const logout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            sessionStorage.setItem('uid', '');
            sessionStorage.setItem('auth', '');
            setUserState({...userState, name: '', email: '', password: '',isAuth: false});
        }).catch((error) => {
            catchError(error);
        });
    }

    const writeNewUser = (uid: any, email: string, password: string) => {
        const db = getDatabase();
        const user = {
            email: email,
            password: password
        };
        const updates: { [uid: string]: { email: string, password: string } } = {}
        updates[uid] = user;
        return update(ref(db), updates);
    }

    const getUserData = () => {
        const dbRef = ref(getDatabase());
        const path = sessionStorage.getItem('uid');
        if (path === '') return
        get(child(dbRef, `/${path}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setUserObj(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getUserData()
    }, [userState.isAuth, userState.email])

    return (
        <>
            {
                sessionStorage.getItem('auth') === '' ?

                    <LoginPage email={userState.email}
                               handleChangeEmail={handleChangeEmail}
                               password={userState.password}
                               handleChangePassword={handleChangePassword}
                               error={userState.error}
                               login={login}
                               signIn={signUp}
                    />

                    :

                    <Logout name={userState.email}
                            email={userState.email}
                            password={userState.password}
                            error={userState.error} logout={logout}
                    />

            }
        </>
    )
}

export default LoginClassContainer;