import React from "react";
import {Typography} from "@mui/material";

type Props = {
    innerText: string;
}

function Test({innerText}: Props) {
    return (
        <Typography sx={{ color: 'red' }} variant={"h3"} align={"center"}>
            {innerText}
        </Typography>
    );
}

export default Test;