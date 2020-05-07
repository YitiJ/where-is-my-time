import React from 'react';
import Clock from './components/Clock.js'

function Icon(props){
  console.log(props);
  return(
    <div className={props.className}>
      <img src={require("./assets/" + props.src)} alt={props.name}/>
      {props.name}
    </div>
  );
}

function Nav(props){
  return (
  <div className="flex flex-row justify-between pt-6 px-12">
    <div className="flex flex-row text-center items-end">
      <Icon className="mr-12" src="nav/timer.svg" name="Timer"/>
      <Icon src="nav/calendar.svg" name="Calendar"/>
    </div>
    <div className="flex flex-row text-center items-end">
      <Icon className="mr-12" src="nav/statistic.svg" name="statistic"/>
      <Icon src="nav/setting.svg" name="setting"/>
    </div>
  </div>
  );
}

function App() {
  return (
    <div>
      <Nav/>
      <div className="text-5xl">
        Current Time
      </div>
      <Clock />
    </div>
  );
}

export default App;
