import { useState, useEffect } from 'react';

const useFetch = () => {

    const [fetchReq, setFetchReq] = useState(null);

    const [fetchRes, setFetchRes] = useState();

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
        

        if(fetchReq){
            const url = `http://${server}:${port}/bandbros/v1${fetchReq[0]}`;

            fetch(url,fetchReq[1])
            .then(res => res.json())
            .then(res => {setFetchRes(res); console.log(res)})
            .catch(e => setFetchRes(e))
        }
            
        

        // if(fetchReq.method === 'GET'){
        //     fetch(url)
        //     .then(res => res.json())
        //     .then(res => console.log(res))
        //     .catch(e => console.log(e));
        // }else{
        //     fetch(
        //         url,{
        //             method: fetchReq.method,
        //             headers: { 
        //                 "Content-Type": "application/json", 
        //                 "authorization": fetchReq.authorization 
        //             },
        //             body: JSON.stringify(fetchReq.body),
        //         }
                
        //     )
        //     .then((res) => {res.json(); console.log(res)})
        //     .then(res => setFetchRes(res))
        //     .catch(e => setFetchRes(e))
        // }

    }, [fetchReq])

    return [handleFetch, fetchRes]
}

// Exportamos el hook personalizado como predeterminado
export default useFetch;