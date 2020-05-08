import React from 'react';
import Clock from './components/Clock.js'
import Selection from './components/Selection.js'

function App() {
  return (
    <div>
      <Nav/>
      <div className="text-5xl text-center font-medium mt-32">
        Current Time
        <Clock className="text-9xl"/>
      </div>
      <Selection/>
    </div>
  );
}

function Icon(props){
  return(
    <a className={props.className} href={props.href}>
      <img src={require("./assets/" + props.src)} alt={props.name}/>
      {props.name}
    </a>
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
      <Icon className="mr-12" src="nav/statistic.svg" name="Statistic"/>
      <Icon src="nav/setting.svg" name="Setting"/>
    </div>
  </div>
  );
}

export default App;
