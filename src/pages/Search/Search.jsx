import { useEffect, useState } from "react";
import useFetch from "../../utils/useFetch";
import ErrorModal from '../../components/Modals/ErrorModal';


function Search (){

    const {fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError} = useFetch();
    const [musicians, setMusicians] = useState(null);

    useEffect(()=>{
        fetchReq({
            endpoint: '/search/all',
            method: 'GET',
            item: 'searchAll'
        });
    }, [])


    return(
        <div className="search__container">
            <h2>ESTO ES EL BUSCADOR DE MÚSICOS</h2>
            <form className="search__form">

            </form>
            <section className="search__listContainer">
                <ul className="search__list">

                </ul>
            </section>

            {fetchError && fetchItem === 'searchAll' && <ErrorModal error={fetchError} setError={setFetchError}/>}
        </div>
    )
}

export default Search;