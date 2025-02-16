const server = "127.0.0.1";
const port = "3001";

const setFetchOptions = (options) => {

    //Construimos el objeto con config de la petición
    const fetchOptions = [
        options.endpoint,
        {
        method: options.method,
        headers: { 
            "Content-Type": "application/json", 
        }
    }];

    //Si se envía un token, se añade al headers
    if (options.authorization) fetchOptions[1].headers['authorization'] = options.authorization;
    //Si se envía body, se añade a options
    if(options.body) fetchOptions[1].body = JSON.stringify(options.body);

    return fetchOptions;
}

export default async function customFetch (options){
    try{
        
        const fetchOptions = setFetchOptions(options);

        const url = `http://${server}:${port}/musikos/v1${fetchOptions[0]}`;
        
        const response = await fetch(url,fetchOptions[1]);

        if(!response.ok){
            throw new Error('Error al obtener los datos');
        }

        const data = await response.json();
        
        return data;

    }catch(e){

        return {error: e.message, message: 'Ha habido un error al obtener los datos'}
    }
}