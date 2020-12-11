const heater1 = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3');
const heater2 = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3');
const heater3 = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3');
const heater4 = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3');
const heater6 = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3');
const dsc = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3');
const knh = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3');
const kick = new Audio('https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3');
const cev = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3');

let sounds = [
  {
    name: "Heater 1",
    key: "Q",
    audio: heater1
  },
  {
    name: "Heater 2",
    key: "W",
    audio: heater2
  },
  {
    name: "Heater 3",
    key: "E",
    audio: heater3
  },
  {
    name: "Heater 4",
    key: "A",
    audio: heater4
  },
  {
    name: "Clap",
    key: "S",
    audio: heater6
  },
  {
    name: "Open High Hat",
    key: "D",
    audio: dsc
  },
  {
    name: "Kick n' Hat",
    key: "Z",
    audio: knh
  },
  {
    name: "Kick",
    key: "X",
    audio: kick
  },
  {
    name: "Closed High Hat",
    key: "C",
    audio: cev
  }
]

class DrumBox extends React.Component {
  constructor(props) {
    super (props)
    this.state = {
      lastSound: "-", 
      active: false,
      pressedPad: ""      
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.playSound = this.playSound.bind(this);
  }
  
  handleKeyPress(event) {
    if(/[qweasdzxc]/i.test(event.key)) {
      document.getElementById(event.key.toUpperCase()).click();
    }
  }

  pressActive(value) {
        this.setState({active: !this.state.active, key: value});
        setTimeout(() =>{ 
          this.setState({active: !this.state.active, key: ""});
        }, 200)
  }

  
  playSound(event) {
    this.pressActive(event.target.value);
    let soundToPlay = sounds.filter(a => a.key == event.target.value)[0];
    this.setState({lastSound: soundToPlay["name"]})
    soundToPlay["audio"].play();
  }
  
  render () {
    return (
      <div id="drum-machine" onKeyPress={this.handleKeyPress} style={{display:"flex", flexDirection:"column"}}>
        <div id="buttons" style={{display: "grid", gridTemplateColumns:"1fr 1fr 1fr"}}>
          <button class={this.state.active ? (this.state.key=="Q" ? "drum-pad-active" : "drum-pad"): "drum-pad"} id="Q" value="Q" onClick={this.playSound}>Q</button>
          <button class={this.state.active ? (this.state.key=="W" ? "drum-pad-active" : "drum-pad"): "drum-pad"} id="W" value="W" onClick={this.playSound}>W</button>
          <button class={this.state.active ? (this.state.key=="E" ? "drum-pad-active" : "drum-pad"): "drum-pad"} id="E" value="E" onClick={this.playSound}>E</button>
          <button class={this.state.active ? (this.state.key=="A" ? "drum-pad-active" : "drum-pad"): "drum-pad"} id="A" value="A" onClick={this.playSound}>A</button>
          <button class={this.state.active ? (this.state.key=="S" ? "drum-pad-active" : "drum-pad"): "drum-pad"} id="S" value="S" onClick={this.playSound}>S</button>
          <button class={this.state.active ? (this.state.key=="D" ? "drum-pad-active" : "drum-pad"): "drum-pad"} id="D" value="D" onClick={this.playSound}>D</button>
          <button class={this.state.active ? (this.state.key=="Z" ? "drum-pad-active" : "drum-pad"): "drum-pad"} id="Z" value="Z" onClick={this.playSound}>Z</button>
          <button class={this.state.active ? (this.state.key=="X" ? "drum-pad-active" : "drum-pad"): "drum-pad"} id="X" value="X" onClick={this.playSound}>X</button>
          <button class={this.state.active ? (this.state.key=="C" ? "drum-pad-active" : "drum-pad"): "drum-pad"} id="C" value="C" onClick={this.playSound}>C</button>
        </div>
        <div id="display">
          <p>{this.state.lastSound}</p>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<DrumBox />, document.getElementById("container"))
