import React from 'react';

function Private() {
    return (
        <div>
            {
                localStorage.getItem('uid') !== '' ?
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