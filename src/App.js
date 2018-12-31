import React, { Component } from 'react';
import Maincontainer from './Components/Maincontainer'
import RssForm from './Components/Forms';
import './App.scss';
import './styles/media.css';
class App extends Component {
  constructor(){
    super();
    this.state = {
      rssJson:null
    };
  }
  onDataReturn(jsonData){
    this.setState({
      rssJson:jsonData
    });
  }
  render() {
    return (
      <div className="AppContainer">
        <RssForm jsonData = {this.onDataReturn.bind(this)}/>
        <Maincontainer rssJson={this.state.rssJson} />
      </div>

    );
  }
}
export default App;
