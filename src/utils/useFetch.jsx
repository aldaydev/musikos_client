import { useState, useEffect } from 'react';

export default function useFetch () {

    const [fetchReq, setFetchReq] = useState(null);

    const [fetchRes, setFetchRes] = useState(null);

    const handleFetch = (params) => {
        //Construimos el objeto con config de la petición
        const options = [
            params.endpoint,
            {
            method: params.method,
            headers: { 
                "Content-Type": "application/json", 
            }
        }];
        //Si se envía un token, se añade al headers
        if (params.authorization) options[1].headers['authorization'] = params.authorization;
        //Si se envía body, se añade a options
        if(params.body) options[1].body = JSON.stringify(params.body);
        
        setFetchReq(options)
    };

    const server = "127.0.0.1";
    const port = "3001";

    useEffect( () => {
        
        async function asyncFetch (){
            try{
                
                const url = `http://${server}:${port}/bandbros/v1${fetchReq[0]}`;
                
                const response = await fetch(url,fetchReq[1]);

                if(!response.ok){
                    throw new Error('Error al obtener los datos');
                }

                const data = await response.json();
                setFetchRes(data);

            }catch(e){
                console.log(e);
            }
        }

        if(fetchReq) asyncFetch();

    }, [fetchReq])

    return [handleFetch, fetchRes, setFetchRes];
}