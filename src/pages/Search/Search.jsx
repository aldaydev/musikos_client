import './search.css';
import { UseSearchContext } from '../../context/SearchContext';
import { useEffect, useState } from "react";
import useFetch from "../../utils/useFetch";
import SearchForm from "./components/SearchForm";
import SearchList from "./components/SearchList";

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
        }else{
            setFinalList(JSON.parse(sessionStorage.lastSearch));
        }
    }, []);

    useEffect(()=>{
        console.log('Cambiar fetchRes');
        if(fetchItem === 'searchAll'){
            setFinalList(fetchRes);
            sessionStorage.lastSearch = JSON.stringify(fetchRes);
        }

    },[fetchRes])

    return(
        
            <div className="search__container">
                <SearchForm/>
                <SearchList isLoading={isLoading}/>
            </div>
        
    )
}

export default Search;