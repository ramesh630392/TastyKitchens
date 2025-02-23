import "./Slider.css";
import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader/Loader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export const SliderOffers = () => {
   const [images, setImages] = useState([]);
   const [isLoading, setLoading] = useState(true);

   const navigate = useNavigate();

   const getImages = async()=>{
     try{
      const jwt = Cookies.get("jwtToken");
      if (jwt === undefined){
         navigate('/login');
      }
      const response = await fetch('https://apis.ccbp.in/restaurants-list/offers', {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${jwt}`
            }
         });
      if (response.ok){
         setLoading(false);
         const data = await response.json();
         setImages(data.offers);
      }
   }catch(err){
      console.log(err);
   };
  };
   

  useEffect(()=>{
     getImages();
  },[]);


  const Slick = () =>{
   const settings = {
      dots: true,          
      infinite: true,      
      speed: 500,         
      slidesToShow: 1,     
      slidesToScroll: 1,   
      autoplay: true,      
      autoplaySpeed: 3000, 
      arrows: true        
    };
  
    return (
      <div className="carousel-container" style={{ width: "100%"}}>
        <Slider {...settings}>
          {images.map((eachImage, index)=>(<div key = {index} >
            <img src = {eachImage.image_url} style = {{height:"30vh", width:"90%", borderRadius:"6px", marginLeft:"auto", marginTop:"10px", marginRight: "auto"}} alt = "slide" />
          </div>))}
        </Slider>
      </div>
    );
  };

  return (
    <div className="slider-main-container" >{isLoading? <Loader/>: <Slick/>}</div>
  )
};
