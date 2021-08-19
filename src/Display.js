import React from 'react';

const Display = React.forwardRef(function Display(props, ref) {
  return (
    <div>
      <div className='display-div'>
        <div ref={ref} className='timer-wrapper'>
          <p id='timer-label'>{props.data.timerLabel}</p>
          <p id='time-left'>{props.clockify}</p>
        </div>
      </div>
      <span>
        <button className='display-btns' id='start_stop' onClick={props.beginCountdown}>
          <i className="fa fa-play fa-2x"></i>
          <i className="fa fa-pause fa-2x"></i>
        </button>
        <button className='display-btns' id='reset' onClick={props.resetCountdown}><i className="fa fa-refresh fa-2x"></i></button>
      </span>
    </div>
  )
})

export default Display;