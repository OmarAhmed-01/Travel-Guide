import React, {useContext, useEffect, useRef, useState} from "react";
import "./destinations.css";
import { assets } from "../../assets/assets.js";
import { Context } from "../../context/Context";
import axios from "axios";

const Destinations = () => {

    const { backend_url, HandleNationClick, HandleCityClick } = useContext(Context);
    const [nations, setNations] = useState([]);
    const [cities, setCities] = useState([]);
    const NationScrollAmount = 600;
    const CityScrollAmount = 600;

    const NationsSlideRef = useRef(null);
    const NationContainer = NationsSlideRef.current;

    const CitySlideRef = useRef(null);
    const CityContainer = CitySlideRef.current;

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
        const response = await axios.get(backend_url+'/api/city/get-city');
        setCities(response.data.Cities)
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
        fetchNations();
        fetchCities();
    }, []);

    useEffect(() => {
        console.log("Nations: "+JSON.stringify(nations, null, 2));
        console.log("Cities: "+JSON.stringify(cities, null, 2));
    }, [nations])

  return (
    <div className="dest-container">
      <div className="dest-header">
        <p>
          <a href="/">Home</a> / Destinations
        </p>
      </div>
      <div className="dest-img">
        <img src={assets.destination_header} alt="" />
        <p>Hungarian Parliament, Bucharest</p>
      </div>
      <div className="dest-paragraphs">
        <p>
          Explore the ancient ruins of Rome, wander the gondola-filled canals of
          Venice, or hike the majestic peaks of the Swiss Alps - Europe offers a
          smorgasbord of experiences for every traveler.
        </p>
        <p>
          Thrill-seekers can chase the aurora borealis in Iceland or delve into
          the mysterious underground world of Slovenia's caves. History buffs
          can wander the colossal Alhambra palace in Spain or marvel at the
          fairytale castles of Bavaria. Foodies will delight in the rich pasta
          dishes of Italy, the fresh seafood platters of Greece, and the
          decadent pastries of France.
        </p>
        <p>
          From the vibrant nightlife of Berlin to the serene landscapes of
          Ireland, Europe's tapestry is woven with cultural threads as diverse
          as its landscapes. So pack your bags and decide: will you be charmed
          by the cobbled streets of Prague, awe-struck by the fjords of Norway,
          or dazzled by the artistic treasures of Florence? The adventure
          awaits!
        </p>
      </div>
      <div className="nations">
        <div className="nations-title">
            <h1>Nations</h1>
        </div>
        <div className="nations-items" ref={NationsSlideRef}>
            {
                nations.map((nation) => (
                    <div key={nation._id} className="item">
                        <img src={backend_url + "/images/"+nation.img} alt="" />
                        <h1 onClick={() => {HandleNationClick(nation.name)}}>{nation.name}</h1>
                        <p>{nation.desc}</p>
                    </div>
                ))
            }
        </div>
        <div className="arrows">
            <img src={assets.arrow_left_scroll} onClick={() => NationContainer.scrollLeft -= NationScrollAmount} alt="" />
            <img src={assets.arrow_right_scroll} onClick={() => NationContainer.scrollLeft += NationScrollAmount} alt="" />
        </div>
      </div>
      <div className="cities">
        <div className="cities-title">
          <h1>Cities</h1>
        </div>
        <div className="cities-items" ref={CitySlideRef}>
          {
            cities.map((city) => (
              <div key={city._id} className="item">
                <img src={backend_url+'/images/'+city.img} alt="" />
                <h1 onClick={() => {HandleCityClick(city.country,city.city)}}>{city.city}</h1>
                <h2 onClick={() => {HandleNationClick(city.country)}}>{city.country}</h2>
                <p>{city.desc}</p>
              </div>
            ))
          }
        </div>
        <div className="arrows">
            <img src={assets.arrow_left_scroll} onClick={() => CityContainer.scrollLeft -= CityScrollAmount} alt="" />
            <img src={assets.arrow_right_scroll} onClick={() => CityContainer.scrollLeft += CityScrollAmount} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Destinations;
