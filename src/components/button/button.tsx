import React from 'react';

type Props = {
    innerText: string
    callback?: () => void
}

function Button({innerText, callback}: Props) {

    return (
        <button onClick={() => {
            callback()
        }}>{innerText}</button>
    );
}

export default Button;