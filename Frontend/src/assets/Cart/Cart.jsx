import React, {useContext, useState}from 'react'
import { CartContext } from '../CartContext/Context'
import './Cart.css';
import Navbar from '../Navbar/Navbar';
import { BsCurrencyRupee } from "react-icons/bs";
import { Link } from 'react-router-dom';

export const Cart = () => {
  const [payment, setPayment] = useState(false);
  const { cart, addItem, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  console.log(cart)
  let total = 0 
  for (let i of cart){
    total += (i.count*i.cost)
  };
  console.log(total)

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
         <img src = 'https://res-console.cloudinary.com/dk3wpzwpc/media_explorer_thumbnails/4c04f12f75b3c1e7bdf4003d5744e72e/detailed' className='tick-image' alt = "Done"/>
         <p className='payment-text1'>Payment successful</p>
         <p className='payment-text2'>Thank you for ordering</p>
         <p className='payment-text2'>Your payment is successfully completed</p>
         <Link to='/'>
         <button className='button-to-home' type='button' >Go To Home Page</button>
         </Link>
  </div>)

  const NoOrders = () =>(
    <div className='no-orders-container' >
        <img src ="https://res-console.cloudinary.com/dk3wpzwpc/media_explorer_thumbnails/56c254664f52577be2816f31ce8119e2/detailed" className='no-orders-image' alt ='food'/>
        <p className='no-order-text1'>No Orders Yet</p>
        <p className='no-order-text2'>Your cart is empty. Add something from the menu</p>
        <Link to='/'>
         <button className='button-to-home' type='button' >Order Now</button>
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
