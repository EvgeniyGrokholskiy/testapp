import React from 'react';
import Button from "../button/button";
import {Typography} from "@mui/material";

type HandleClick = {
    handleClick: (flow: boolean) => void
}

function LoginPage({handleClick}: HandleClick) {
    return (
        <div>
            <Typography variant={"h3"}>Hello Stranger</Typography>
            <Button innerText={"Login"}
                    handleClick={() => {
                        handleClick(true)
                    }}/>
        </div>
    );
}

export default LoginPage;