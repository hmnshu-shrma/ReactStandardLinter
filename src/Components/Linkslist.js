import React, { Component } from 'react'
import '../styles/maincontainer.css';

class LinkslistContainer extends Component {
  render(){
    let jsonRssData;
    if(this.props.linksData){
      jsonRssData = this.props.linksData;
    }
    return(
      <div>
        <div className="urlLinks__container">
          {jsonRssData ? jsonRssData.map((urlitems,index)=>
            <div className="urlLinks__container--card"  key={index.toString()} >
              <p className='title truncate'
                onClick={this.props.handleFeed.bind(null, urlitems)}
                title={urlitems}>
                {urlitems}
              </p>
              <button className="title_btn" onClick={this.props.handleDelete.bind(null, urlitems)}>
                &times;
              </button>
            </div>
          ) : " Please enter Rss Feed Url"}
        </div>
      </div>
    );
  }
}

export default LinkslistContainer;
