import React, { Component } from 'react'
import '../styles/sidebar.css';
import '../styles/forms.css';
import LinkslistContainer from './Linkslist';
import search from '../search.svg';

class RssForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      error:null,
      isLoaded:false,
      items:[],
      data:'',
      urlList:[],
      userError:null
    }
  }
  componentDidMount() {

    let UserStateHistory = localStorage.getItem('state');
    console.log(this.props,"props")
    this.input.focus();
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
      if(this.isInArray(this.state.urlList, argsurl) ){
        console.log('present')
        this.setState({
          isLoaded:true,
          data:result
        });
      }else {
        console.log('not present')
        this.setState({
          isLoaded:true,
          data:result,
          urlList:[...this.state.urlList,argsurl]
        });
        const serializedState = JSON.stringify(this.state.urlList);
        localStorage.setItem('state', serializedState);
        this.input.value = "";
        this.input.focus();
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
  let urlPattern = /^(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/i;
  e.preventDefault();
  if (url!=="") {
    if(!url.match(urlPattern)){
      this.setState({
        userError:'Enter a valid url'
      });
      this.input.value = "";
      this.input.focus();
    }else{
      this.setState({
        userError:''
      });
      this.handleHttpCalls(url);
    }
  }else{
    this.setState({
      userError:'Url Cannot be empty'
    });

    this.input.focus();
  }
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

isInArray(array, search)
{
  return array.indexOf(search) >= 0;
}

render() {
  // let RssUrl = this.state;
  let errorInput = this.state.userError;

  return (
    <div className='sidebar__nav'>
      <div className="form__container" >
        <form onSubmit={this.handleSubmit} className="rssform">
          <input type="text"  placeholder="Rss link" className="searchTerm" ref={(input) => this.input = input} />
          <input type="image" width="50" alt="submit" height="50" src={search} className="searchButtonIcon" />
        </form>

        <span className="error"> { errorInput ? errorInput:''} </span>
      </div>

      <LinkslistContainer
        linksData={this.state.urlList}
        handleDelete={this.handleDelete.bind(this)}
        handleFeed={this.handleFeed.bind(this)} />
    </div>
  );
}
}
export default RssForm;
