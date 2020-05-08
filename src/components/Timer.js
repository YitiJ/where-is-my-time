import React from 'react';

class Clock extends React.Component{

  constructor(props){
    super(props);
    this.state ={
        time: 0,
        start: props.startTime
    }
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

  render(){
    return(
      <div className={this.props.className + " text-2xl"}>
        <div className="mt-10">
          Doing: {this.props.task.name}
        </div>
        <div>
          {this.formatTime(this.state.time)}
        </div>
        <button onClick={this.props.stopTimer} className="btn text-blue-4 font-bold py-1 px-4 mt-4 focusBorder">End</button>
      </div>
    );
  }
}

export default Clock;