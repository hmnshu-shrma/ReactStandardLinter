import React, { Component } from 'react'
class Maincontainer extends Component {
  render(){
    let jsonRssData;
    if(this.props.rssJson){
      jsonRssData = this.props.rssJson;
      console.log("this is mainpage",jsonRssData.items.length)
    }
    return(
      <div className='main__container'>
      <h1 className="container__heading truncate--lg" title={ jsonRssData ? jsonRssData.feed.url: "Hello. I'm Arthur!"}>
      { jsonRssData ? jsonRssData.feed.url: "Hello. I'm Arthur!"}
      </h1>
      <div className="rss__container">
      {jsonRssData ? jsonRssData.items.map((item,index)=>
        <div className="container__cards" key={index.toString()}>
          <p className="container__cards--title">
          {item.title}
          </p>
          <p dangerouslySetInnerHTML={{__html : item.description}}></p>
        </div>)
        : <p className="default__text">
        I make rss provide you readable Rss Feed of blogs.
        </p>
      }
      </div>
      </div>
    );
  }
}

export default Maincontainer;
