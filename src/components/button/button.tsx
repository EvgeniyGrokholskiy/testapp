import React from 'react';

type Props = {
    innerText: string,
    handleClick: (flow:boolean) => void
}

function Button({innerText,handleClick}:Props) {
    const flow = innerText === "Login"

    return (
        <button onClick={()=>{
            handleClick(flow)}}>{innerText}</button>
    );
}

export default Button;