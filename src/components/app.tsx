import React from 'react';
import {
    Routes,
    Route
} from "react-router-dom";
import Header from "./header/header";
import Public from "./public/public";
import Private from "./private/private";
import LoginContainer from "./loginpage/loginContainer";

function App() {

    return (
        <main>
            <Header/>
            <Routes>
                <Route path={'/Public'} element={<Public/>}/>
                <Route path={'/Private'} element={<Private/>}/>
                <Route path={'/'} element={<LoginContainer/>}/>
            </Routes>
        </main>
    );
}

export default App;