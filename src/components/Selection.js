import React from 'react';
import {getTasks,addTask,findTask} from './../dbManager.js'
import Loader from 'react-loader-spinner'

const AddTaskModal = ({handleClose, handleAdd, show, reference}) => {
    if(!show) return (null);
    return (
      <div className="modal">
        <div className="modal-main rounded-lg text-gray-1">
            <label htmlFor="new" className="text-gray-1 text-4xl mx-8">Task Name:</label>
            <input  ref={reference} id="new" className="h-20 w-1/2 my-20 px-4 input-white text-3xl focusBorder" placeholder="Task Name" onFocus={() => {reference.current.classList.remove("invalidInput");reference.current.placeholder = "Task Name"}}></input>
            <button className="mx-8 px-6 py-3 text-3xl btn text-white font-medium focusBorder" onClick={(e) => handleAdd(e,reference)}>Add</button>
            <button className="absolute top-0 right-0 p-4 text-2xl focusBorder rounded-lg" onClick={handleClose}>Close</button>
        </div>
      </div>
    );
}

class Selection extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: "",showNew: false, showStart:false, options:[],loading:true};
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.modalInputRef = React.createRef();
    }

    componentDidMount(){
        getTasks().then(res =>{
            var data = res.data;
            var options = [];
            for(let t of data){
                options.push(t);
            }
            this.setState({options:options,loading:false});
        }).catch(err=>{
            console.error(err);
            alert("Something went wrong when fetching your task.\n" + err);
        });
    }

    showModal = () => {
        this.setState({ showNew: true });
      };
    
    hideModal = () => {
        this.setState({ showNew: false });
    };

    handleChange(event){
        const options = event.target.options;
        if(options[options.selectedIndex].getAttribute('data-key') === "-2"){
            this.showModal();
        }
        else{
            this.selected = this.state.options[options.selectedIndex - 1];
            this.setState({value: event.target.value, showStart:true});
        }
    }
    async handleAdd(event,ref){
        //validation
        var input = ref.current.value;
        if(input.length == 0){
            ref.current.placeholder = "Invalid operation";
            ref.current.classList.add("invalidInput");
            return;
        }
        try{
            this.setState({loading:true});
            var res = await addTask(input);
            var options = this.state.options;
            this.selected=res.data;
            options.push(this.selected);
            this.setState({value: input,showStart:true,options:options});
            this.hideModal();
        }
        catch(err){
            ref.current.placeholder = "Invalid operation";
            ref.current.classList.add("invalidInput");
            console.error(err);
            alert("Something went wrong when adding task.\n" + err);
        }
        this.setState({loading:false});
    }

    async onStart(event){
        try{
            if(this.selected == null){
                throw Error("No Task Selected: Please refresh your page.");
            }
            this.setState({loading:true});
            const res = await findTask(this.selected._id);
            if(res.data == null){
                throw Error("Task Not Found: Please refresh your page.");
            }
            else{
                this.props.startTimer(event,this.selected);
            }
        }catch(err){
            console.error(err);
            alert("Something went wrong when fetching selected task.\n" + err);
            this.setState({loading:false});
        }
    }

    render(){
        const startButton = this.state.showStart ?
            <button className="mt-3 px-12 py-3 btn text-blue-4 text-2xl font-bold focusBorder"
                onClick={(event) => this.onStart(event)}>Start</button>
            : (null);
        return (
            <div className="relative flex flex-col w-1/3 mx-auto">
                <Loader type="Circles" color="#9098C6" visible={this.state.loading} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"/>
                <AddTaskModal show={this.state.showNew} handleClose={this.hideModal} handleAdd={this.handleAdd} reference={this.modalInputRef}/>
                <select className="flex-auto h-20 px-12 input-blue text-3xl focusBorder rounded-lg"
                value={this.state.value} onChange={this.handleChange}>
                    <option value="" key="-1" disabled hidden>Please Choose...</option>
                    {this.state.options.map((obj)=>
                        <option
                            value={obj.name} key={obj._id}>{obj.name}</option>)}
                    <option value="new" key="-2" data-key="-2" className="bg-purple-2">+  Create Task</option>
                </select>
                {startButton}
            </div>
        );
    }
}

export default Selection;