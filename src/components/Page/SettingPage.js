import React from 'react';
import {getTasks} from './../../dbManager'

function Row({task,editFn,deleteFn}){
return (
    <div className="flex flex-row justify-between font-medium">
        <div key={task._id}>{task.name}</div>
        <div>
            <input className="w-6 inline mx-3 focusBorder" src={require("./../../assets/edit.svg")} alt="Edit" type="image" onClick={(event)=>editFn(task)}/>
            <input className="w-6 inline focusBorder" src={require("./../../assets/delete.svg")} alt="Delete" type="image" onClick={(event)=>deleteFn(task)}/>
        </div>
    </div>
    );
}

class CalendarPage extends React.Component{

    constructor(props){
        super(props);
        this.state={tasks:[]};
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSave = this.onSave.bind(this);

    }

    componentDidMount(){
        getTasks().then(res =>{
            var data = res.data;
            var tasks = [];
            for(let t of data){
                tasks.push(t);
            }
            this.setState({tasks:tasks,loading:false});
        }).catch(err=>{
            console.error(err);
            alert("Something went wrong when fetching your task.\n" + err);
        });
    }
    onEdit(task){

    }
    onSave(task){

    }
    onDelete(task){
        
    }

    render(){
        const content = this.state.tasks.map((task)=> <Row task={task} editFn={this.onEdit} deleteFn={this.onDelete}/>);
        return(
            <div className="flex p-4 text-blue-5">
                <div className="bg-blue-3 w-1/5 h-1/2-screen py-3 px-8 rounded-md overflow-y-auto mr-4">
                    <div className="text-center font-semibold text-xl mb-3">Manage your task</div>
                    {content}
                </div>
            </div>
        );
    }
}

export default CalendarPage;