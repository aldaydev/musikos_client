//React imports
import { createContext, useContext, useEffect, useState } from "react";
//Utils imports
import useFetch from "../utils/useFetch";
import useSearch from "../pages/Search/useSearch";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {

    //UseFetch Initialization
    const { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError } = useFetch();

    // const {province} = useSearch();

    //Form options state
    const [allAges, setAllAges] = useState([]);
    const [allStyles, setAllStyles] = useState(null);
    const [allInstruments, setAllInstruments] = useState(null);
    const [allProvinces, setAllProvinces] = useState([]);
    const [currentTowns, setCurrentTowns] = useState([]);

    //Function to set all ages
    const seedAges = () =>{
        let ages = [];
        for(let i = 16; i <= 100; i++){
            ages.push(i);
        }
        setAllAges(ages);
    }

    //Initial seed of form options
    useEffect(()=>{
        seedAges();
        if(sessionStorage.instruments === undefined && sessionStorage.styles === undefined && sessionStorage.province === undefined){
            // console.log('No hay nada en session storage: Hace el fetch');
            fetchReq({
                endpoint: '/generic/search-data',
                method: 'GET',
                item: 'searchData'
            });
        }else{
            // console.log('Segunda carga: pilla de sessionStorage')
            setAllStyles(JSON.parse(sessionStorage.styles));
            setAllInstruments(JSON.parse(sessionStorage.instruments));
            setAllProvinces(JSON.parse(sessionStorage.provinces));
        }
    },[])

    useEffect(()=>{

        if(fetchRes){
            if(fetchItem === 'searchData' && fetchRes.styles  && fetchRes.instruments && fetchRes.provinces){
                sessionStorage.styles = JSON.stringify(fetchRes.styles);
                sessionStorage.instruments = JSON.stringify(fetchRes.instruments);
                setAllStyles(fetchRes.styles);
                setAllInstruments(fetchRes.instruments);
                sessionStorage.provinces = JSON.stringify(fetchRes.provinces);
                setAllProvinces(fetchRes.provinces);
            }

            // if(fetchRes && fetchItem === 'townsByProvince'){
            //     console.log('TWONS', fetchRes);
            //     setCurrentTowns(fetchRes);
            // }
        }
    },[fetchRes])

    // useEffect(()=>{
    //     if(allInstruments){
    //         console.log(allInstruments);
    //     }
    // },[allInstruments])

    // useEffect(()=>{
    //     console.log('eeeeeeeeeey')
    //     if(province){
    //         console.log(province[1])
    //         fetchReq({
    //             endpoint: `/generic/towns?code=${province[1]}`,
    //             method: 'GET',
    //             item: 'townsByProvince'
    //         });
    //     }
    // },[province]);

    const [finalList, setFinalList] = useState(null);
    const [searchError, setSearchError] = useState(null);


    return (
        <SearchContext.Provider value={{ 
            allAges,
            allStyles,
            allInstruments,
            allProvinces,
            currentTowns,
            setCurrentTowns,
            finalList, 
            setFinalList,
            searchError,
            setSearchError
        }}>
            {children}
        </SearchContext.Provider>
    )
}

export function UseSearchContext() {
    return useContext(SearchContext);
}