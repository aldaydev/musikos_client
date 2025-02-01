import { useState, useEffect } from 'react';

const useGetFetch = () => {

    const [fetchReq, setFetchReq] = useState(['/']);
    const [fetchRes, setFetchRes] = useState();

    const handleFetch = (options) => {

        const fetchConfig = [
            options.endpoint,
            {
            method: options.method,
            headers: { 
                "Content-Type": "application/json", 
            }
        }];

        if (options.authorization) options.headers['authorization'] = params.authorization;
        if(options.body) options.body = JSON.parse(options.body);

        console.log('OPTIONS', options);
        
        setFetchReq(options)
    };

    const server = "127.0.0.1";
    const port = "3001";

    useEffect( () => {
        console.log('fetch req', fetchReq[0]);
        const url = `http://${server}:${port}/bandbros/v1${fetchReq[0]}`;

            fetch(url,fetchReq[1])
            .then(res => res.json())
            .then(res => setFetchRes(res))
            .catch(e => setFetchRes(e))
        

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
export default useGetFetch;