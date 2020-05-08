import React from 'react';

const AddTask = ({handleClose, handleAdd, show}) => {
    if(!show) return (null);
    return (
      <div className="modal">
        <div className="modal-main rounded-lg text-gray-1">
            <label htmlFor="new" className="text-gray-1 text-4xl mx-8">Task Name:</label>
            <input  id="new" className="h-20 w-1/2 my-20 border-blue-2 border-2 outline-none focus:shadow-outline rounded-lg text-3xl px-4" placeholder="Task Name"></input>
            <button className="mx-8 text-3xl bg-blue-3 text-white rounded-md px-6 py-3" onClick={(e) => handleAdd(e,document.getElementById("new"))}>Add</button>
            <button className="absolute top-0 right-0 p-4 text-2xl" onClick={handleClose}>Close</button>
        </div>
      </div>
    );
}
const InputCard=({className})=>{
    return (<input className={className + " text-center font-black rounded-md outline-none focus:shadow-outline"}
    maxLength="1"
    size="1"
    placeholder="0"/>);
}

const Duration = ({className,show}) => {
    if(!show) return (null);
    return(
        <div className={className} id="duration">
            <label className="block font-medium text-2xl">Duration (hour:min)</label>
            <InputCard className="mr-2 text-3xl w-12 h-16 px-3 py-4 text-gray-1 bg-blue-1 focus:bg-blue-2"/>
            <InputCard className="mr-2 text-3xl w-12 h-16 px-3 py-4 text-gray-1 bg-blue-1 focus:bg-blue-2"/>
            <span className="mr-2 text-3xl font-bold">:</span>
            <InputCard className="mr-2 text-3xl w-12 h-16 px-3 py-4 text-gray-1 bg-blue-1 focus:bg-blue-2"/>
            <InputCard className="mr-6 text-3xl w-12 h-16 px-3 py-4 text-gray-1 bg-blue-1 focus:bg-blue-2"/>
            <button className="bg-blue-3 rounded-md text-blue-4 px-12 py-3 text-2xl font-bold">Start</button>
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
                <select className="h-20 flex-auto px-12 text-gray-1 text-3xl outline-none bg-blue-1 focus:bg-blue-2 rounded-lg focus:shadow-outline placeholder-gray-1"
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