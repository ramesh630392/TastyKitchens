import React, {useContext, useEffect, useState}from 'react'
import { CartContext } from '../CartContext/Context'
import './Cart.css';
import Navbar from '../Navbar/Navbar';
import { BsCurrencyRupee } from "react-icons/bs";
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const Cart = () => {
  const [payment, setPayment] = useState(false);
  const { cart, addItem, increaseQuantity, decreaseQuantity, zeroCart } = useContext(CartContext);
  console.log(cart)
  let total = 0 
  for (let i of cart){
    total += (i.count*i.cost)
  };
  
  useGSAP(()=>{
    gsap.to('#tick-image', {duration:0.4,delay: 0.2,scale: 1,repeat:-1,yoyo:true,y:-5});
    gsap.to('.payment-text1', {opacity:1, delay: 0.5, duration: 0.5});
    gsap.to('.payment-text2', {opacity:1, delay: 0.6, duration: 0.5, stagger: 1});
    gsap.to("#order-placed-button_home", {opacity:1, delay: 2.5, duration: 1.5});
    gsap.to(".no-orders-image", {opacity:1, delay: 0.5, duration: 0.6});
    gsap.to(".no-order-text1", {opacity:1, delay: 0.6, duration: 0.7});
    gsap.to(".no-order-text2", {opacity:1, delay: 0.7, duration: 0.8});
    gsap.to('#order-now', {opacity:1, delay:0.8, duration:0.9});
  },[])

  useEffect(()=>{
  },[]);

  const MainCart = () =>(
    <div className='cart-container' >
        <div className='cart-headings' >
            <p className='cart-heading-text'>Item</p>
            <p className='cart-heading-text'>Quantity</p>
            <p className='cart-heading-text'>Price</p>
        </div>
        {
            cart.map((item, index) =>(<div className='cart-item-container' key={index} >
                <div className='cart-image-container' >
                    <img src={item.image_url} className='cart-item-image'  alt='cart-item-image' />
                    <p className='cart-item-name'>{item.name}</p>
                </div>
                <div className="controllers-cart">
                        <button className='button-plus' onClick={()=>{decreaseQuantity(item.id)}} type='button' >-</button>
                        <p className='item-count-text'>{item.count}</p>
                        <button className='button-plus' onClick={()=>{increaseQuantity(item.id)}}  type='button' >+</button>
                </div>
                <p className='cart-cost-text'><BsCurrencyRupee className='rupee-cart' />{item.count * item.cost}</p>
            </div>))
        }
        <hr style={{width:"87%", marginLeft: '150px', marginTop:"30px"}} />
        <div className='tally-container' >
          <p className='total-text' >Total:</p>
          <p className='total-text2'><BsCurrencyRupee/>{total}</p>
        </div>
        <button className='button-payment' onClick ={()=>{setPayment(true)}} type='button' >Place Order</button>
    </div>
  )

  const OrderPlaced = () =>(<div className='order-placed-container' >
         <div>
         <svg width="80" height="80" viewBox="0 0 80 80" id ="tick-image"  fill="none" xmlns="http://www.w3.org/2000/svg">
         <path fill-rule="evenodd" clip-rule="evenodd" d="M39.9998 72.001C57.673 72.001 71.9998 57.6742 71.9998 40.001C71.9998 22.3279 57.673 8.00098 39.9998 8.00098C22.3266 8.00098 7.99976 22.3279 7.99976 40.001C7.99976 57.6742 22.3266 72.001 39.9998 72.001ZM54.8282 34.8294C56.3902 33.2673 56.3902 30.7347 54.8282 29.1725C53.2662 27.6105 50.7334 27.6105 49.1714 29.1725L35.9998 42.3442L30.8282 37.1725C29.2661 35.6105 26.7334 35.6105 25.1713 37.1725C23.6092 38.7347 23.6092 41.2674 25.1713 42.8294L33.1713 50.8294C34.7334 52.3914 37.2661 52.3914 38.8282 50.8294L54.8282 34.8294Z" fill="#22C55E"/>
         </svg>
         </div>
         <p className='payment-text1'>Payment successful</p>
         <p className='payment-text2'>Thank you for ordering</p>
         <p className='payment-text2'>Your payment is successfully completed</p>
         <Link to='/' style ={{textDecoration:"none", color: "inherit"}}>
         <button className='button-to-home' onClick={zeroCart()} id = 'order-placed-button_home' type='button' >Go To Home Page</button>
         </Link>
  </div>)

  const NoOrders = () =>(
    <div className='no-orders-container' >
        <img src ="https://res.cloudinary.com/dk3wpzwpc/image/upload/v1713241758/cooking_1_yrhdaf.jpg" className='no-orders-image' alt ='food'/>
        <p className='no-order-text1'>No Orders Yet</p>
        <p className='no-order-text2'>Your cart is empty. Add something from the menu</p>
        <Link to='/' style ={{textDecoration:"none", color: "inherit"}} >
         <button className='button-to-home-no_orders' type='button' id = 'order-now' >Order Now</button>
        </Link>
    </div>
  )

  return (
    <div>
        <Navbar/>
        {cart.length === 0 ? <NoOrders/> : (payment? <OrderPlaced/>:<MainCart/>)}
    </div>
  )
}
