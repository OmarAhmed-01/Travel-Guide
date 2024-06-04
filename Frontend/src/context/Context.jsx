import { createContext, useRef } from "react";
import { useNavigate } from 'react-router-dom'

export const Context = createContext(null);

const ContextProvider = (props) => {

    const navigate = useNavigate();
    const backend_url = "http://localhost:4000";

    const HomePage = () => {
        navigate('/');
    }

    const contextValue = {
        HomePage,
        backend_url,
    };
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;