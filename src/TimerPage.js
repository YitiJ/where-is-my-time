import React from 'react';
import Clock from './components/Clock.js'
import Selection from './components/Selection.js'
import Timer from './components/Timer.js'

class TimerPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {start:false}
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.clockRef = React.createRef();
  }
  render(){
    const dynamicContent = this.state.start ? <Timer className="text-center" start={Date.now()} task={this.selected} stopTimer={this.stopTimer}/> : <Selection submitFn={this.startTimer}/>;
    return(
    <div>
        <div ref={this.clockRef} className="text-5xl text-center font-medium transition-spacing ease-in-out duration-700 mt-32">
            Current Time
            <Clock className="text-9xl"/>
        </div>
        {dynamicContent}
    </div>
    );
  }

  startTimer(event,task){
    this.clockRef.current.classList.toggle("mt-32");
    this.clockRef.current.classList.toggle("mt-4");
    this.selected = task;
    this.setState({start: true});
  }

  stopTimer(){
    this.clockRef.current.classList.toggle("mt-4");
    this.clockRef.current.classList.toggle("mt-32");
    console.log(this.clockRef);
    this.selected = null;
    this.setState({start: false});
  }
}

export default TimerPage;