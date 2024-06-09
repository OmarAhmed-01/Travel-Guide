import React, { useContext, useState } from 'react'
import './navbarOne.css';
import { Context } from '../../context/Context';
import { assets } from '../../assets/assets';

const NavbarOne = () => {

  const { HomePage } = useContext(Context);
//   const [destMenu, setDestMenu] = useState(false);
//   const [thingsMenu, setThingsMenu] = useState(false);
//   const [planMenu, setPlanMenu] = useState(false);

  return (
    <div className='container'>
        <div className="title">
            <h1 onClick={HomePage}>EXPLORE EUROPE</h1>
            <h2>Travel Guide</h2>
        </div>
        <div className="details">
            <div className="details-header">
                <a href="/destinations">
                    <h1>Destinations</h1>
                    {/* <img src={destMenu ? assets.arrow_up : assets.arrow_down} alt="" /> */}
                </a>
            </div>
            <div className="details-header">
                <a href="/landmarks">
                    <h1>Landmarks</h1>
                    {/* <img src={planMenu ? assets.arrow_up : assets.arrow_down} alt="" /> */}
                </a>
            </div>
            <div className="details-header">
                <a href="/things-to-do">
                    <h1>Things to do</h1>
                    {/* <img src={thingsMenu ? assets.arrow_up : assets.arrow_down} alt="" /> */}
                </a>
            </div>
            <div className="details-header">
                <a onMouseEnter={() => setPlanMenu(true)} onMouseLeave={() => setPlanMenu(false)} href="/plan-your-trip">
                    <h1>Plan your trip</h1>
                    {/* <img src={planMenu ? assets.arrow_up : assets.arrow_down} alt="" /> */}
                </a>
            </div>
        </div>
    </div>
  )
}

export default NavbarOne