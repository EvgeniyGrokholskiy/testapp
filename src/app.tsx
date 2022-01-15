import React from 'react';
import {
    Routes,
    Route
} from "react-router-dom";
import Header from "./components/header/header";
import Public from "./components/public/public";
import Private from "./components/private/private";
import LoginContainer from "./components/loginpage/loginContainer";

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