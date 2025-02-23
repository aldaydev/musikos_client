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
        if(!isLoggedIn){
            if(!sessionStorage.auth){
                console.log('Es la primera vez que se comprueba si el usuario está logeado');
                fetchReq({
                    endpoint: '/auth/verify-access-token',
                    method: 'POST',
                    item: 'verifyAccessToken',
                    credentials: 'include'
                });
            }else{
                console.log('No es la primera vez que se comprueba si el usuario está logeado');
                if(JSON.parse(sessionStorage.auth).verified){
                    console.log('Está logeado a través de sessionStorage');
                    setIsLoggedIn(true);
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
            }else if(fetchError && fetchError.status === 400){
                console.log('AccessToken no válido. Solicitando renovación...');
                fetchReq({
                    endpoint: '/auth/new-access-token',
                    method: 'POST',
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
            }else if(fetchError && fetchError.status === 400){
                console.log('refreshToken no válido. No está loggeado');
                sessionStorage.auth = JSON.stringify({verified: false});
                setIsLoggedIn(false);
            }else if(fetchRes){
                console.log('Obteniendo datos del accessToken');
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