import React from "react";

type Props = {
    innerText: string;
}

function Test({innerText}: Props) {
    return (
        <div>
            {innerText}
        </div>
    );
}

export default Test;