import React from 'react';
import {addHistory} from './../dbManager.js'

class Clock extends React.Component{

  constructor(props){
    super(props);
    this.state ={
        time: 0
    }
    this.stopTimer = this.stopTimer.bind(this);
  }

  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  tick(){
    this.setState({
      time: Date.now() - this.props.start
    });
  }

  formatTime(time){
      return new Date(time).toISOString().substr(11,8);
  }

  async stopTimer(){
    try{
      const data = await addHistory(this.props.task._id,this.state.time/1000,this.props.start);
    }
    catch(err){
      console.error(err);
      alert("Something went wrong when saving your timer.");
    }
    this.props.stopTimer();
  }

  render(){
    return(
      <div className={this.props.className + " text-3xl"}>
        <div className="mt-10">
          Doing: {this.props.task.name}
        </div>
        <div>
          {this.formatTime(this.state.time)}
        </div>
        <button onClick={this.stopTimer} className="btn text-blue-4 font-bold py-1 px-4 mt-4 focusBorder">End</button>
      </div>
    );
  }
}

export default Clock;