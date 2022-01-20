import React from 'react';
import {
    Routes,
    Route
} from "react-router-dom";
import Public from "./public";
import Header from "./header";
import Private from "./private";
import LoginClassContainer from "./loginpage/loginContainer";


function App() {

    return (
        <main>
            <Header/>
            <Routes>
                <Route path={'/Public'} element={<Public/>}/>
                <Route path={'/Private'} element={<Private/>}/>
                <Route path={'/'} element={<LoginClassContainer/>}/>
            </Routes>
        </main>
    );
}

export default App;