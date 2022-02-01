import Logout from "../logout";
import {IAuth} from "../../auth";
import LoginPage from "./loginPage";
import {db} from "../../db/default/db";
import React, {ReactElement} from 'react';
import { auth } from "di-default";


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
    private auth: IAuth;

    constructor(props: any) {
        super(props);
        this.auth = auth()
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
        this.auth.logIn(this.state.email, this.state.password)
            .then((data: any) => {
                this.setUser(data.user);
            }).catch((error: any) => {
            this.catchError(error);
        });
    }

    signUp = () => {
        this.setState({error: ''});
        this.auth.signUp(this.state.email, this.state.password)
            .then((userCredential) => {
                this.setUser(userCredential.user);
            })
            .catch((error) => {
                this.catchError(error);
            });
    }

    logout = () => {
        this.auth.logOut().then(() => {
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

export default LoginClassContainer;