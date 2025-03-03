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
        minAge: '16',
        maxAge: '100',
        name: ''
    })
    // const [queryString, setQueryString] = useState('?');

    // const [queryString, setQueryString] = useState([]);

    // const handleQuery = (key, value) => {
    //     setQueryObject(prevQuery => {
    //         // No sobrescribir, solo añadir o actualizar la clave
    //         return {
    //             ...prevQuery,
    //             [key]: value === null || value === undefined ? "" : value,
    //             active: true
    //         };
    //     });
    // };
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
            console.log(instruments);
            const instrumentsQquery = setQueryFromArray('instruments', instruments);
            console.log(instrumentsQquery);
            handleQuery('instruments', instrumentsQquery);
            // const queryString = instruments.map(inst => `instrument=${encodeURIComponent(inst)}`).join('&');
            // console.log(queryString);
        }
    }, [instruments]);

    useEffect(()=>{
        if(styles && styles.length > 0){
            console.log(styles);
            const stylesQquery = setQueryFromArray('styles', styles);
            console.log(stylesQquery);
            handleQuery('styles', stylesQquery);
            // setQueryString((prev)=>{ return prev += stylesQquery})
            // handleQuery('styles', styles);
        }
    }, [styles]);
    
    useEffect(()=>{
        if(province && province.length > 0){
            console.log(province[0]);
            const provinceQuery = `province=${encodeURIComponent(province[0])}`
            console.log(provinceQuery);
            handleQuery('province', provinceQuery);
            // setQueryString((prev)=>{ return prev += provinceQuery})
            // handleQuery('province', province[0]);
        }
    }, [province]);

    useEffect(()=>{
        console.log('Final query', queryObject);
    },[queryObject])

    // const [queryArr, setQueryArr] = useState();

    // useEffect(()=>{
    //     queryObject && queryObject.active &&
    //     console.log('QueryObject', queryObject) &&
    //     setQueryArr(Array.from(Object.entries(queryObject)));
    // },[queryObject])

    // useEffect(()=>{
    //     console.log(queryObject);
    //     if(queryArr){    
    //         // let queryArr = Array.from(Object.entries(queryObject));
    //         // console.log('QUERY ARR', queryArr);
    //         const queryString = queryArr.reduce((acc, curr) => {
    //             if(curr[1] && curr[1].length > 0){
    //                 if(curr[0] === 'instruments' || curr[0] === 'styles'){
    //                     curr[1].forEach(element => {
    //                         // console.log('Element', element);
    //                         acc += `${curr[0]}=${element}&`
    //                     });
    //                 }
    //                     acc += `${curr[0]}=${curr[1]}&`
                    
    //             }
    //             return acc;
    //         },'?');

    //         const finalQuery = queryString.substring(0, queryString.length-1);
    //         // console.log(finalQuery);
            
    //     }
        
    // },[queryArr])

    // useEffect(()=>{
    //     console.log('PROVINCE', province);
    //     console.log('TOWN', town);
    // },[province, town])

    // useEffect(()=>{
    //     console.log('MIN AGE', minAge);
    //     console.log('MAX AGE', maxAge);
    // },[minAge, maxAge])

    // useEffect(()=>{
    //     console.log(name);
    // }, [name])

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
        setName
    };
}

export default useSearch;