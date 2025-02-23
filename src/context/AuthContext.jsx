import { createContext, useEffect, useState } from "react";
import useFetch from "../utils/useFetch";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    //UseFetch Initialization
    const { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError } = useFetch();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(false);

    useEffect(()=>{
        if(!sessionStorage.user){
            fetchReq({
                endpoint: '/musicians/verify-token',
                method: 'POST',
                item: 'verifyAccessToken'
            });
        }else{
            setIsLoggedIn(true);
        }
    },[])

    useEffect(()=>{
        if(fetchItem === 'verifyAccessToken'){
            
        }

    }, [fetchRes, fetchError])

    return (
        <AuthContext.Provider value={{ isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}