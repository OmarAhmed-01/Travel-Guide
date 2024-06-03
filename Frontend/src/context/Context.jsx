import { createContext } from "react";
import { useNavigate } from 'react-router-dom'

export const Context = createContext(null);

const ContextProvider = (props) => {

    const navigate = useNavigate();

    const HomePage = () => {
        navigate('/');
    }

    const contextValue = {
        HomePage,
    };
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;