import React from "react";
import "./header.css";
import { assets } from "../../assets/assets";

const Header = () => {
  return (
    <div className="header-container">
      <div className="image-display">
        <img src={assets.Header} alt="" />
        <h1>See Things Differently</h1>
        <p>A small town in the Alps, Switzerland</p>
      </div>
      <div className="europe-header">
        <div className="paragraphs">
          <h1>Welcome to Europe</h1>
          <p>
            Discover inventive new experiences and captivating stories in 2024,
            brought together with a dose of flair from Europe. From exploring
            film settings and pioneering cultural spaces to countryside trails
            and relaxing wellness retreats, it’s all happening on our shores and
            you’re invited!
          </p>
          <p>
            Venture off the beaten track for new coastal adventures, exploring
            new trails and walking routes, or take in sporting action as the
            world’s best compete in everything from athletics to the Premier
            League.
          </p>
          <p>
            Whether it’s getting a feel for our vibrant cultural cities,
            embarking on a coastal adventure, or discovering locations made
            famous by film and TV, it’s time to experience Britain differently.
          </p>
        </div>
        <div className="image">
          <img src={assets.europe_header} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Header;
