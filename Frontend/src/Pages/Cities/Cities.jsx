import React, { useContext, useEffect, useState } from 'react'
import './cities.css'
import { Context } from '../../context/Context'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Cities = () => {

  const { backend_url, scrollLeft, scrollRight, ref } = useContext(Context);
  const [cities, setCities] = useState([]);
  const { city } = useParams();

  let Filtered_Cities;
  Filtered_Cities = cities.filter(item => item.city.includes(city));
  const country = Filtered_Cities.length > 0 ? Filtered_Cities[0].country : 'Unknown';

  const fetchCities = async() => {
    try {
      const response = await axios.get(backend_url+"/api/city/get-city");
      setCities(response.data.Cities);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <div className='cities-container'>
      <div className="cities-title">
        <p><a href="/">Home</a> / <a href="/destinations">Destinations</a> / <a href={`/destinations/${country}`}>{country}</a> / {city}</p>
      </div>
      {
        Filtered_Cities.map((item) => (
          <>
            <div className="cities-header">
              <img src={backend_url + '/images/' + item.img} alt="" />
              <h1>{item.city}</h1>
            </div>
            <div className="cities-desc">
              <div className="desc-info">
                <h1>{`What is ${item.city}?`}</h1>
                <p>{item.desc}</p>
              </div>
              <img src={backend_url + '/images/' + item.map} alt="" />
            </div>
            <div className="cities-paragraphs">
              {
                item.paragraphs.map((para) => (
                  <>
                    <h1>{`Why we love ${item.city}`}</h1>
                    <p>{para.p1}</p>
                    <p>{para.p2}</p>
                  </>
                ))
              }
            </div>
            <div className="cities-gallery">
              <div className="gallery-scroll-button">
                  <button onClick={scrollLeft}><img src={assets.arrow_left_scroll} alt="" /></button>
                  <button onClick={scrollRight}><img src={assets.arrow_right_scroll} alt="" /></button>
              </div>
              <div className="gallery-images" ref={ref}>
                {
                  item.gallery.map((image) => (
                    <img key={item._id} src={backend_url + "/images/" + image} alt="" />
                  ))
                }
              </div>
            </div>
          </>
        ))
      }
    </div>
  )
}

export default Cities