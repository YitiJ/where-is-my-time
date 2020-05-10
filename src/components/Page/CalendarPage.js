import React from 'react';
import moment from 'moment'
import { DateRangePicker,} from 'react-dates';
import {findHistory} from './../../dbManager';
import 'react-dates/lib/css/_datepicker.css';

const formatTime = (time)=>{
    return new Date(time*1000).toISOString().substr(11,8);
}

const TaskLog = ({historyList})=>{
    if(historyList == null || historyList.length == 0) return (null);
    var tasks = [];
    var name = [];
    for(let h of historyList){
        if(tasks[h.task._id] == null){
            tasks[h.task._id]=0;
            name[h.task._id]=h.task.name;
        }
        tasks[h.task._id]+=h.duration;
    }
    var inner = [];
    for(var key in tasks){
        if(tasks.hasOwnProperty(key)){
            inner.push(
                <div key={key}>Task: {name[key]}, Time Spent: {formatTime(tasks[key])}</div>
            );
        }
    }
    return inner;
    
}

const TimeLog = ({historyList})=>{
    if(historyList == null || historyList.length == 0) return (null);
    var inner = [];
    for(let his of historyList){
        inner.push(
        <div key={his._id}> Start Time: {moment(his.startTime).format("ddd MMM Do YYYY, h:mm a")}, Task: {his.task.name}</div>
        );
    }
    return inner;
}
class CalendarPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.submitDate = this.submitDate.bind(this);
    }

    async submitDate(){
        const data = (await findHistory(this.state.startDate.startOf('day').valueOf(),this.state.endDate.endOf('day').valueOf())).data;
        this.setState({list:data});
    }

    render(){
        const button = this.state.startDate != null && this.state.endDate != null ?
            <button className="mt-3 px-12 py-3 btn text-blue-4 text-2xl font-bold focusBorder"
            onClick={this.submitDate}>Submit</button>
        : (null);
        return (
            <div>
                <DateRangePicker
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                startDateId="START_DATE" // PropTypes.string.isRequired,
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                endDateId="END_DATE" // PropTypes.string.isRequired,
                onDatesChange={({startDate,endDate})=>this.setState({startDate,endDate})} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                isOutsideRange={()=>false}
                minimumNights={0}
                />
                {button}
                <TimeLog historyList={this.state.list}/>
                <TaskLog historyList={this.state.list}/>
            </div>
        );
    }
}
export default CalendarPage;