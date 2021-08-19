import './App.css';
import Break from './Break';
import Session from './Session';
import Display from './Display';
import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            breakValue: 5,
            sessionValue: 25,
            timerLabel: 'Session',
            timeLeft: 1500000,
            implementCountdown: null,
            isRunning: false,
            warningColor: null
        }

        this.timerWrapper = React.createRef();
        this.audio = React.createRef();
        this.incrementBreakLength = this.incrementBreakLength.bind(this);
        this.decrementBreakLength = this.decrementBreakLength.bind(this);
        this.incrementSessionLength = this.incrementSessionLength.bind(this);
        this.decrementSessionLength = this.decrementSessionLength.bind(this);
        this.clockify = this.clockify.bind(this);
        this.incrementDisplayUpdate = this.incrementDisplayUpdate.bind(this);
        this.decrementDisplayUpdate = this.decrementDisplayUpdate.bind(this);
        this.decrementTimeLeft = this.decrementTimeLeft.bind(this);
        this.switchTimer = this.switchTimer.bind(this);
        this.interval = this.interval.bind(this);
        this.beginCountdown = this.beginCountdown.bind(this);
        this.resetCountdown = this.resetCountdown.bind(this);
    }

    incrementBreakLength() {
        this.setState(prevState => {
            return {
                breakValue: prevState.breakValue + 1
            }
        });

        if (this.state.breakValue >= 60) {
            this.setState({ breakValue: 60 })
        }
    }

    decrementBreakLength() {
        this.setState(prevState => {
            return {
                breakValue: prevState.breakValue - 1
            }
        });

        if (this.state.breakValue <= 1) {
            this.setState({ breakValue: 1 })
        }
    }

    incrementSessionLength() {
        this.setState(prevState => {
            return {
                sessionValue: prevState.sessionValue + 1
            }
        });

        if (this.state.sessionValue >= 60) {
            this.setState({ sessionValue: 60 })
        }
    }

    decrementSessionLength() {
        this.setState(prevState => {
            return {
                sessionValue: prevState.sessionValue - 1
            }
        });

        if (this.state.sessionValue <= 1) {
            this.setState({ sessionValue: 1 })
        }
    }

    clockify() {
        let minutes = Math.floor((this.state.timeLeft / 1000) / 60);
        let seconds = Math.floor((this.state.timeLeft / 1000) % 60);
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        return (minutes + ':' + seconds);
    }

    incrementDisplayUpdate() {
        this.setState({ timeLeft: (this.state.sessionValue + 1) * 60000 });

        if (this.state.timeLeft >= 3600000) {
            this.setState({ timeLeft: 3600000 })
        }
    }

    decrementDisplayUpdate() {
        this.setState({ timeLeft: (this.state.sessionValue - 1) * 60000 });

        if (this.state.timeLeft <= 60000) {
            this.setState({ timeLeft: 60000 })
        }
    }

    decrementTimeLeft() {
        this.setState(prevState => {
            return {
                timeLeft: prevState.timeLeft - 1000
            }
        });
    }

    switchTimer() {
        if (this.state.timeLeft < 0) {
            clearInterval(this.state.implementCountdown);
            this.state.timerLabel === 'Session' ? this.setState({ timerLabel: 'Break' }) : this.setState({ timerLabel: 'Session' });
            this.state.timerLabel === 'Break' ? this.setState({ timeLeft: this.state.breakValue * 60000 }) : this.setState({ timeLeft: this.state.sessionValue * 60000 });
            this.setState({ implementCountdown: setInterval(this.interval, 1000) });
        }

        if (this.state.timeLeft === 0) {
            this.audio.current.play();
        }

        if (this.state.timeLeft < 60000 && this.state.timeLeft >= 0) {
            this.setState({ warningColor: 'red' })
        } else if (this.state.timeLeft < 0) {
            this.setState({ warningColor: '#FFF' })
        } else {
            this.setState({ warningColor: '#FFF' })
        }

        this.state.warningColor === 'red' ? this.timerWrapper.current.style.color = 'red' : this.timerWrapper.current.style.color = '#FFF';
    }

    interval() {
        this.decrementTimeLeft();
        this.switchTimer();
    }

    beginCountdown() {
        if (!this.state.isRunning) {
            this.setState({ implementCountdown: setInterval(this.interval, 1000) })
        } else {
            clearInterval(this.state.implementCountdown);
        }

        this.setState(prevState => {
            return {
                isRunning: !prevState.isRunning
            }
        });
    }

    resetCountdown() {
        clearInterval(this.state.implementCountdown);
        this.setState({
            breakValue: 5,
            sessionValue: 25,
            timerLabel: 'Session',
            timeLeft: 1500000,
            implementCountdown: null,
            isRunning: false,
            warningColor: null
        });

        this.audio.current.pause();
        this.audio.current.currentTime = 0;
    }

    render() {
        return (
            <div className='container'>
                <div className='title'>25 + 5 Clock</div>
                <div className='break-session-group'>
                    <Break
                        incrementBreakLength={this.incrementBreakLength}
                        decrementBreakLength={this.decrementBreakLength}
                        data={this.state}
                    />
                    <Session
                        incrementSessionLength={this.incrementSessionLength}
                        decrementSessionLength={this.decrementSessionLength}
                        incrementDisplayUpdate={this.incrementDisplayUpdate}
                        decrementDisplayUpdate={this.decrementDisplayUpdate}
                        data={this.state}
                    />
                </div>
                <Display
                    ref={this.timerWrapper}
                    clockify={this.clockify()}
                    beginCountdown={this.beginCountdown}
                    resetCountdown={this.resetCountdown}
                    data={this.state}
                />
                <div className='footer-group'>
                    <p className='footer-1'>Designed and Coded by</p>
                    <p className='footer-2'>Sonali</p>
                </div>
                <audio ref={this.audio} id='beep' src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav' preload='auto' />
            </div>
        );
    }
}

export default App;

