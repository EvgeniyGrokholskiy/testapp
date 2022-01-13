import React from 'react';
import Test from "./components/test";
import {Typography} from "@mui/material";

function App() {
    return (
        <div>
            <Typography variant={"h1"} align={"center"}>Hello world!!!</Typography>
            <Typography variant={"body1"} align={"center"} sx={{
                fontSize: "20px",
                textDecoration: "underline"
            }}>It`s work!!!!</Typography>
            <Test innerText={"MUI Typography layout from TS component!"} />
        </div>
    );
}

export default App;