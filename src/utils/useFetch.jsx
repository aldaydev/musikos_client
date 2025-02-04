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
  const fetchReq = async ({ endpoint = "/home", method = "GET", authorization = null, body = {}, item = null }) => {
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
        headers,
      };

      // Si el fetch no es 'GET', se toman los datos del body
      if (method !== "GET") {
        fetchOptions.body = JSON.stringify(body);
      }

      // Se realiza el fetch con la confiduración recibida por parámetro
      const response = await fetch(`http://${server}:${port}/bandbros/v1${endpoint}`, fetchOptions);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Se contruye la respuesta desde le JSON del fetch
      const data = await response.json();
      console.log(data.html);
      //Se almacena la información de la respuesta del fetch
      setFetchRes(await data);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem };
};

export default useFetch;