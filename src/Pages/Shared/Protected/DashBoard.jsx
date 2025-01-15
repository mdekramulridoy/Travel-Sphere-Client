import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';

const DashBoard = () => {

    const {user} = UseAuth();

    console.log(user);

    return (
        <div>
            <h1>
                This is Dash Board.
            </h1>
        </div>
    );
};

export default DashBoard;