import './EachRestaurant.css';
import React, {useEffect, useState, useContext} from 'react'
import { useParams, useNavigate, useActionData } from 'react-router-dom';
import Cookies from 'js-cookie'
import Navbar from '../Navbar/Navbar';
import { Loader } from '../Loader/Loader';
import { GoStarFill } from "react-icons/go";
import { BsCurrencyRupee } from "react-icons/bs";
import { CartContext } from '../CartContext/Context';
import { Footer } from '../Footer/Footer';


const EachRestaurant = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [restaurantData, setData] = useState({});
  const [button, setButton] = useState(true);
  

  
  const id = useParams();
  const navigate = useNavigate();
  const { cart, addItem, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  

  const onAdd = (item) =>{
    addItem({...item, count:item.count+1});
    setItems(items.map(eachItem=>eachItem.id === item.id?{...eachItem, count:eachItem.count+1}: eachItem));
  }

  const onIncreaseQuantity = id =>{
    increaseQuantity(id);
    setItems(items.map(eachItem=>eachItem.id === id?{...eachItem, count:eachItem.count+1}: eachItem));
  };

  const onDecreaseQuantity = id=>{
    decreaseQuantity(id);
    setItems(items.map(eachItem=>eachItem.id === id && eachItem.count >0 ?{...eachItem, count:eachItem.count-1}: eachItem));
 };

  console.log(cart)

  const getCount = id =>{
    const item =  cart.filter(eachItem =>eachItem.id ===id)
    if (item.length ===0){
        return 0;
    }else{
        return item[0].count;
    };
  };


  const getRestaurantItems = async() =>{
    const jwt = Cookies.get("jwtToken");
    if (jwt === undefined){
        navigate("/login");
    };
    const url = `https://apis.ccbp.in/restaurants-list/${id.id}`;
    try{
        const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": 'application/json',
              "Authorization": `Bearer ${jwt}`
            }
         });
         if (response.ok){
            const data = await response.json();
            console.log(data);
            setData(data);
            setItems(data.food_items.map(item=>({...item, count:getCount(item.id)})));
            //setItems(items.map(item=>({...item, count: getCount(item.id)})))
            console.log(items);
            setLoading(false);
         }
    }catch(err){
        console.log(err.message);
    };
  };

  useEffect(()=>{
    getRestaurantItems();
    
  },[]);

  return (
    <>
    <Navbar/>
    {isLoading? <div className='each-item-loader' > <Loader/> </div> : <div className='each-restaurant-main-container' >
        <div className='restaurant-image-and-details' id ='details'>
            <div className='restaurant-details' >
                <img src ={restaurantData.image_url} className='restaurant-details-image' alt = "restaurant-food" />
                <div className='restaurant-details-container' >
                    <p className='restaurant-name-text' >{restaurantData.name}</p>
                    <p className='restaurant-cuisine-text'>{restaurantData.cuisine}</p>
                    <p className='restaurant-open-text'>{restaurantData.location}</p>
                    <div className='rating-container' >
                        <div>
                        <p className='details-rating' ><GoStarFill className='star-icon-white' /> {restaurantData.rating}</p>
                        <p className='details-reviews' >{restaurantData.reviews_count}+Ratings</p>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", marginTop:"5px"}} >
                            <p className='separator' >|</p>
                            <p className='separator'>|</p>
                        </div>
                        <div>
                            <p className='details-rating'><BsCurrencyRupee className='star-icon-white' />{restaurantData.cost_for_two}</p>
                            <p className='details-reviews' >Cost of two</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='food-items-container'  id ="items" >
            <div className='grid-container2' >
                {items.map((eachItem, index)=>(<div key={index} className='each-item' >
                    <img src ={eachItem.image_url} className='food-item-image' alt ="item-image" />
                    <div className='restaurant-details-container-food-items'>
                        <p className='restaurant-name'>{eachItem.name}</p>
                        <p className='restaurant-cuisine' ><BsCurrencyRupee className='icon-rupee-item'/>{eachItem.cost}.00</p>
                        <p className='rate-text'><GoStarFill className='golden-star' /> {eachItem.rating}</p>
                        {eachItem.count<1?<button className='button-add' type='add' onClick={()=>{onAdd(eachItem)}} >ADD</button>:<div className="control-buttons">
                            <button className='button-plus' onClick={()=>{onDecreaseQuantity(eachItem.id)}} type='button' >-</button>
                            <p className='item-count-text'>{eachItem.count}</p>
                            <button className='button-plus' onClick={()=>{onIncreaseQuantity(eachItem.id)}}  type='button' >+</button>
                            </div>}
                    </div>
                </div>))}
            </div>
        </div>
        </div>}
        <Footer/>
    </>

  );
};

export default EachRestaurant