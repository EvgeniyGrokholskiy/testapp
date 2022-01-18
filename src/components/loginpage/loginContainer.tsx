import Logout from "../logout";
import LoginPage from "./loginPage";
import React, {useEffect, useState} from 'react';
import {getDatabase, ref, child, get, update} from "firebase/database";
import {getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";


function LoginContainer() {

    const auth = getAuth();
    const [uid, setUid] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    }

    const catchError = (error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
    }

    const handleChangeEmail = (event: any) => {
        setEmail(event.currentTarget.value);
        setError('')
    }

    const handleChangePassword = (event: any) => {
        setPassword(event.currentTarget.value);
        setError('')
    }

    const setUser = ({email, uid}: { email: string, uid: string }) => {
        setName(email);
        setUid(uid);
        localStorage.setItem('uid', uid);
        localStorage.setItem('auth', 'true');
        clearInputs();
    }

    const setUserObj = ({email, password}: { email: string, password: string }) => {
        setEmail(email);
        setPassword(password)
    }

    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                writeNewUser(userCredential.user.uid, email, password).then(() => console.log('written user data'));
                setUser(userCredential.user);
            })
            .catch((error) => {
                catchError(error);
            });
    }

    const signIn = () => {
        setError('');
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                writeNewUser(userCredential.user.uid, email, password).then(() => console.log('written user data'));
                setUser(userCredential.user);
            })
            .catch((error) => {
                catchError(error);
            });
    }

    const logout = () => {
        signOut(auth).then(() => {
            localStorage.setItem('uid', '');
            localStorage.setItem('auth', '');
            setName('');
            setEmail('');
            setPassword('');
        }).catch((error) => {
            catchError(error);
        });
    }

    function writeNewUser(uid: any, email: string, password: string) {
        const db = getDatabase();
        const user = {
            email,
            password
        };
        const updates: { [uid: string]: { email: string, password: string } } = {}
        updates[uid] = user;
        return update(ref(db), updates);
    }

    useEffect(() => {
        const dbRef = ref(getDatabase());
        const path = localStorage.getItem('uid');
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

    }, [auth,name,email])

    return (
        <>
            {
                localStorage.getItem('auth') === '' ?

                    <LoginPage email={email}
                               handleChangeEmail={handleChangeEmail}
                               password={password}
                               handleChangePassword={handleChangePassword}
                               error={error}
                               login={login}
                               signIn={signIn}
                    />

                    :

                    <Logout name={email}
                            email={email}
                            password={password}
                            error={error} logout={logout}
                    />

            }
        </>
    )
}

export default LoginContainer;