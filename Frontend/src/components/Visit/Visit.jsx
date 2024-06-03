import React from 'react'
import './visit.css'
import { assets } from '../../assets/assets'

const Visit = () => {
  return (
    <div className='visit-container'>
        <div className='visit-title'>
            <h1>VisitEurope - Tourism website for Europe</h1>
        </div>
        <div className="info">
            <div className="info-details">
                <div className="info-img">
                    <img src={assets.activity} alt="" />
                </div>
                <p>Providing you with inspirational activities and experiences, from those in the know.</p>
            </div>
            <div className="info-details">
                <div className="info-img">
                    <img src={assets.map} alt="" />
                </div>
                <p>Your guidance and information about travelling to Europe.</p>
            </div>
            <div className="info-details">
                <div className="info-img">
                    <img src={assets.guide} alt="" />
                </div>
                <p>Helping the travel industry showcase the best of Europe.</p>
            </div>
        </div>
    </div>
  )
}

export default Visit