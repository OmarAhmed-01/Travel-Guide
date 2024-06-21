import React, { useContext, useEffect, useState } from "react";
import "./landmarks.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { Context } from "../../context/Context";

const Landmarks = () => {

    const { backend_url, HandleLandmarkClick, HandleNationClick, HandleCityClick } = useContext(Context);
    const [landmarks, setLandmarks] = useState([]);
    const [filterByName, setFilterByName] = useState("");
    const [filterByCity, setFilterByCity] = useState("");
    const [filterByCountry, setFilterByCountry] = useState("");

    const filteredLandmarks = landmarks.filter(landmark => 
        (filterByName === "" || landmark.name.toLowerCase().includes(filterByName.toLowerCase())) &&
        (filterByCity === "" || landmark.city.toLowerCase().includes(filterByCity.toLowerCase())) &&
        (filterByCountry === "" || landmark.country.toLowerCase().includes(filterByCountry.toLowerCase()))
    );

    const handleNameChange = (event) => {
        setFilterByName(event.target.value);
    };
    const handleCityChange = (event) => {
        setFilterByCity(event.target.value);
    };
    const handleCountryChange = (event) => {
        setFilterByCountry(event.target.value);
    };

    console.log(filteredLandmarks);

    const fetchLandmarks = async() => {
        try {
            const response = await axios.get(backend_url + "/api/landmarks/get-landmarks");
            setLandmarks(response.data.Landmarks);
            
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchLandmarks();
    }, []);

  return (
    <div className="landmarks-container">
        <div className="landmarks-header">
            <p>
                <a href="">Home</a> / Landmarks
            </p>
        </div>
        <div className="image-header">
            <img src={assets.landmarks_header} alt="" />
            <h1>Heritage rests upon you</h1>
            <p>Eiffel Tower, Paris, France</p>
        </div>
        <div className="landmarks-intro">
            <div className="left">
                <h1>Explore Europe</h1>
                <p>
                    Europe is a treasure trove of adventure and history! Picture
                    yourself snapping selfies by the Eiffel Tower in Paris or exploring
                    the ancient Colosseum in Rome. Each city, from fairy-tale Scottish
                    castles to Venice's charming canals, offers unique and unforgettable
                    experiences.
                </p>
                <p>
                    Beyond the landmarks, Europe is perfect for thrill-seekers and food
                    lovers alike. Ski the Swiss Alps, relax on Mediterranean beaches, or
                    dance in Berlin’s vibrant clubs. Savor delicious Italian pasta in
                    Tuscany or explore Istanbul's bustling markets. With easy travel
                    between destinations, Europe promises endless fun, flavor, and
                    memories!
                </p>
            </div>
            <div className="right">
                <img src={assets.intro_img} alt="" />
            </div>
        </div>
        <div className="landmarks-item-container">
            <div className="title">
                <h1>Europe's Finest</h1>
                <input type="text" value={filterByName} placeholder="Name search..." onChange={handleNameChange}/>
                <input type="text" value={filterByCity} placeholder="City search..." onChange={handleCityChange}/>
                <input type="text" value={filterByCountry} placeholder="Country search..." onChange={handleCountryChange}/>
            </div>
            <div className="landmarks">
                {
                    filteredLandmarks.length === 0 ? 
                        (
                            <div className="error">
                                <h1>Landmark Not Found!</h1>
                            </div>
                        ) : 
                        (
                            filteredLandmarks.map((item) => (
                                <div className="landmarks-item" key={item._id}>
                                    <img src={backend_url + "/images/" + item.image[0]} alt="" />
                                    <h1 onClick={() => HandleLandmarkClick(item.country, item.city, item.name)}>{item.name}</h1>
                                    <h2 onClick={() => HandleCityClick(item.country, item.city)}>{item.city}</h2>
                                    <h3 onClick={() => HandleNationClick(item.country)}>{item.country}</h3>
                                    <p>{item.category.join(" / ")}</p>
                                </div>
                            ))
                        )
                }
            </div>   
        </div>
    </div>
  );
};

export default Landmarks;
