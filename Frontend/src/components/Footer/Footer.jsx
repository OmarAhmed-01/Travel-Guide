import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets.js'

const Footer = () => {
  return (
    <div className='footer-container'>
        <div className="footer-info">
            <div className="about">
                <h1>About this site</h1>
                <div className="links">
                    <a href='/privacy-policy' target='_blank'>Privacy Policy</a>
                    <a href='/cookies' target='_blank'>Cookies</a>
                    <a href='/accessibility-statement' target='_blank'>Accessibility Statement</a>
                    <a href='/terms-use' target='_blank'>Terms of use</a>
                </div>
            </div>
            <div className="website">
                <h1>Our website</h1>
                <div className="links">
                    <a href="" target='_blank'>Corporate <img src={assets.external_link} alt="" /></a>
                    <a href="" target='_blank'>Trade <img src={assets.external_link} alt="" /></a>
                    <a href="" target='_blank'>Business Events <img src={assets.external_link} alt="" /></a>
                    <a href="" target='_blank'>Media <img src={assets.external_link} alt="" /></a>
                    <a href="" target='_blank'>Shop <img src={assets.external_link} alt="" /></a>
                </div>
            </div>
            <div className="socials">
                <h1>Social</h1>
                <div className="links">
                    <a href="" target='_blank'><img src={assets.instagram} alt="" />Instagram</a>
                    <a href="" target='_blank'><img src={assets.facebook} alt="" />Facebook</a>
                    <a href="" target='_blank'><img src={assets.twitter} alt="" />Twitter</a>
                    <a href="" target='_blank'><img src={assets.youtube} alt="" />Youtube</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer