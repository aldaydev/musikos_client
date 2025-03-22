import { useEffect, useState } from "react";
import useFetch from "../../utils/useFetch";
import { useMemo } from 'react';

const useSearch = () => {

    //Query States
    const [styles, setStyles] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [province, setProvince] = useState([]);
    const [town, setTown] = useState(null);
    const [minAge, setMinAge] = useState(null);
    const [maxAge, setMaxAge] = useState(null);
    const [name, setName] = useState('');
    const [queryObject, setQueryObject] = useState({
        instruments: '',
        styles: '',
        province: '',
        town: '',
        minAge: 'minAge=16',
        maxAge: 'maxAge=100',
        name: ''
    });
    const [finalQuery, setFinalQuery] = useState();

    const handleQuery = useMemo(() => {
        return (key, value) => {
            setQueryObject(prevQuery => {
                // No sobrescribir, solo añadir o actualizar la clave
                return {
                    ...prevQuery,
                    [key]: value === null || value === undefined ? "" : value
                };
            });
        };
    }, []); // Dependencias, si es necesario agregar

    const setQueryFromArray = (name, array) =>{
        const queryString = array.map(inst => `${name}=${encodeURIComponent(inst)}`).join('&');
        return queryString;
    }

    useEffect(()=>{
        if(instruments && instruments.length > 0){
            // console.log(instruments);
            const instrumentsQquery = setQueryFromArray('instruments', instruments);
            console.log(instrumentsQquery);
            handleQuery('instruments', instrumentsQquery);
        }else{
            handleQuery('instruments', null);
        }
    }, [instruments]);

    useEffect(()=>{
        if(styles && styles.length > 0){

            const stylesQquery = setQueryFromArray('styles', styles);

            handleQuery('styles', stylesQquery);

        }else{
            handleQuery('styles', null);
        }
    }, [styles]);
    
    useEffect(()=>{
        if(province && province.length > 0){
            const provinceQuery = `province=${encodeURIComponent(province[0])}`

            handleQuery('province', provinceQuery);

        }else{
            handleQuery('province', null);
        }
    }, [province]);

    useEffect(()=>{
        if(town && town.length > 0){
            const townQuery = `town=${encodeURIComponent(town[0])}`

            handleQuery('town', townQuery);

        }else{
            handleQuery('town', null);
        }
    }, [town]);

    useEffect(()=>{
        if(minAge){

            let minAgeQuery = `minAge=${minAge}`;

            handleQuery('minAge', minAgeQuery);

        }else{
            handleQuery('minAge', 'minAge=16');
        }
    }, [minAge]);

    useEffect(()=>{
        if(maxAge){

            let maxAgeQuery = `maxAge=${maxAge}`;

            handleQuery('maxAge', maxAgeQuery);
        }else{
            handleQuery('maxAge', 'maxAge=100');
        }
    }, [maxAge]);

    useEffect(()=>{
        if(name){
            let nameQuery = `name=${name}`;
            handleQuery('name', nameQuery);

        }else{
            handleQuery('name', null);
        }
    }, [name]);

    useEffect(()=>{

        const queryString = Array.from(Object.entries(queryObject)).filter(query => query[1]).map(query => query[1]).join('&');
        setFinalQuery(queryString);

    },[queryObject])

    return {
        setStyles, 
        setInstruments,
        province, 
        setProvince, 
        setTown, 
        minAge,
        setMinAge,
        maxAge,
        setMaxAge,
        name,
        setName,
        finalQuery
    };
}

export default useSearch;