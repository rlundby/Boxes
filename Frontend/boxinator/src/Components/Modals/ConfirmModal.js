import React from 'react';
import './Modals.css';

export default function ConfimModal({type, hideModal}) {


    if(type === 'success') {
        return(
            <div className='confirm-modal'>
                <h2>Success!</h2>
                <h3>The box has been added</h3>
                <button onClick={hideModal} className="button-modal">Continue</button>
            </div>
        )
    } else if(type === 'failed') {
        return(
            <div className='failed-modal'>
                <h2>Oh no - something went wrong!</h2>
                <h5>The box couldn't be added. Please make sure the Java REST Api is up and running!</h5>
                <button onClick={hideModal} className="button-modal failed">Ok :(</button>
            </div>
        )
    }
}