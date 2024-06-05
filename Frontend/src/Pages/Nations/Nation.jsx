import React, { useContext, useEffect, useState } from 'react'
import './nation.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Context } from '../../context/Context';

const Nation = () => {

    const { nation } = useParams();
    const { backend_url } = useContext(Context);
    const [nations, setNations] = useState([]);

    const fetchNations = async() => {
        try {
            const response = await axios.get(backend_url + "/api/nations");
            setNations(response.data.Nations);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNations();
    }, []);

    useEffect(() => {
        console.log("Nations: "+JSON.stringify(nations, null, 2));
    }, [nations])

  return (
    <div>Nations</div>
  )
}

export default Nation