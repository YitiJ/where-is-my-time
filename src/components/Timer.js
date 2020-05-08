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
    this.props.stopTimer();
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
      <div className={this.props.className}>
        {this.formatTime(this.state.time)}
        <button onClick={this.props.stopTimer} className="borderFocus">End</button>
      </div>
    );
  }
}

export default Clock;