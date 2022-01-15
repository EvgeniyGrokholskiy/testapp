import React from 'react';

type Props = {
    innerText: string
    callback?: () => void
}

function Button({innerText, callback}: Props) {

    return (
        <button className={'form__button'} onClick={() => {
            callback()
        }}>{innerText}</button>
    );
}

export default Button;