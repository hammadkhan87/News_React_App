import React, { Component } from "react";
import PropTypes from 'prop-types'
import Newsitem from "./Newsitem";
import Spiner from "./Spiner";
import InfiniteScroll from "react-infinite-scroll-component";



export default class News extends Component {
  static defaultProps = {
    country:"in",
    category:"general"
  }
  static propTypes={
    country:PropTypes.string,
    category:PropTypes.string,
  }
  
  

  constructor(){
   
    super();
    this.state ={
     articles:[],
     loading:false,
     page:1
     
    }
  }

  
   async componentDidMount(){
    
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=42c8c65146934e829d598d65399e763b&pageSize=20`
  this.setState({loading :true})  
  let data = await fetch(url)
   let parsedata= await data.json()
   this.setState({loading :false}) 
   
   this.setState({articles:parsedata.articles,totalresult:parsedata.totalResults})
}
handlnextClick= async ()=>{
  if(this.state.page+1 > Math.ceil(this.state.totalresult/20)){}else{
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=42c8c65146934e829d598d65399e763b&page=${this.state.page+1}&pageSize=20`
  this.setState({loading :true}) 
  let data= await fetch(url)
   let parsedata= await data.json()
   this.setState({loading :false}) 
  
this.setState({
  page:this.state.page+1,
  articles:parsedata.articles
}
  
)
}
}
handlpreviousClick= async ()=>{
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=42c8c65146934e829d598d65399e763b&page=${this.state.page-1}&pageSize=20`
  this.setState({loading :true}) 
  let data= await fetch(url)
  let parsedata= await data.json()
  this.setState({loading :false}) 
 
this.setState({
 page:this.state.page-1,
 articles:parsedata.articles
}
 
)
 
}
fetchMoreData = async ()=>{
  this.setState({page:this.state.page+1})
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=42c8c65146934e829d598d65399e763b&pageSize=20`
  this.setState({loading :true})  
  let data= await fetch(url)
   let parsedata= await data.json()
   this.setState({loading :false}) 
   
   this.setState({articles:this.state.articles.concat(parsedata.articles),totalresult:parsedata.totalResults
      
  })

}
  render() {
  
    return (
    
      <div>
        
        <div className="container my-3">
          <h2 className="text-center">News Monkey Top-News</h2>
          
         {/* { this.state.loading && <Spiner></Spiner>} */}
         <InfiniteScroll
          dataLength={this.state.articles?.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles?.length !==this.totalResults}
          loader={<Spiner/>}

        >
          <div className="container">

         
           <div className="row">
        {this.state.articles.map((element)=>{return <div className="col-md-4" key={element.url}>
            <Newsitem Title={element.title?
              element.title.slice(0,45):""}  description={element.description? element.description.slice(0,88):""} imageurl={element.urlToImage} newsurl={element.url} date={element.publishedAt}></Newsitem>
          </div>})}
          </div>
          
          </div>
        </InfiniteScroll>
       
          
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1}  type="button" className="btn btn-dark"onClick={this.handlpreviousClick}>&larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalresult / 20)} type="button" className="btn btn-dark" onClick={this.handlnextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}
