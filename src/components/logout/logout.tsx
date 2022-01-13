import React from 'react';
import Button from "../button/button";
import {Typography} from "@mui/material";

type HandleClick = {
    handleClick: (flow: boolean) => void
}

function Logout({handleClick}: HandleClick) {
    return (
        <div>
            <Typography variant={"h3"}>Hello Friend!</Typography>
            <Button innerText={"Logout"}
                    handleClick={() => {
                        handleClick(false)
                    }}/>
        </div>
    );
}

export default Logout;