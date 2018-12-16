import React, { Component } from 'react'
import '../styles/maincontainer.css';
class Maincontainer extends Component {
  render(){
    let jsonRssData;
    if(this.props.rssJson){
      jsonRssData = this.props.rssJson;
      console.log("this is mainpage",jsonRssData.items.length)
    }
    return(
      <div className='main__container'>
      <h1 className="container__heading"> { jsonRssData ? jsonRssData.feed.url: "Hello there "}</h1>
      {jsonRssData ? jsonRssData.items.map((item)=>
        <div className="container__cards">
        <p className="container__cards--title">
        {item.title}
        </p>
        <p dangerouslySetInnerHTML={{__html : item.description}}></p>
        </div>)
        :
        " Nothing Found"}
        </div>
      );
    }
  }

  export default Maincontainer;
