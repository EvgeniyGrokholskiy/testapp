import React, {ReactElement} from 'react';

type Props = {
    innerText: string
    callback?: () => void
}

function Button({innerText, callback}: Props): ReactElement<any, any> {

    return (
        <button className={'form__button'} onClick={() => {
            callback()
        }}>{innerText}</button>
    );
}

export default Button;