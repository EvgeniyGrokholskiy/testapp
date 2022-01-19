import Logout from "../logout";
import LoginPage from "./loginPage";
import React, {useEffect, useState} from 'react';
import {child, get, getDatabase, ref, update} from "firebase/database";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";


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

export default LoginContainer;