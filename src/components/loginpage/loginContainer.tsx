import Logout from "../logout";
import LoginPage from "./loginPage";
import {db} from "../../db/default/db";
import React, {ReactElement} from 'react';
import {auth} from "../../auth/default/auth";

interface IState {
    isAuth: boolean,
    uid: string,
    name: string,
    email: string,
    password: string,
    error: string
}

interface IProps {

}

class LoginClassContainer extends React.Component<IProps, IState> {

    constructor(props: any) {
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

    catchError = (error: { code: string, message: string }) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.setState({error: errorMessage});
    }

    handleChangeEmail = (event: React.KeyboardEvent<HTMLInputElement>) => {
        this.setState({email: event.currentTarget.value, error: ''});
    }

    handleChangePassword = (event: React.KeyboardEvent<HTMLInputElement>) => {
        this.setState({password: event.currentTarget.value, error: ''});
    }

    setUser = ({email, uid}: { email: string, uid: string }) => {
        this.setState({email, uid, isAuth: true})
        sessionStorage.setItem('uid', uid);
        sessionStorage.setItem('auth', 'true');
    }

    setUserObj = ({email, password}: { email: string, password: string }) => {
        this.setState({email, password, isAuth: true});
    }

    login = () => {
        auth.logIn(this.state.email, this.state.password)
            .then((data: any) => {
                this.setUser(data.user);
            }).catch((error: any) => {
            this.catchError(error);
        });
    }

    signUp = () => {
        this.setState({error: ''});
        auth.signUp(this.state.email, this.state.password)
            .then((userCredential) => {
                this.setUser(userCredential.user);
            })
            .catch((error) => {
                this.catchError(error);
            });
    }

    logout = () => {
        auth.logOut().then(() => {
            sessionStorage.setItem('uid', null);
            sessionStorage.setItem('auth', null);
            this.setState({name: '', email: '', password: '', isAuth: false});
        }).catch((error) => {
            this.catchError(error);
        });
    }

    componentDidMount() {
        if (!sessionStorage.getItem("uid")) return
        db.getUserData().then((data) => {
            if (data) {
                this.setUserObj(data);
            } else {
                this.logout()
                console.log("No data available");
            }
        });

    }

    render(): ReactElement {

        const conditionalRender = (sessionStorage.getItem("auth") === "true") || this.state.isAuth

        return (
            <>
                {
                    conditionalRender ?

                        <Logout name={this.state.email}
                                email={this.state.email}
                                password={this.state.password}
                                error={this.state.error} logout={this.logout}
                        />

                        :

                        <LoginPage email={this.state.email}
                                   handleChangeEmail={this.handleChangeEmail}
                                   password={this.state.password}
                                   handleChangePassword={this.handleChangePassword}
                                   error={this.state.error}
                                   login={this.login}
                                   signIn={this.signUp}
                        />

                }
            </>
        )
    }
}


/*const LoginContainer = () => {

    const [userState, setUserState] = useState({
        isAuth: false, uid: '', name: '', email: '', password: '', error: ''
    })

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
        setUserState({...userState, email, uid, isAuth: true})
        sessionStorage.setItem("uid", uid);
    }

    const setUserObj = ({email, password}: { email: string, password: string }) => {
        setUserState({...userState, email, password, isAuth: true});
    }

    const login = () => {
        Auth.logIn(userState.email, userState.password)
            .then((userCredential: any) => {
                setUser(userCredential.user);
            })
            .catch((error: any) => {
                catchError(error);
            });
    }

    const signUp = () => {
        Auth.signUp(userState.email, userState.password)
            .then((userCredential: any) => {
                setUser(userCredential.user);
            })
            .catch((error: any) => {
                catchError(error);
            });
    }

    const logout = () => {
        Auth.logOut().then(() => {
            sessionStorage.setItem("uid", null);
            setUserState({...userState, name: "", email: "", password: "", isAuth: false});
        }).catch((error) => {
            catchError(error);
        });
    }

    const getUserData = () => {
        Auth.getUserData().then((data) => {
                if (data[userState.uid]) {
                    setUserObj(data.val());
                } else {
                    return
                }
            }
        ).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getUserData()
    }, [userState.isAuth, userState.email])

    const conditionalRender = sessionStorage.getItem("uid") === null || userState.isAuth

    return (
        <>
            {
                conditionalRender ?

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
}*/

export default LoginClassContainer;