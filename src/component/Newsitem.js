/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { Component } from 'react'

export default class Newsitem extends Component {
  
  render() {
   let {Title, description,imageurl,newsurl,date } = this.props
    return (
      <div className='my-3'>
        <div className="card" style={{width:"18rem"}}>
          <img src={imageurl?imageurl:"https://i.ytimg.com/vi/hoX5nukInyA/hqdefault.jpg"} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{Title}...</h5>
             <p className="card-text">{description}...</p>
             <p className="card-text">Date: {new Date(date).toGMTString()}</p>
            <a href={newsurl} target="_blank" className="btn btn-sm btn-primary btn-dark">Learn More</a>
         </div>
        </div>
      </div>
    )
  }
}
