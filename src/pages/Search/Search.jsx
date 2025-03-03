import './search.css';
import { SearchProvider } from '../../context/SearchContext';
import { useEffect, useState } from "react";
import useFetch from "../../utils/useFetch";
import SearchForm from "./components/searchForm/SearchForm";
import SearchList from "./components/searchList/SearchList";

function Search (){

    const {fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError} = useFetch();


    const [musicianslist, setMusiciansList] = useState([]);

    useEffect(()=>{
        if(!sessionStorage.lastSearch){
            fetchReq({
                endpoint: '/musicians',
                method: 'GET',
                item: 'searchAll'
            });
        }
    }, []);

    useEffect(()=>{
        if(fetchItem === 'searchAll'){
            setMusiciansList(fetchRes);
            sessionStorage.lastSearch = JSON.stringify(fetchRes);
        }
    },[fetchRes])

    useEffect(()=>{
        sessionStorage.lastSearch &&
        setMusiciansList(JSON.parse(sessionStorage.lastSearch));
    },[sessionStorage]);

    return(
        <SearchProvider>
            <div className="search__container">
                <SearchForm/>
                <SearchList musicianslist={musicianslist} isLoading={isLoading}/>
            </div>
        </SearchProvider>
    )
}

export default Search;