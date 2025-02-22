import { createContext, useEffect, useState } from "react";
import useFetch from "../utils/useFetch";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    //UseFetch Initialization
    const { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError } = useFetch();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(false);

    useEffect(()=>{
        fetchReq({
            endpoint: '/musicians/verify-token',
            method: 'POST',
            item: 'verifyAccessToken'
        });


    },[])

    return (
        <AuthContext.Provider value={{ isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}