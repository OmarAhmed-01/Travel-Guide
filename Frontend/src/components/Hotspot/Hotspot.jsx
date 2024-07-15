import React, { useContext, useEffect, useState } from 'react'
import './hotspot.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { Context } from '../../context/Context'

const Hotspot = () => {

    const { backend_url } = useContext(Context);
    const [hotspot, setHotspot] = useState([]);
    
    const getHotspot = async() => {
        try {
            let response = await axios.get(backend_url + '/api/hotspot/get-hotspot');
            setHotspot(response.data.hotspots);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getHotspot();
    }, []);

  return (
    <div className='hotspot-container'>
        <div className="hotspot-details">
            <h1>Cultural Hotspots</h1>
            <div className="hotspot-items">
                {
                    hotspot.map((item, index) => (
                        <div className='items' key={item._id}>
                            <img src={backend_url + "/images/"+item.img} alt="" />
                            <h1>{item.name}</h1>
                            <p>{item.desc}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Hotspot

{/* <img src={assets.UK} alt="" />
                <h1>The United Kingdom</h1>
                <p>Ancient history, modern vibrancy, iconic landmarks, charming villages, and captivating cities await you!</p> */}