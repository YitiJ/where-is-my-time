import React from 'react';
import moment from 'moment'
import { DateRangePicker,} from 'react-dates';
import {findHistory} from './../../dbManager';
import 'react-dates/lib/css/_datepicker.css';

const formatTime = (time)=>{
    return new Date(time*1000).toISOString().substr(11,8);
}

const TaskLog = ({historyList,className})=>{
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
                <div key={key} className="flex flex-row">
                    <div className="w-2/3">{name[key]}</div>
                    <div className="w-1/3">{formatTime(tasks[key])}</div>
                </div>
            );
        }
    }
    return (
        <div className={className + " flex flex-col py-2 px-4"}>
            <div className="text-center">Total Time Spent on Tasks</div>
            <div className="flex flex-row">
                <div className="w-2/3">Task Name</div>
                <div className="w-1/3">Time Spent</div>
            </div>
            {inner}
        </div>);
    
}

const TimeLog = ({historyList,className})=>{
    if(historyList == null || historyList.length == 0) return (null);
    var inner = [];
    for(let his of historyList){
        inner.push(
            <div key={his._id} className="flex flex-row">
                <div className="w-1/2">
                    {moment(his.startTime).format("ddd MMM Do YYYY, h:mm a")}
                </div>
                <div className="w-1/4">{his.task.name}</div>
                <div className="w-1/4">{formatTime(his.duration)}</div>
            </div>
        );
    }
    return (
        <div className={className}>
            <div className={"flex flex-col flex-initial bg-blue-4 rounded-md py-2 px-4"}>
                <div className="text-center">Time Log</div>
                <div className="flex flex-row">
                    <div className="w-1/2">Time</div>
                    <div className="w-1/4">Name</div>
                    <div className="w-1/4">Duration</div>
                </div>
                {inner}
            </div>
        </div>
        );
}
class CalendarPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.submitDate = this.submitDate.bind(this);
    }

    async submitDate(){
        if(this.state.startDate == null || this.state.endDate == null) return;
        const data = (await findHistory(this.state.startDate.startOf('day').valueOf(),this.state.endDate.endOf('day').valueOf())).data;
        this.setState({list:data});
    }

    render(){
        const btnclass = this.state.startDate != null && this.state.endDate != null ? "" : " opacity-50 cursor-not-allowed";
        return (
            <div className="mt-10 mx-10 flex flex-row">
                <div className="mx-auto">
                    <div className="text-xl">Select Range:</div>
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
                    <button className={"ml-3 px-12 py-3 btn text-blue-4 text-lg font-bold focusBorder align-middle" + btnclass}
                        onClick={this.submitDate}>Submit</button>
                    <TaskLog className="mt-6" historyList={this.state.list}/>
                </div>
                <TimeLog className="flex-auto ml-16" historyList={this.state.list}/>
            </div>
        );
    }
}
export default CalendarPage;