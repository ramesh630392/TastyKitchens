import React, {useState} from 'react';
import "./Navbar.css";
import {Link} from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { FiX } from "react-icons/fi";
import { AppLogo } from '../Svg/AppLogo';
import Cookies from 'js-cookie'

const Navbar = () => {
  const [hamButton, setHamButton] = useState(true);

  const removeJwt = () =>{
    Cookies.remove('jwtToken');
  };

  return (
    <>
    <div className='nav-container' >
        <div className='app-logo-container' >
             <AppLogo className ="app-logo" />
             <p className='app-title-text' >Tasty Kitchens</p>
        </div>
        <div className='nav-links-container' >
            <Link to='/'>
            <p className='link-home' >Home</p>
            </Link>
            
            <Link to='/cart' >
            <p className='link-cart' >Cart</p>
            </Link>

            <Link to='/login' style={{marginTop:"auto", marginBottom: "auto"}} >
            <button type='button' className='button-logout' onClick={removeJwt} >
                Logout
            </button>
            </Link>
        </div>
        <div className='ham-button-container' >
            {hamButton? <GiHamburgerMenu className='ham-button' onClick={()=>{setHamButton(false)}} /> : <FiX className='fix-button' onClick={()=>{setHamButton(true)}}/>}
        </div>
    </div>
    {hamButton? <></>:<div className='nav-drop-container' >
        <p className='link-home' >Home</p>
            <p className='link-cart' >Cart</p>
            <button type='button' className='button-logout' onClick={removeJwt} >
                Logout
            </button>
        </div>}
            

     <div/>
    </>
  )
};

export default Navbar;