import React from 'react'
import './planTrip.css'
import { assets } from '../../assets/assets'

const Plantrip = () => {
  return (
    <div className='trip-container'>
      <div className="trip-links">
        <p><a href="/">Home</a> / Plan your trip</p>
      </div>
      <div className="trip-header">
        <img src={assets.planTrip_header} alt="" />
        <h1>Plan your trip</h1>
      </div>
      <div className="trip-requirements">
        <div className="trip-header-title">
          <h1>Find out about about passport requirements, what to expect at customs and immigration, as well as tips on travelling to Europe, getting around and some handy ways to save money while you’re here.</h1>
        </div>
        <div className="trip-requirements-items">
          <div className="req-items">
            <img src={assets.visas} alt="" />
            <a href="">Visa and immigration information</a>
            <p>What you need to know about coming to Europe</p>
          </div>
          <div className="req-items">
            <img src={assets.covid} alt="" />
            <a href="">Latest COVID-19 information</a>
            <p>What you need to know before you travel</p>
          </div>
          <div className="req-items">
            <img src={assets.accomm} alt="" />
            <a href="">Accommodation options</a>
            <p>Discover more about where to stay in Europe</p>
          </div>
        </div>
      </div>
      <div className="useful-info">
        <div className="useful-info-title">
          <h1>Useful/Essential Information</h1>
        </div>
        <div className="useful-info-container">
          <div className="useful-info-left">
            <h1>Useful/Essential Information</h1>
            <button>The essentials</button>
          </div>
          <div className="useful-info-right">
            <p>From bringing goods into the country to what to do in an emergency, we’ve got you covered. Find helpful information on what you’ll need to know when travelling to Europe.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Plantrip