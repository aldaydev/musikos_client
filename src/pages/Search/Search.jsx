import './search.css';
import { useEffect, useState } from "react";
import useFetch from "../../utils/useFetch";
import SearchForm from "./SearchForm";
import SearchList from "./SearchList";



function Search (){

    const {fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError} = useFetch();

    const [musicianslist, setMusiciansList] = useState([]);

    useEffect(()=>{
        fetchReq({
            endpoint: '/musicians',
            method: 'GET',
            item: 'searchAll'
        });
    }, []);

    useEffect(()=>{
        setMusiciansList(fetchRes);
    },[fetchRes])

    return(
        <div className="search__container">
            <SearchForm/>
            <SearchList musicianslist={musicianslist} loading={isLoading}/>
        </div>
    )
}

export default Search;