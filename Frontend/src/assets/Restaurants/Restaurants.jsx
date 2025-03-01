import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import "./Restaurants.css";
import { GoStarFill } from "react-icons/go";
import { Link } from 'react-router-dom';
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { BsFilterLeft } from "react-icons/bs";
import { Footer } from '../Footer/Footer';
import gsap from 'gsap';

export const Restaurants = () => {

  const [offSet, setOffSet] = useState(1);
  const [restaurants, setRestaurants] = useState([]);
  const [filter, setFilter] = useState("Highest");
  const [activePage, setActivePage] = useState(1);
  const [count, setCount] = useState(9);


  const getRestaurants = async() =>{
    const jwt = Cookies.get("jwtToken");
    try{
        const response = await fetch(`https://apis.ccbp.in/restaurants-list?offset=${offSet}&limit=${9}&sort_by_rating=${filter}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${jwt}`
            }
         })
         if (response.ok){
            const data = await response.json();
            setRestaurants(data.restaurants);
            
         }else{
            print("failed");
         }
    }catch(err){
        console.log(err);
    }
  }

  const increaseButton = () =>{
    if (activePage < 6){
        setActivePage(activePage+1);
        setOffSet((activePage-1)*9)
        getRestaurants();
    };
  };

  const decreaseButton = () =>{
    if (activePage > 1){
        setActivePage(activePage-1);
        setOffSet((activePage-1)*9)
        getRestaurants();
    };
  };
  


  useEffect(()=>{
   getRestaurants();
   gsap.to('#restaurant-text', {opacity:1, delay:1});
   gsap.to('#container2', {opacity:1, delay:1.5});
   gsap.to('#horizontal_line', {opacity:1, delay:2});
   gsap.to('.pagination-buttons-container', {opacity: 1, delay:4})
  },[]);

  const onChangeFilter = (e) =>{
    setFilter(e.target.value);
    getRestaurants();
  }

  const EachItem = (eachItem) =>{
    const {id, name, cuisine,user_rating, image_url} = eachItem.eachItem;

    return (
        <Link to={`restaurant/${id}`} style ={{textDecoration:"none", color: "inherit"}} >
        <div className='item' >
                <img src ={image_url} className='restaurant-image' alt ="Restaurant-image" />
                <div className='restaurant-details-container1' >
                    <p className='restaurant-name' >{name}</p>
                    <p className='restaurant-cuisine' >{cuisine}</p>
                    <p className='rate-text'><GoStarFill className='golden-star' />{user_rating.rating} <span>({user_rating.total_reviews} ratings)</span></p>

                </div>
        </div>
        </Link>
    );
  };

  return (
    <div className='restaurants-main-container' >
        <h1 className='restaurant-text-heading' id ='restaurant-text' >Popular Restaurants</h1>
        <div className='filter-container1' id = 'container2' >
            <p className='restaurant-text-para'>Select Your favourite restaurant special dish and make your day happy..</p>
            <div className='filter-main-container' >
              <BsFilterLeft className='filter-icon' />
              <label className='select-label' htmlFor='select-filter' >Sort by</label>
              <select className='select-filter' onChange={onChangeFilter} id = 'select-filter' >
                <option key="2" value = "Highest" >Highest</option>
                <option key = "1"  value = "Lowest" >Lowest</option>
              </select>
            </div>
        </div>
        <hr id = 'horizontal_line' style={{width:"100%", marginTop: "0px", marginBottom: "30px" , opacity:'0'}} />
        <div className='grid-container' >
            {restaurants.map((eachItem, index)=>(<EachItem eachItem = {eachItem} key = {index} />))}
        </div>
        <div className='pagination-buttons-container' >
           <button type='button' className={activePage===1?'':"pagination-button-last"} onClick={decreaseButton} >
              <FaAngleDoubleLeft/>
           </button>
           <p className='pagination-text'>  {activePage} of {20}  </p>
           <button type='button' className={activePage===1?'pagination-button-last':"pagination-button-last"}  onClick={increaseButton}>
            <FaAngleDoubleRight/>
           </button>
        </div>
    </div>
  )
}
