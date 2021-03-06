import React from 'react';

class Clock extends React.Component{

  constructor(props){
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(),
      10000
    );
  }
  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  tick(){
    this.setState({
      date: new Date()
    });
  }

  render(){
    return(
      <div className={this.props.className}>
        {this.state.date.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}
      </div>
    );
  }
}

export default Clock;