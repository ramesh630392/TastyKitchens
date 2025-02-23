import React from 'react';
import './Footer.css';
import { FaPinterestSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className='footer-container' >
        <div className='footer-image-container' >
            <img src = 'https://res-console.cloudinary.com/dk3wpzwpc/media_explorer_thumbnails/18ec4af78ce8cd9395a2ece09acc9940/detailed' className='app-icon-footer'  alt ='app-imag-icon' />
            <p className='app-name-footer'>Tasty Kitchens</p>    
        </div>
        <p className='app-name-footer2'>The only thing we are serious about is food</p>
        <p className='app-name-footer2'>Contact us on</p>
        <div className='icons-container-footer' >
             <FaPinterestSquare className='icon-white-footer' />
             <FaInstagram className='icon-white-footer'/>
             <FaTwitter className='icon-white-footer'/>
             <FaFacebookSquare className='icon-white-footer'/>
        </div>
    </div>
  )
}
