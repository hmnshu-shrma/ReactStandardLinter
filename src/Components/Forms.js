import React, { Component } from 'react'
import '../styles/sidebar.css';
import LinkslistContainer from './Linkslist';

class RssForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      error:null,
      isLoaded:false,
      items:[],
      data:'',
      urlList:[]
    }
  }
  componentDidMount() {
    let UserStateHistory = localStorage.getItem('state');
    console.log(this.props,"props")
    if(this.state.urlList.length === 0 ){
      // console.log(JSON.parse(UserStateHistory),"local storage");
      this.setState({
        urlList:this.state.urlList.concat(JSON.parse(UserStateHistory))
      });
    }
  }

  handleFeed(args){
    this.handleHttpCalls(args);
  }

  handleHttpCalls(argsurl){
    fetch('https://api.rss2json.com/v1/api.json?rss_url='+ encodeURIComponent(argsurl))
    .then(res => res.json())
    .then((result)=>{
      this.setState({
        isLoaded:true,
        data:result,
        urlList:[...this.state.urlList,argsurl]
      });
      if(this.state.urlList){
        const serializedState = JSON.stringify(this.state.urlList);
        localStorage.setItem('state', serializedState);
      }
      this.sendData(this.state.data);

    },(error)=>{
      this.setState({
        isLoaded:true,
        error
      });
    }
  )
}

handleSubmit(e) {
  let url = this.input.value;
  e.preventDefault();
  var RepeatedUrl = this.state.urlList.filter(function(listItem) {
    if(listItem === url){
      return false
    }else{
      return true;
    }
  });
  RepeatedUrl ? console.log('present', url):console.log('not present', url)

  this.handleHttpCalls(url);
}


handleDelete(itemToBeDeleted) {
  console.log(itemToBeDeleted,"froms page item to be ddeleted");
  var newItems = this.state.urlList.filter( (_item) => {
    return _item !== itemToBeDeleted
  } )
  console.log(newItems,'new list');
  this.setState({ urlList: newItems }) ;
  const serializedState = JSON.stringify(newItems);
  localStorage.setItem('state', serializedState);
}


sendData(args){
  this.props.jsonData(args);
}

render() {
  // let RssUrl = this.state;
  return (
    <div className='sidebar__nav'>
      <form onSubmit={this.handleSubmit} className="rssform">
        <label>
          <input type="text" placeholder="Rss link" ref={(input) => this.input = input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <LinkslistContainer
        linksData={this.state.urlList}
        handleDelete={this.handleDelete.bind(this)}
        handleFeed={this.handleFeed.bind(this)} />
    </div>
  );
}
}
export default RssForm;
