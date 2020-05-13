import React from 'react';
import TimerPage from './components/Page/TimerPage'
import CalendarPage from './components/Page/CalendarPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Nav/>
      <Switch>
        <Route path="/calendar">
          <CalendarPage />
        </Route>
        <Route path="/">
          <TimerPage />
        </Route>
      </Switch>
    </Router>
  );
}

function Icon(props){
  return(
    <Link to={props.href} className={props.className}>
      <img src={require("./assets/" + props.src)} alt={props.name}/>
      {props.name}
    </Link>
  );
}
function Nav(props){
  return (
    <nav className="flex flex-row justify-between pt-6 px-12">
      <div className="flex flex-row text-center items-end">
        <Icon className="mr-12" src="nav/timer.svg" name="Timer" href="/"/>
        <Icon src="nav/calendar.svg" name="Calendar" href="/calendar"/>
      </div>
      <div className="flex flex-row text-center items-end">
        <Icon src="nav/setting.svg" name="Setting" href="/setting"/>
      </div>
    </nav>
  );
}

export default App;
