import React, { useContext, useEffect, useState } from 'react'
import './nation.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Context } from '../../context/Context';
import { assets } from '../../assets/assets';

const Nation = () => {

    const { nation } = useParams();
    const { backend_url, scrollLeft, scrollRight, ref, HandleCityClick, HandleLandmarkClick } = useContext(Context);
    const [nations, setNations] = useState([]);
    const [cities, setCities] = useState([]);
    const [landmarks, setLandmarks] = useState([]);
    const [filterCity, setFilterCity] = useState("");
    const [filterLandmark, setFilterLandmark] = useState("");

    const normalizedNation = nation.replace(/-/g, " ");
    let Filtered_Nations = nations.filter(item => item.name.includes(normalizedNation));


    const handleCityChange = (event) => {
        setFilterCity(event.target.value);
    };
    const handleLandmarkChange = (event) => {
        setFilterLandmark(event.target.value);
    }

    const fetchNations = async() => {
        try {
            const response = await axios.get(backend_url + "/api/nations/get-nations");
            setNations(response.data.Nations);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCities = async() => {
        try {
            const response = await axios.get(backend_url + "/api/city/get-city");
            setCities(response.data.Cities);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchLandmarks = async() => {
        try {
            const response = await axios.get(backend_url + '/api/landmarks/get-landmarks');
            setLandmarks(response.data.Landmarks);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchNations();
        fetchCities();
        fetchLandmarks();
    }, []);

    const filterCities = (cityName) => {
        return cities.filter(city => 
            city.country.toLowerCase() === normalizedNation.toLowerCase() &&
            city.city.toLowerCase().includes(cityName.toLowerCase())
        );
    };

    const filterLandmarks = (landmarkName) => {
        return landmarks.filter(landmark =>
            landmark.country.toLowerCase() === normalizedNation.toLowerCase() &&
            landmark.name.toLowerCase().includes(landmarkName.toLowerCase())
        );
    };

    const filteredCities = filterCities(filterCity);
    const filteredLandmarks = filterLandmarks(filterLandmark);

  return (
    <div className='nations-container'>
        <div className="nations-title">
            <p><a href='/'>Home</a> / <a href='/destinations'>Destinations</a> / {nation.replace(/-/g, " ")}</p>
        </div>
        {
            Filtered_Nations.map((item) => (
                <React.Fragment key={item._id}>
                    <div className="nations-header" >
                        <img src={backend_url + "/images/" + item.gallery[0]} alt="" />
                        <h1>{item.name}</h1>
                    </div>
                    <div className="nations-details" >
                        <div className="capital">
                            <h2>Capital City</h2>
                            <p>{item.capital}</p>
                        </div>
                        <div className="currency">
                            <h2>Currency</h2>
                            <p>{item.currency}</p>
                        </div>
                        <div className="timezone">
                            <h2>Timezone</h2>
                            <p>{item.timezone}</p>
                        </div>
                    </div>
                    <div className="nations-information" >
                        <h1>{`What is ${item.name}?`}</h1>
                        <p>{item.desc}</p>
                    </div>
                    <div className="nations-paragraphs">
                        {
                            item.paragraphs.map((para, index) => (
                                <React.Fragment key={index}>
                                    <h1 >{`What's so significant about ${item.name}?`}</h1>
                                    <p >{para.p1}</p>
                                    <p >{para.p2}</p>
                                </React.Fragment>
                            ))
                        }
                    </div>
                    <div className="nations-gallery">
                        <div className="gallery-scroll-button">
                            <button onClick={scrollLeft}><img src={assets.arrow_left_scroll} alt="" /></button>
                            <button onClick={scrollRight}><img src={assets.arrow_right_scroll} alt="" /></button>
                        </div>
                        <div className="gallery-images" ref={ref}>
                            {item.gallery.map((image, index) => (
                                <img key={index} src={`${backend_url}/images/${image}`} alt="" />
                            ))}
                        </div>
                    </div>
                    <div className="filtered-cities-search">
                        <div className="title">
                            <h1>Looking for specific city?</h1>
                            <input type="text" value={filterCity} placeholder="City search..." onChange={handleCityChange}/>
                        </div>
                    </div>
                    <div className="filtered-cities">
                        {
                            filteredCities.length === 0 ? 
                                (
                                    <div className='error'>
                                        <h1>City Not Found!</h1>
                                    </div>
                                ) :
                                (
                                    filteredCities.map((city) => (
                                        <div className="city-item" key={city._id}>
                                            <img src={backend_url + "/images/" + item.img} alt="" />
                                            <h2 onClick={() => HandleCityClick(city.country, city.city)}>{city.city}</h2>
                                        </div>
                                    ))
                                )
                        }
                    </div>
                    <div className="filtered-landmarks-search">
                        <div className="title">
                            <h1>Looking for a specific landmark?</h1>
                            <input type="text" value={filterLandmark} placeholder='Landmark search...' onChange={handleLandmarkChange}/>
                        </div>
                    </div>
                    <div className="filtered-landmarks">
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
                                        <h2 onClick={() => HandleCityClick(landmark.country, landmark.city)}>{landmark.city}</h2>
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

export default Nation