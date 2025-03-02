import ErrorModal from '../../components/Modals/ErrorModal';
import { useEffect, useState } from 'react';
import useFetch from '../../utils/useFetch';
import Selector from '../../components/Forms/Selector';
import MultiSelector from '../../components/Forms/MultiSelector';
import Button from '../../components/Forms/Button';
import DateSelector from '../../components/Forms/DateSelector';


function RegionSelector ({getSelection}){

    const {fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError} = useFetch();

    const [searchForm, setSearchForm] = useState({
        styles: null,
        instruments: null
    });

    const [regionSelection, setRegionSelection] = useState(null);

    useEffect(() => {
        fetchReq({
            endpoint: '/generic/regions',
            method: 'GET',
            item: 'regions'
        });
    }, []);

    useEffect(()=>{
        console.log(searchForm);
        if(regionSelection){
            console.log('Ha elegido una región');
        }
    },[searchForm]);


    return(
        <section className="searchForm__container">
            <h2>FORMULARIO DE BÚSQUEDA</h2>
            <form className="search__form">

                <Selector getSelection={setRegionSelection} title='C. Autónoma' options={fetchRes && fetchRes}/>
                
            </form>
        </section>
    )
}

export default RegionSelector;