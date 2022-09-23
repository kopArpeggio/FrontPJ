import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { UserContext } from './ContextStudent';

const Provide = ({ children }) => {
    
    const [user, setUser] = useState("");
    
    // const Getstudent = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:3001/test3')
    //         setUser(response.data);

    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     Getstudent();
    // }, []);
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )


};

export default Provide