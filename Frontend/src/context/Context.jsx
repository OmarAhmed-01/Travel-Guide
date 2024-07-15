import { createContext, useRef } from "react";
import { useNavigate } from 'react-router-dom'

export const Context = createContext(null);

const ContextProvider = (props) => {

    const navigate = useNavigate();
    // const backend_url = "https://travel-guide-backend.onrender.com";
    const backend_url = "http://localhost:4000";

    const ref = useRef(null);
    const scrollAmount = 700;
    const HomePage = () => {
        navigate('/');
    }
    const HandleNationClick = (nation_name) => {
        const TrimmedNationName = nation_name.trim().replace(/\s+/g, '-');
        navigate(`/destinations/${TrimmedNationName}`);
    };
    const HandleCityClick = (country_name, city_name) => {
        const TrimmedCityName = city_name.trim().replace(/\s+/g, '-');
        const TrimmedCountryName = country_name.trim().replace(/\s+/g, '-');
        navigate(`/destinations/${TrimmedCountryName}/${TrimmedCityName}`);
    };
    const HandleLandmarkClick = (country_name, city_name, landmark_name) => {
        const TrimmedCityName = city_name.trim().replace(/\s+/g, '-');
        const TrimmedCountryName = country_name.trim().replace(/\s+/g, '-');
        const TrimmedLandmarkName = landmark_name.trim().replace(/\s+/g, '-')
        navigate(`/landmarks/${TrimmedCountryName}/${TrimmedCityName}/${TrimmedLandmarkName}`)
    }
    const scrollLeft = () => {
        if (ref.current) {
            ref.current.scrollLeft -= scrollAmount;
        }
    };

    const scrollRight = () => {
        if (ref.current) {
            ref.current.scrollLeft += scrollAmount;
        }
    };

    const contextValue = {
        HomePage,
        backend_url,
        HandleNationClick,
        HandleCityClick,
        ref,
        scrollLeft,
        scrollRight,
        scrollAmount,
        HandleLandmarkClick,
    };
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;