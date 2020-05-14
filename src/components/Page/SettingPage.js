import React from 'react';
import {getTasks} from './../../dbManager'
import Spinner from './../Spinner'


function EditTaskModal({task,closeFn, saveFn, show, reference}){
    if(!show) return (null);
    return (
      <div className="modal">
        <div className="modal-main rounded-lg text-gray-1">
            <label htmlFor="new" className="text-gray-1 text-4xl mx-8">Task Name:</label>
            <input  ref={reference} id="new" className="h-20 w-1/2 my-20 px-4 input-white text-3xl focusBorder" placeholder="Task Name" onFocus={() => {reference.current.classList.remove("invalidInput");reference.current.placeholder = "Task Name"}}></input>
            <button className="mx-8 px-6 py-3 text-3xl btn text-white font-medium focusBorder" onClick={() => saveFn(task)}>Add</button>
            <button className="absolute top-0 right-0 p-4 text-2xl focusBorder rounded-lg" onClick={() => closeFn()}>Close</button>
        </div>
      </div>
    );
}
function DeleteTaskModal({task,closeFn, deleteFn, show}){
    if(!show) return (null);
    return (
      <div className="modal">
        <div className="modal-main rounded-lg text-gray-1">
            <div className="text-gray-1 text-4xl mx-8">Are you sure to delete {task.name} ?</div>
            <button className="mx-8 px-6 py-3 text-3xl btn text-white font-medium focusBorder" onClick={() => deleteFn(task)}>Delete</button>
            <button className="absolute top-0 right-0 p-4 text-2xl focusBorder rounded-lg" onClick={() => closeFn()}>Close</button>
        </div>
      </div>
    );
}

function Row({task,editFn,deleteFn}){
return (
    <div key={task._id} className="flex flex-row justify-between font-medium">
        <div>{task.name}</div>
        <div>
            <input className="w-6 inline mx-3 focusBorder" src={require("./../../assets/edit.svg")} alt="Edit" type="image" onClick={(event)=>editFn(task)}/>
            <input className="w-6 inline focusBorder" src={require("./../../assets/delete.svg")} alt="Delete" type="image" onClick={(event)=>deleteFn(task)}/>
        </div>
    </div>
    );
}

class SettingPage extends React.Component{

    constructor(props){
        super(props);
        this.state={tasks:[],showEdit:false,showDelete:false,loading:true};
        this.onDelete = this.onDelete.bind(this);
        this.onSave = this.onSave.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.modalInputRef = React.createRef();
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
    onSave(task){
        console.log("saving" + task._id);
    }
    onDelete(task){
        console.log("deleting" + task._id);
    }

    openEditModal(task){
        this.setState({showEdit: true,task: task});
    }
    closeEditModal(){
        this.setState({showEdit: false});
    }

    openDeleteModal(task){
        this.setState({showDelete: true,task: task});
    }
    closeDeleteModal(){
        this.setState({showDelete: false});
    }

    render(){
        const content = this.state.tasks.map((task)=> <Row key={task._id} task={task} editFn={this.openEditModal} deleteFn={this.openDeleteModal}/>);
        return(
            <div className="flex p-4 text-blue-5">
                <Spinner show={this.state.loading} />
                <EditTaskModal closeFn={this.closeEditModal} show={this.state.showEdit} saveFn={this.onSave} task={this.state.task} reference={this.modalInputRef}/>
                <DeleteTaskModal closeFn={this.closeDeleteModal} show={this.state.showDelete} deleteFn={this.onDelete} task={this.state.task}/>
                <div className="bg-blue-3 w-1/5 h-1/2-screen py-3 px-8 rounded-md overflow-y-auto mr-4">
                    <div className="text-center font-semibold text-xl mb-3">Manage your task</div>
                    {content}
                </div>
            </div>
        );
    }
}

export default SettingPage;