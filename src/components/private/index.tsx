import React from "react";

function Private() {
    const uid = sessionStorage.getItem("uid");
    const conditionalRender = uid !== null

    return (
        <div>
            {
                conditionalRender ?
                    <>
                        private page
                    </>
                    :
                    <>
                        {
                            window.location.replace("/")
                        }
                    </>
            }
        </div>
    );
}

export default Private;