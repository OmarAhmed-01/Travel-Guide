import React, { useContext, useEffect, useState } from 'react'
import './nation.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Context } from '../../context/Context';
import { assets } from '../../assets/assets';

const Nation = () => {

    const { nation } = useParams();
    const { backend_url, scrollLeft, scrollRight, ref } = useContext(Context);
    const [nations, setNations] = useState([]);

    let Filtered_Nations;

    const normalizedNation = nation.replace(/-/g, " ");
    Filtered_Nations = nations.filter(item => item.name.includes(normalizedNation));

    const fetchNations = async() => {
        try {
            const response = await axios.get(backend_url + "/api/nations/get-nations");
            setNations(response.data.Nations);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNations();
    }, []);

  return (
    <div className='nations-container'>
        <div className="nations-title">
            <p><a href='/'>Home</a> / <a href='/destinations'>Destinations</a> / {nation.replace(/-/g, " ")}</p>
        </div>
        {
            Filtered_Nations.map((item) => (
                <>
                    <div className="nations-header" key={item._id}>
                        <img src={backend_url + "/images/" + item.gallery[0]} alt="" />
                        <h1>{item.name}</h1>
                    </div>
                    <div className="nations-details">
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
                    <div className="nations-information">
                        <h1>{`What is ${item.name}?`}</h1>
                        <p>{item.desc}</p>
                    </div>
                    <div className="nations-paragraphs">
                        {
                            item.paragraphs.map((para) => (
                                <>
                                    <h1>{`What's so significant about ${item.name}?`}</h1>
                                    <p>{para.p1}</p>
                                    <p>{para.p2}</p>
                                </>
                            ))
                        }
                    </div>
                    <div className="nations-gallery">
                        <div className="gallery-scroll-button">
                            <button onClick={scrollLeft}><img src={assets.arrow_left_scroll} alt="" /></button>
                            <button onClick={scrollRight}><img src={assets.arrow_right_scroll} alt="" /></button>
                        </div>
                        <div className="gallery-images" ref={ref}>
                            {item.gallery.map((image) => (
                                <img key={item._id} src={`${backend_url}/images/${image}`} alt="" />
                            ))}
                        </div>
                    </div>
                </>
                
            ))
        }
    </div>
  )
}

export default Nation