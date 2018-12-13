import React, { Component } from 'react';
import Sidebar from './Components/Sidebar';
import Maincontainer from './Components/Maincontainer';
import './App.css';
class App extends Component {
  render() {
    return (
      <div className="AppContainer">
      <Sidebar />
      <Maincontainer />
      </div>
    );
  }
}
export default App;
