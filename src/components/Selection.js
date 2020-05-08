import React from 'react';

const AddTaskModal = ({handleClose, handleAdd, show}) => {
    if(!show) return (null);
    return (
      <div className="modal">
        <div className="modal-main rounded-lg text-gray-1">
            <label htmlFor="new" className="text-gray-1 text-4xl mx-8">Task Name:</label>
            <input  id="new" className="h-20 w-1/2 my-20 px-4 rounded-lg text-3xl border-2 border-blue-2 focusBorder" placeholder="Task Name"></input>
            <button className="mx-8 px-6 py-3 text-3xl bg-blue-3 text-white rounded-md focusBorder" onClick={(e) => handleAdd(e,document.getElementById("new"))}>Add</button>
            <button className="absolute top-0 right-0 p-4 text-2xl focusBorder rounded-lg" onClick={handleClose}>Close</button>
        </div>
      </div>
    );
}

const options=[
{name:"Homework",key:1},{name:"Minecraft", key:2}
];
class Selection extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: "",showNew: false, showStart:false, options:options};
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
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
    handleAdd(event,input){
        var options = this.state.options;
        this.selected={name: input.value,key:options.length+1};
        options.push(this.selected);
        this.setState({value: input.value,showStart:true,options:options});
        this.hideModal();
    }

    render(){
        const startButton = this.state.showStart ?
            <button className="mt-3 px-12 py-3 bg-blue-3 rounded-md text-blue-4 text-2xl font-bold focusBorder"
                onClick={(event) => this.props.submitFn(event,this.selected)}>Start</button>
            : (null);
        return (
            <div className="relative flex flex-col w-1/3 mx-auto">
                <AddTaskModal show={this.state.showNew} handleClose={this.hideModal} handleAdd={this.handleAdd}/>
                <select className="flex-auto h-20 px-12 input-blue text-3xl focusBorder rounded-lg"
                value={this.state.value} onChange={this.handleChange}>
                    <option value="" key="-1" disabled hidden>Please Choose...</option>
                    {this.state.options.map((obj)=>
                        <option
                            value={obj.name} key={obj.key}>{obj.name}</option>)}
                    <option value="new" key="-2" data-key="-2" className="bg-purple-2">+  Create Task</option>
                </select>
                {startButton}
            </div>
        );
    }
}

export default Selection;