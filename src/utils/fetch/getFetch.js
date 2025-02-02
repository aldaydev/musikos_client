const server = "127.0.0.1";
const port = "3001";
const url = `http://${server}:${port}/bandbros/v1${fetchReq[0]}`

export default {
    
    checkEmail: async (options) =>{

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
    }
}