import { useState, useEffect } from 'react';

const useFetch = () => {

    const [fetchReq, setFetchReq] = useState(['/']);

    const [fetchRes, setFetchRes] = useState();

    // const handleFetch = (params) => {
    //     setFetchReq({ ...fetchReq, ...params })
    // };

    const handleFetch = (params) => {

        // const ref = {
        //     method: fetchReq.method,
        //     headers: { 
        //         "Content-Type": "application/json", 
        //         "authorization": fetchReq.authorization && fetchReq.authorization
        //     },
        //     body: JSON.stringify(fetchReq.body)
        // };

        const options = [
            params.endpoint,
            {
            method: params.method,
            headers: { 
                "Content-Type": "application/json", 
            }
        }];

        if (params.authorization) options.headers['authorization'] = params.authorization;
        if(params.body) options.body = JSON.parse(params.body);

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
export default useFetch;