import React, {useState} from 'react';
import Test from "./components/test";
import {Typography} from "@mui/material";
import Button from "./components/button/button";
import LoginPage from "./components/loginpage/loginPage";
import Logout from "./components/logout/logout";

function App() {

    const [login, setLogin] = useState(false);

    const handleClick = (flow:boolean)=> {
        setLogin(flow)
        console.log(login);
    }

    return (
        <div>
{/*            <Typography variant={"h1"} align={"center"}>Hello world!!!</Typography>
            <Typography variant={"body1"} align={"center"} sx={{
                fontSize: "20px",
                textDecoration: "underline"
            }}>It`s work!!!!</Typography>
            <Test innerText={"MUI Typography layout from TS component!"} />
            <Button innerText={"Login"} handleClick={handleClick} />
            <Button innerText={"Logout"} handleClick={handleClick} />*/}
            {
                !login ?
                <LoginPage handleClick={handleClick}/>
                :
                <Logout handleClick={handleClick}/>
            }
        </div>
    );
}

export default App;