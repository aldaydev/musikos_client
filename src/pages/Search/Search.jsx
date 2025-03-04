import './search.css';
import { SearchProvider, UseSearchContext } from '../../context/SearchContext';
import { useEffect, useState } from "react";
import useFetch from "../../utils/useFetch";
import SearchForm from "./components/searchForm/SearchForm";
import SearchList from "./components/searchList/SearchList";

function Search (){

    const {fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError} = useFetch();

    const { setFinalList } = UseSearchContext();


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
        console.log('Cambiar fetchRes');
        if(fetchItem === 'searchAll'){
            setFinalList(fetchRes);
            sessionStorage.lastSearch = JSON.stringify(fetchRes);
        }

        // if(fetchItem === 'filterMusicians'){
        //     setFinalList(fetchRes);
        //     sessionStorage.lastSearch = JSON.stringify(fetchRes);
        // }
    },[fetchRes])

    useEffect(()=>{
        sessionStorage.lastSearch &&
        setFinalList(JSON.parse(sessionStorage.lastSearch));
    },[sessionStorage]);

    return(
        
            <div className="search__container">
                <SearchForm/>
                <SearchList isLoading={isLoading}/>
            </div>
        
    )
}

export default Search;