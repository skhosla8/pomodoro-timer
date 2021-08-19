import React from 'react';

function Session(props) {
    return (
        <div className='break-session-divs'>
            <div id='session-label'>
                Session Length
            </div>
            <div className='align-icons'>
                <button className='arrow-btn' id='session-decrement' onClick={() => { props.decrementSessionLength(); props.decrementDisplayUpdate() }}><i className="fa fa-arrow-down fa-2x"></i></button>
                <span className='length-value' id='session-length'>{props.data.sessionValue}</span>
                <button className='arrow-btn' id='session-increment' onClick={() => { props.incrementSessionLength(); props.incrementDisplayUpdate() }}><i className="fa fa-arrow-up fa-2x"></i></button>
            </div>
        </div>
    )
}

export default Session;