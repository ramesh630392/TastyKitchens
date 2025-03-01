import React from 'react'
import Navbar from '../Navbar/Navbar';
import "./NotFound.css"
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <footer>
    <div className='not-found-container' >
        <img src ="https://res-console.cloudinary.com/dk3wpzwpc/media_explorer_thumbnails/a7381ecd45275b8531fe64d31a80217f/detailed"  className='not-found-image' alt = 'not-found' />
        <p className='no-order-text1' >Page Not Found</p>
        <p className='no-order-text2' >We are sorry, the page you requested is not found</p>
        <p className='no-order-text2' >Please go back to home page</p>
        <Link to='/' style ={{textDecoration:"none", color: "inherit"}}>
         <button className='button-to-home' type='button' >Go To Home</button>
         </Link>
    </div>
    </footer>
  )
};