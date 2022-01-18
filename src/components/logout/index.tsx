import React from 'react';
import Button from "../button";
import {Typography} from "@mui/material";

interface Props {
    name: string
    email: string
    password: string
    error: string
    logout: () => void
}

function Logout({name, email, password, error, logout}: Props) {

    return (

        <div>
            <Typography variant={"h3"}>
                {`Hello ${name}!`}
            </Typography>

            <span style={{display: 'block', margin: '20px 0 30px 50px'}}>{`Email: ${email}`}</span>

            <span style={{display: 'block', margin: '20px 0 30px 50px'}}>{`Password: ${password}`}</span>


            {
                error ?
                    <span style={{display: 'block'}}>{error}</span>
                    :
                    <></>
            }

            <Button innerText={"Logout"} callback={logout}/>
        </div>

    )
}

export default Logout;