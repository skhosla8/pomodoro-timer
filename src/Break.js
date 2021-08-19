import React from 'react';

function Break(props) {
    return (
        <div className='break-session-divs'>
            <div id='break-label'>
                Break Length
            </div>
            <div className='align-icons'>
                <button className='arrow-btn' id='break-decrement' onClick={props.decrementBreakLength}><i className="fa fa-arrow-down fa-2x"></i></button>
                <span className='length-value' id='break-length'>{props.data.breakValue}</span>
                <button className='arrow-btn' id='break-increment' onClick={props.incrementBreakLength}><i className="fa fa-arrow-up fa-2x"></i></button>
            </div>
        </div>
    )
}

export default Break;