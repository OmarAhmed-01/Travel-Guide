import React, { useContext, useEffect, useState } from "react";
import "./landmarks.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { Context } from "../../context/Context";

const Landmarks = () => {

    const { backend_url } = useContext(Context);
    const [landmarks, setLandmarks] = useState([]);

    const fetchLandmarks = async() => {
        try {
            const response = await axios.get(backend_url + "/api/landmarks");
            setLandmarks(response.data.data);
            
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchLandmarks();
    }, []);

    useEffect(() => {
        console.log(landmarks);
    }, [])

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
            <h1 className="title">Europe's Finest</h1>
            <div className="landmarks">
                {
                    landmarks.map((item) => (
                        <div className="landmarks-item" key={item._id}>
                            <img src={backend_url + "/images/" + item.image[0]} alt="" />
                            <h1>{item.name}</h1>
                            <h2>{item.city}</h2>
                            <h3>{item.country}</h3>
                            <p>{item.category.join(" / ")}</p>
                        </div>
                    ))
                }
            </div>   
        </div>
    </div>
  );
};

export default Landmarks;
