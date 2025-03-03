import { useEffect, useState } from "react";
import useFetch from "../../utils/useFetch";
import { useMemo } from 'react';

const useSearch = () => {

    //Query States
    const [styles, setStyles] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [province, setProvince] = useState([]);
    const [town, setTown] = useState(null);
    const [minAge, setMinAge] = useState(16);
    const [maxAge, setMaxAge] = useState(100);
    const [name, setName] = useState('');
    const [queryObject, setQueryObject] = useState({
        instruments: '',
        styles: '',
        province: '',
        town: '',
        minAge: 'minAge=16',
        maxAge: 'maxAge=100',
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
        }else{
            handleQuery('instruments', null);
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
        }else{
            handleQuery('styles', null);
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
        }else{
            handleQuery('province', null);
        }
    }, [province]);

    useEffect(()=>{
        if(town && town.length > 0){
            console.log(town[0]);
            const townQuery = `town=${encodeURIComponent(town[0])}`
            console.log(townQuery);
            handleQuery('town', townQuery);
            // setQueryString((prev)=>{ return prev += provinceQuery})
            // handleQuery('province', province[0]);
        }else{
            handleQuery('town', null);
        }
    }, [town]);

    useEffect(()=>{
        if(minAge){
            console.log(typeof minAge);
            console.log(maxAge);
            let minAgeQuery = `minAge=${minAge}`;
            // if(minAge > maxAge){
            //     minAgeQuery = `minAge=${maxAge}`
            // }else{
            //     minAgeQuery = `minAge=${minAge}`
            // }
            console.log(minAgeQuery);
            handleQuery('minAge', minAgeQuery);
            // setQueryString((prev)=>{ return prev += provinceQuery})
            // handleQuery('province', province[0]);
        }else{
            handleQuery('minAge', 'minAge=16');
        }
    }, [minAge]);

    useEffect(()=>{
        if(maxAge){
            console.log(typeof maxAge);
            console.log(minAge);
            let maxAgeQuery = `maxAge=${maxAge}`;
            console.log(maxAgeQuery);
            handleQuery('maxAge', maxAgeQuery);
            // setQueryString((prev)=>{ return prev += provinceQuery})
            // handleQuery('province', province[0]);
        }else{
            handleQuery('maxAge', 'maxAge=100');
        }
    }, [maxAge]);

    useEffect(()=>{
        if(name){
            console.log(name);
            let nameQuery = `name=${name}`;
            console.log(nameQuery);
            handleQuery('name', nameQuery);
            // setQueryString((prev)=>{ return prev += provinceQuery})
            // handleQuery('province', province[0]);
        }else{
            handleQuery('name', null);
        }
    }, [name]);

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