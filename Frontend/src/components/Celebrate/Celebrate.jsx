import React from 'react'
import './celebrate.css';
import { assets } from '../../assets/assets.js';

const Celebrate = () => {
  return (
    <div className='celebrate-container'>
        <img src={assets.festival_background} alt="" />
        <div className='celebrate-details'>
            <h1>Celebrate in Europe</h1>
            <p>Find out what’s happening across the nations with our round-up of annual events.</p>
            <a href='/annual-events'>Discover great events in 2024 <img src={assets.arrow_right} alt="" /></a>
        </div>
    </div>
  )
}

export default Celebrate