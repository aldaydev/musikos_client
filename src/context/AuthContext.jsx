import { createContext, useEffect, useState } from "react";
import useFetch from "../utils/useFetch";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    //UseFetch Initialization
    const { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError } = useFetch();

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        if(sessionStorage.auth && JSON.parse(sessionStorage.auth).verified){
            return true;
        }else{
            return false;
        }
    });

    const [authInternalError, setAuthInternalError] = useState(false);


    useEffect(()=>{
        //If user is not loggedin in context
        if(!isLoggedIn){
            //If sessionStorage has no data about log
            if(!sessionStorage.auth){
                console.log('Es la primera vez que se comprueba si el usuario está logeado');
                //Request to verify access token
                fetchReq({
                    endpoint: '/auth/verify-access-token',
                    method: 'GET',
                    item: 'verifyAccessToken',
                    credentials: 'include'
                });

            //If sessionStorage has data about log
            }else{
                console.log('No es la primera vez que se comprueba si el usuario está logeado');

                //If loggedin at SessionStorage
                if(JSON.parse(sessionStorage.auth).verified){
                    console.log('Está logeado a través de sessionStorage');
                    setIsLoggedIn(true);
                    
                //If not loggedin at SessionStorage
                }else{
                    console.log('Ya se ha comprobado que no está logeado');
                    console.log(isLoggedIn);
                    setIsLoggedIn(false);
                }
            }
        }
    },[])

    useEffect(()=>{
        if(fetchItem === 'verifyAccessToken'){
            if(fetchError && fetchError.status === 500){
                console.log('Ha habido un problema interno');
                setAuthInternalError(fetchError);
                setIsLoggedIn(false);
            }else if(fetchError && (fetchError.status === 401 || 400)){
                console.log('AccessToken no válido. Solicitando renovación con refreshToken');
                fetchReq({
                    endpoint: '/auth/new-access-token',
                    method: 'GET',
                    item: 'newAccessToken',
                    credentials: 'include'
                });
            }else if(fetchRes){
                console.log('accessToken obtenido correctamente. Introduciendo data en sessionStorage');
                sessionStorage.auth = JSON.stringify(fetchRes);
                setIsLoggedIn(true);
            }
        }

        if(fetchItem === 'newAccessToken'){
            if(fetchError && fetchError.status === 500){
                console.log('Ha habido un problema interno');
                setAuthInternalError(fetchError);
            }else if(fetchError && (fetchError.status === 400 || 401)){
                console.log('refreshToken no válido. No está loggeado');
                sessionStorage.auth = JSON.stringify({verified: false});
                setIsLoggedIn(false);
            }else if(fetchRes){
                console.log('RefreshToken válido, obteniendo nuevo accessToken');
                sessionStorage.auth = JSON.stringify(fetchRes);
                setIsLoggedIn(true);
            }
        }
        

    }, [fetchRes, fetchError, fetchItem, fetchReq])

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}