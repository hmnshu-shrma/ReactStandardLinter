import React, { Component } from 'react'
import '../styles/sidebar.css';
class RssForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      error:null,
      isLoaded:false,
      items:[],
      data:'',
      newName:'Himanshu'
    }
  }

  handleSubmit(e) {
    // alert('The value is: ' + this.input.value);
    e.preventDefault();
    console.log('this  came');
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then((result)=>{
      this.setState({
        isLoaded:true,
        data:result
      });

      //logs for data links
      // console.log('forms', this.state.data);

      this.sendData(this.state.data);
    },(error)=>{
      this.setState({
        isLoaded:true,
        error
      });
    }
  )
}
sendData(args){
  this.props.jsonData(args);
}
render() {
  // const {error , isLoaded, items } = this.state;

  return (
    <div className='sidebar__nav'>
    <form onSubmit={this.handleSubmit}>
    <label>
    <input type="text" placeholder="Rss link" ref={(input) => this.input = input} />
    </label>
    <input type="submit" value="Submit" />
    </form>
    </div>
  );
}
}
export default RssForm;
