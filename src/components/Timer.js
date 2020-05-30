import React from 'react';
import {addHistory} from './../dbManager.js'
import Spinner from './Spinner'

class Clock extends React.Component{

  constructor(props){
    super(props);
    this.state ={
        time: 0,
        loading:false
    }
    this.cancel = false;
    this.stopTimer = this.stopTimer.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount(){
    clearInterval(this.timerID);
    if(!this.cancel){
      this.save();
    }
  }

  tick(){
    this.setState({
      time: Date.now() - this.props.start
    });
  }

  formatTime(time){
      return new Date(time).toISOString().substr(11,8);
  }

  onCancel(){
    this.cancel = true;
    this.stopTimer();
  }

  stopTimer(){
    this.props.stopTimer();
  }

  async save(){
    try{
      this.setState({loading:true});
      await addHistory(this.props.task._id,this.state.time/1000,this.props.start);
    }
    catch(err){
      console.error(err);
      alert("Something went wrong when saving your timer. Please refresh your page");
      this.setState({loading:false});
    }
  }

  render(){
    return(
      <div className={this.props.className + " text-3xl"}>
        <Spinner show={this.state.loading}/>
        <div className="mt-10">
          Doing: {this.props.task.name}
        </div>
        <div>
          {this.formatTime(this.state.time)}
        </div>
        <button onClick={this.stopTimer} className="btn text-blue-4 font-bold py-1 px-4 mt-4 mr-3 focusBorder">End</button>
        <button onClick={this.onCancel} className="btn bg-red-2 text-red-3 font-bold py-1 px-4 mt-4 focusBorder">Cancel</button>
      </div>
    );
  }
}

export default Clock;