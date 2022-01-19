import React from 'react';

function Private() {
    return (
        <div>
            {
                sessionStorage.getItem('uid') !== '' ?
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