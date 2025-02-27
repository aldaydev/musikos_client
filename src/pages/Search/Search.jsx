import { useEffect, useState } from "react";
import useFetch from "../../utils/useFetch";
import ErrorModal from '../../components/Modals/ErrorModal';


function Search (){

    const {fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError} = useFetch();
    const [musicians, setMusicians] = useState(null);

    const baseImageUrl = 'https://raw.githubusercontent.com/aldaydev/musikos_images/main/profiles/';

    useEffect(()=>{
        fetchReq({
            endpoint: '/musicians',
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
                    {fetchRes && fetchItem === 'searchAll' && 
                    fetchRes.map((musician, i) => (
                        <li key={i}>
                            <span>{musician.username}</span>
                            <span>{musician.id}</span>
                            <img src={`${baseImageUrl}${musician.image}`}/>
                        </li>
                    ))
                    }
                </ul>
            </section>

            {fetchError && fetchItem === 'searchAll' && <ErrorModal error={fetchError} setError={setFetchError}/>}
        </div>
    )
}

export default Search;