import React from 'react';
import {getTasks,addTask} from './../dbManager.js'

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
        this.state = {value: "",showNew: false, showStart:false, options:[]};
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.modalInputRef = React.createRef();
    }

    componentDidMount(){
        getTasks().then((res) => this.setState({options:res}));
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
    handleAdd(event,ref){
        var input = ref.current.value;
        if(input.length == 0){
            ref.current.placeholder = "Field cannot be empty";
            ref.current.classList.add("invalidInput");
            return;
        }
        addTask(input).then(res => {
            var options = this.state.options;
            this.selected=res;
            options.push(this.selected);
            this.setState({value: input,showStart:true,options:options});
            this.hideModal();
        });
    }

    render(){
        const startButton = this.state.showStart ?
            <button className="mt-3 px-12 py-3 btn text-blue-4 text-2xl font-bold focusBorder"
                onClick={(event) => this.props.submitFn(event,this.selected)}>Start</button>
            : (null);
        return (
            <div className="relative flex flex-col w-1/3 mx-auto">
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