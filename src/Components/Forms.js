import React, { Component } from 'react'
class RssForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      error:null,
      isLoaded:false,
      items:[]
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
          items:result.items
        });
    },(error)=>{
      this.setState({
        isLoaded:true,
        error
      });
    }
  )
}

  render() {
    const {error , isLoaded, items } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" placeholder="Rss link" ref={(input) => this.input = input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default RssForm;
