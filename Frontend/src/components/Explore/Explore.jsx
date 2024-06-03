import React from "react";
import "./explore.css";
import { assets } from "../../assets/assets";

const Explore = () => {
  return (
    <div className="explore-container">
      <div className="title">
        <h1>Explore different</h1>
      </div>
      <div className="images">
        <div className="images-details">
          <img src={assets.explore_img1} alt="" />
          <a>Spilling the tea on Europe</a>
          <p>
            We’re spilling the tea on the hottest experiences – and it’s not
            just a good old brew that we’re mad about.
          </p>
        </div>
        <div className="images-details">
          <img src={assets.explore_img2} alt="" />
          <a>Key sporting moments in 2024</a>
          <p>
            Grab your tickets, or a spot by a screen, and join the atmosphere of
            brilliant sport.
          </p>
        </div>
        <div className="images-details">
          <img src={assets.explore_img3} alt="" />
          <a>Day trips from Europe</a>
          <p>
            Europe packs a punch when it comes to the eclectic range of
            destinations within close proximity to London.
          </p>
        </div>
        <div className="images-details">
          <img src={assets.explore_img4} alt="" />
          <a>How to see Europe differently</a>
          <p>
            From gastronomic adventures to eco-friendly stays, there’s always
            more to explore on Europe's shores.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Explore;
