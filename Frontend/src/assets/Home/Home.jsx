import React from 'react'
import Navbar from '../Navbar/Navbar'
import { SliderOffers } from '../Offers/Slider'
import { Restaurants } from '../Restaurants/Restaurants'
import { Footer } from '../Footer/Footer'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <SliderOffers/>
        <Restaurants/>
        <Footer/>
    </div>
  )
}

export default Home
