import React from 'react';
import Button from "../button/button";
import {Typography} from "@mui/material";

type Function = () => void;

interface Props {
    email: string
    handleChangeEmail: (event: any) => void
    password: string
    handleChangePassword: (event: any) => void
    error: string
    login: Function
    signIn: Function
}

function LoginPage({email, handleChangeEmail, password, handleChangePassword, error, login, signIn}: Props) {

    return (

        <div>
            <Typography variant={"h3"}>
                {`Hello Stranger`}
            </Typography>

            <input style={{display: 'block', margin: '20px 0 30px 50px'}} type={"email"} value={email}
                   onChange={handleChangeEmail}/>
            <input style={{display: 'block', margin: '20px 0 30px 50px'}} type={"password"} value={password}
                   onChange={handleChangePassword}/>

            {
                error ?
                    <span style={{display: 'block'}}>{error}</span>
                    :
                    <></>
            }

            <Button innerText={"Login"} callback={login}/>

            <Button innerText={"Sign in"} callback={signIn}/>
        </div>

    )
}

export default LoginPage;