import React, { useContext, useEffect, useState } from 'react'
import './cities.css'
import { Context } from '../../context/Context'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Cities = () => {

  const { backend_url, scrollLeft, scrollRight, ref, HandleLandmarkClick } = useContext(Context);
  const [cities, setCities] = useState([]);
  const [landmarks, setLandmarks] = useState([]);
  const [filterByLandmark, setFilterByLandmark] = useState("");
  const { city } = useParams();

  let Filtered_Cities;
  Filtered_Cities = cities.filter(item => item.city.includes(city));
  const country = Filtered_Cities.length > 0 ? Filtered_Cities[0].country : 'Unknown';

  const filterLandmarks = (landmarkName) => {
    return landmarks.filter(landmark => 
      landmark.city.toLowerCase() === city.toLowerCase() &&
      landmark.name.toLowerCase().includes(landmarkName.toLowerCase())
    )
  };

  const filteredLandmarks = filterLandmarks(filterByLandmark);
  console.log(filterByLandmark);

  const fetchCities = async() => {
    try {
      const response = await axios.get(backend_url+"/api/city/get-city");
      setCities(response.data.Cities);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLandmarks = async() => {
    try {
      const response  = await axios.get(backend_url + "/api/landmarks/get-landmarks");
      setLandmarks(response.data.Landmarks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLandmarkChange = (event) => {
    setFilterByLandmark(event.target.value);
    console.log(`Filter By Landmark: ${filterByLandmark}`);
  }

  useEffect(() => {
    fetchCities();
    fetchLandmarks();
  }, []);

  return (
    <div className='cities-container'>
      <div className="cities-title">
        <p><a href="/">Home</a> / <a href="/destinations">Destinations</a> / <a href={`/destinations/${country}`}>{country}</a> / {city}</p>
      </div>
      {
        Filtered_Cities.map((item) => (
          <React.Fragment key={item._id}>
            <div className="cities-header" >
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
                item.paragraphs.map((para, index) => (
                  <React.Fragment key={index}>
                    <h1 >{`Why we love ${item.city}`}</h1>
                    <p >{para.p1}</p>
                    <p >{para.p2}</p>
                  </React.Fragment>
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
                  item.gallery.map((image, index) => (
                    <img key={index} src={backend_url + "/images/" + image} alt="" />
                  ))
                }
              </div>
            </div>
            <div className="filtered-landmarks-search">
                <div className="title">
                    <h1>Looking for a specific landmark?</h1>
                    <input type="text" value={filterByLandmark} placeholder='Landmark search...' onChange={handleLandmarkChange}/>
                </div>
            </div>
            <div className="filtered-landmarks-cities">
                {
                    filteredLandmarks.length === 0?
                    (
                        <div className="error">
                            <h1>Landmark Not Found!</h1>
                        </div>
                    ) :
                    (
                      filteredLandmarks.map((landmark) => (
                            <div className="landmark-item" key={landmark._id}>
                                <img src={backend_url + "/images/" + landmark.image[0]} alt="" />
                                <h1 onClick={() => HandleLandmarkClick(landmark.country, landmark.city, landmark.name)}>{landmark.name}</h1>
                            </div>
                        ))
                    )
                }
            </div>
          </React.Fragment>
        ))
      }
    </div>
  )
}

export default Cities