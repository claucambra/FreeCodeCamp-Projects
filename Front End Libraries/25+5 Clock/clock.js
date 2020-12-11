let minute = 1000*60;

function msToTime(ms) {
      //let milliseconds = ms % 1000;
      let seconds = Math.floor((ms / 1000) % 60);
      let minutes = Math.floor((ms / (60 * 1000)) % 60);
      let hours = Math.floor((ms / (60 * 60 * 1000)) % 60);

      if (hours != 0) {
        return `${hours*60}:0${seconds}`
      } else if (minutes >= 10 && seconds >= 10) {
        return `${minutes}:${seconds}`;
      } else if (minutes < 10 && seconds < 10) {
        return `0${minutes}:0${seconds}`;
      } else if (minutes < 10) {
        return `0${minutes}:${seconds}`;
      } else if (seconds < 10) {
        return `${minutes}:0${seconds}`;
      }
}

const beep = new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav");
beep.volume = 0.5;


class ClockApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      timer: false,
      currentStage: "session",
      breakLength: 5,
      sessionLength: 25,
      timeSet: 0,
      timeCurrent: 0,
      pausedTime: 0,
      timeLeft: 0
    };
    this.changer = this.changer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.reset = this.reset.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }
  
  componentDidMount() {
    this.interval = setInterval(() => this.setState({ timeCurrent: Date.now() }), 1);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.intervalPaused);
  }  
  componentDidUpdate(prevProps, prevState) {
    if(JSON.stringify(this.state) != JSON.stringify(prevState)) {
      if(this.state.timer == false) {
        this.setState({timeLeft: this.state.timeLeft});
      } else {
        this.setState({timeLeft: this.state.timeSet - this.state.timeCurrent});
      }
      if(this.state.timer == true && this.state.timeCurrent > this.state.timeSet) {
        if(this.state.currentStage == "session") {
          beep.play();
          setTimeout(() => beep.pause(), 1000);
          this.setState({currentStage: "break", timeSet: Date.now() + this.state.breakLength * minute});
        } else if (this.state.currentStage == "break") {
          beep.play();
          setTimeout(() => beep.pause(), 1000);
          this.setState({timer: false, 
                       currentStage: "session", 
                       timeSet: 0,
                       timeCurrent: 0,
                       pausedTime: 0,
                       timeLeft: 0});
        }
      }
    }
  }
  
  changer(event) {
    switch(event.target.id) {
      case "break-decrement":
        if((this.state.breakLength - 1) > 0) {
          this.setState(state => state.breakLength = state.breakLength -= 1);
          if (this.state.currentStage == "break" && this.state.timeSet != 0) {
            this.setState(state => state.timeSet = state.timeSet -= 1 * minute);
          }
        }
        break;
      case "break-increment":
        if((this.state.breakLength + 1) <= 60) {
          this.setState(state => state.breakLength = state.breakLength += 1);
          if (this.state.currentStage == "break" && this.state.timeSet != 0) {
            this.setState(state => state.timeSet = state.timeSet += 1 * minute);
          }
        }
        break;
      case "session-decrement":
        if((this.state.sessionLength - 1) > 0) {
          this.setState(state => state.sessionLength = state.sessionLength -= 1);
          if (this.state.currentStage == "session" && this.state.timeSet != 0) {
            this.setState(state => state.timeSet = state.timeSet -= 1 * minute);
          }
        }
        break;
      case "session-increment":
        if((this.state.sessionLength + 1) <= 60) {
          this.setState(state => state.sessionLength = state.sessionLength += 1);
          if (this.state.currentStage == "session" && this.state.timeSet != 0) {
            this.setState(state => state.timeSet = state.timeSet += 1 * minute);
          }
        }
        break;
    }
 }
  
  startTimer() {
    let stage = this.state.currentStage;
    this.setState({timer: !this.state.timer })

    if (this.state.timer == false && this.state.timeSet == 0) {
      this.setState({
        timeSet: (Date.now() + this.state[`${stage}Length`] * minute),
      });
    } else if(this.state.timer == false) {
      this.setState({ 
        timeSet: this.state.timeSet + (Date.now() - this.state.pausedTime),
        pausedTime: 0      
      });
    } else if (this.state.timer && this.state.timeSet != 0) {
      this.setState({ pausedTime: Date.now() });
    }
  }
  
  reset() {
    this.setState({
      timer: false,
      currentStage: "session",
      breakLength: 5,
      sessionLength:25,
      timeSet: 0,
      timeCurrent: Date.now(),
      pausedTime: 0,
      timeLeft: 0
    });
  }
  
  render() {
    let upArrow = "↑"
    let downArrow = "↓"
    let startStop = "\u23EF"
    let reset = "\u21BA"
    return (
      <div>
        <h1>25 + 5 Clock</h1>
        
        <div id="settings" style={{display:"flex"}}>
          <div class="time-controls" style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gridTemplateRows:"1fr 1fr"}}>
            <h2 id="break-label" style={{gridArea:"1/1/span 1/span 3"}}>Break Time</h2>
            <button class="time-buttons" id="break-decrement" onClick={this.changer}>{downArrow}</button>
            <h3 id="break-length">{this.state.breakLength}</h3>
            <button class="time-buttons" id="break-increment" onClick={this.changer}>{upArrow}</button>
          </div>
          <div class="time-controls" style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gridTemplateRows:"1fr 1fr"}}>
            <h2 id="session-label" style={{gridArea:"1/1/span 1/span 3"}}>Session Time</h2>
            <button class="time-buttons" id="session-decrement" onClick={this.changer}>{downArrow}</button>
            <h3 id="session-length">{this.state.sessionLength}</h3>
            <button class="time-buttons" id="session-increment" onClick={this.changer}>{upArrow}</button>
          </div>
        </div>
        
        <div id="display">
          <h2 id="timer-label">{this.state.currentStage}</h2>
          <h1 id="time-left">{this.state.timeLeft == 0 ? msToTime(this.state.sessionLength*minute) : msToTime(this.state.timeLeft)}</h1>
        </div>
        
        <div id="controls" style={{display:"flex"}}>
          <button class="control-buttons" id="start_stop" onClick={this.startTimer}>{startStop}</button>
          <button class="control-buttons" id="reset" onClick={this.reset}>{reset}</button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<ClockApp />, document.getElementById("container"));
