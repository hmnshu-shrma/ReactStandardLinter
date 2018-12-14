import React, { Component } from 'react'
import '../styles/maincontainer.css';
class Maincontainer extends Component {



  render(){
    console.log("this is mainpage",this.props);
    return(
      <div className='main__container'>
      <p>Scotch School rocks! </p>




      </div>
    );
  }
}
export default Maincontainer;
