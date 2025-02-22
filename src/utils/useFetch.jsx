import { useState } from 'react';

const useFetch = () => {
  const [fetchRes, setFetchRes] = useState(null); // Repuesta del fetch
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [fetchItem, setFetchItem] = useState(null);

  // Datos del servidor y puerto
  const server = "localhost";
  const port = "3001";


  /**
   * Función para realizar un fetch de cualquier endpoint y por cualquier método
   * @param {String} endpoint -> endpoint al que se hace el fetch
   * @param {String} method -> método del fetch (GET por defecto)
   * @param {*} authorization -> si el fetch requiere autorization del header
   * @param {Object} body -> body del fetch
   */
  const fetchReq = async ({ endpoint = "/home", method = "GET", authorization = null, body = {}, item = null, credentials = 'include' }) => {
    setIsLoading(true);
    setFetchError(null);
    setFetchItem(item);

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      // Si viene autorization, se agrega a los headers
      if (authorization) {
        headers["Authorization"] = authorization;
      }

      // Opciones del fetch
      const fetchOptions = {
        method,
        headers
      };

      //Si las credenciales están habilitadas las metemos
      if(credentials == 'include'){
        fetchOptions.credentials = credentials
      }

      // Si el fetch no es 'GET', se toman los datos del body
      if (method !== "GET") {
        fetchOptions.body = JSON.stringify(body);
      }

      // Se realiza el fetch con la confiduración recibida por parámetro
      const response = await fetch(`http://${server}:${port}/musikos/v1${endpoint}`, fetchOptions);

      // Se contruye la respuesta desde le JSON del fetch
      const data = await response.json();

      if (!response.ok) {
        const err = new Error(data.message || data.statusText);
        err.type = data.type; // Agregar la causa como una propiedad extra
        err.status = response.status;
        throw err;
      }else{
        console.log(data);
        //Se almacena la información de la respuesta del fetch
        setFetchRes(await data);
      }
      
    } catch (err) {
      if(err.message === 'Failed to fetch'){
        setFetchError({message: 'No se ha podido realizar la solicitud.', status: '---'});
      }else{
        console.log(err.status);
        setFetchError({message: err.message, cause: err.type, status: err.status});
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError };
};

export default useFetch;