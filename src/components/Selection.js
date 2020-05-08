import React from 'react';

const AddTask = ({handleClose, handleAdd, show}) => {
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
const InputCard=({className})=>{
    return (<input className={className + " text-center font-black rounded-md focusBorder"}
    maxLength="1"
    size="1"
    placeholder="0"/>);
}

const Duration = ({className,show}) => {
    if(!show) return (null);
    return(
        <div className={className} id="duration">
            <label className="block font-medium text-2xl">Duration (hour:min)</label>
            <InputCard className="mr-2 inputCard input-blue"/>
            <InputCard className="mr-2 inputCard input-blue"/>
            <span className="mr-2 text-3xl font-bold">:</span>
            <InputCard className="mr-2 inputCard input-blue"/>
            <InputCard className="mr-6 inputCard input-blue"/>
            <button className="px-12 py-3 bg-blue-3 rounded-md text-blue-4 text-2xl font-bold focusBorder">Start</button>
        </div>
    );
}

const options=[
{name:"Homework",key:"1"},{name:"Minecraft", key:"2"}
];
class Selection extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: "",showNew: false, showDuration:false, options:options};
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
            this.setState({value: event.target.value, showDuration:true});
        }
    }
    handleAdd(event,input){
        var options = this.state.options;
        options.push({name: input.value,key:options.length+1});
        this.setState({value: input.value,showDuration:true,options:options});
        this.hideModal();
    }

    render(){
        return (
            <div className="relative flex flex-col w-1/3 mx-auto">
                <AddTask show={this.state.showNew} handleClose={this.hideModal} handleAdd={this.handleAdd}/>
                <select className="flex-auto h-20 px-12 input-blue text-3xl focusBorder rounded-lg"
                value={this.state.value} onChange={this.handleChange}>
                    <option value="" key="-1" disabled hidden>Please Choose...</option>
                    {this.state.options.map((obj)=>
                        <option
                            value={obj.name} key={obj.key}>{obj.name}</option>)}
                    <option value="new" key="-2" data-key="-2" className="bg-purple-2">+  Create Task</option>
                </select>
                <Duration className="pt-6 mx-auto" show={this.state.showDuration}/>
            </div>
        );
    }
}

export default Selection;