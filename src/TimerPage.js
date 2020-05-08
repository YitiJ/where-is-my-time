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
  }
  render(){
    const dynamicContent = this.state.start ? <Timer start={Date.now()} task={this.selected} stopTimer={this.stopTimer}/> : <Selection submitFn={this.startTimer}/>;
    return(
    <div>
        <div className="text-5xl text-center font-medium mt-32">
            Current Time
            <Clock className="text-9xl"/>
        </div>
        {dynamicContent}
    </div>
    );
  }

  startTimer(event,task){
    this.selected = task;
    this.setState({start: true});
  }

  stopTimer(){
    this.selected = null;
    this.setState({start: false});
  }
}

export default TimerPage;