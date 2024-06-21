import React, { useContext, useEffect, useState } from "react";
import "./landmark.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";
import { assets } from "../../assets/assets";

const Landmark = () => {
  const { landmark } = useParams();
  const { backend_url, scrollLeft, scrollRight, ref } = useContext(Context);
  const [landmarks, setLandmarks] = useState([]);
  const NormalizeLandmark = landmark.replace(/-/g, " ");

  let Filtered_Landmark;

  const fetchLandmark = async () => {
    try {
      const response = await axios.get(backend_url + "/api/landmarks/get-landmarks");
      setLandmarks(response.data.Landmarks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLandmark();
  }, []);

  Filtered_Landmark = landmarks.filter((item) =>
    item.name.includes(NormalizeLandmark)
  );

  return (
    <div className="landmark-container">
      <div className="landmark-link">
        <p>
          <a href="/">Home</a> / <a href="/landmarks">Landmarks</a> /{" "}
          {NormalizeLandmark}
        </p>
      </div>
      {Filtered_Landmark.map((item) => (
        <>
          <div className="landmark-header">
            <img src={backend_url + "/images/" + item.image[0]} alt="" />
            <h1>{item.name}</h1>
            <p>{item.country}</p>
          </div>
          <div className="landmark-details">
            <div className="city">
              <h2>City</h2>
              <p>{item.city}</p>
            </div>
            <div className="zipcode">
              <h2>Zipcode</h2>
              <p>{item.zipcode}</p>
            </div>
            <div className="location">
              <h2>Location</h2>
              <p>{`lat: ${item.location.lat}, lon: ${item.location.lon}`}</p>
            </div>
          </div>
          <div className="landmark-desc">
            <div className="landmark-title">
              <h1>Historical significance</h1>
            </div>
            <div className="landmark-para">
              <div className="landmark-left">
                <p>{item.desc}</p>
              </div>
              <div className="landmark-right">
                <img src={backend_url + "/images/" + item.image[1]} alt="" />
              </div>
            </div>
          </div>
          <div className="landmark-gallery">
            <div className="gallery-scroll-button">
                <button onClick={scrollLeft}><img src={assets.arrow_left_scroll} alt="" /></button>
                <button onClick={scrollRight}><img src={assets.arrow_right_scroll} alt="" /></button>
            </div>
              <div className="gallery-images" ref={ref}>
                  {item.image.map((image) => (
                      <img key={item._id} src={`${backend_url}/images/${image}`} alt="" />
                  ))}
              </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Landmark;
