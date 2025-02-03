import { useState } from 'react';

const useFetch = () => {
  const [fetchRes, setFetchRes] = useState(null); // Repuesta del fetch
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

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
  const fetchData = async ({ endpoint = "/home", method = "GET", authorization = null, body = {} }) => {
    setIsLoading(true);
    setFetchError(null);

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
      const response = await fetch(`http://${server}:${port}/trainingpro/v1${endpoint}`, fetchOptions);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Se contruye la respuesta desde le JSON del fetch
      const data = await response.json();

      //Se almacena la información de la respuesta del fetch
      setFetchRes(data);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchRes, isLoading, fetchError, fetchData };
};

export default useFetch;