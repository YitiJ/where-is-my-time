import React from 'react';
import Clock from './components/Clock.js'
import Selection from './components/Selection.js'

class TimerPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {start:false}
  }
  render(){
    return(
    <div>
        <div className="text-5xl text-center font-medium mt-32">
            Current Time
            <Clock className="text-9xl"/>
        </div>
        <Selection/>
    </div>
    );
  }
}

export default TimerPage;