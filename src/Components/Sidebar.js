import React, { Component } from 'react'
import RssForm from './Forms'
import '../styles/sidebar.css';
class Sidebar extends Component {
  render(){
    return(
      <div className='sidebar__nav'>
      <RssForm />
      <p>Scotch School rocks!</p>
      </div>
    );
  }

}

export default Sidebar;
