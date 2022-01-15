import React from 'react';
import {NavLink} from "react-router-dom";

type propsType = {}

function Header(props:propsType) {
    return (
        <div className={'header__wrapper'}>
            <NavLink className={'header__navLink'} to={'/Public'}  children={'Public page'}/>
            <NavLink className={'header__navLink'} to={'/private'}  children={'Private page'}/>
            <NavLink className={'header__navLink'} to={'/'}  children={'Login page'}/>
        </div>
    );
}

export default Header;