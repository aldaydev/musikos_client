import ErrorModal from '../../../../components/Modals/ErrorModal';
import { useEffect, useState } from 'react';
import useFetch from '../../../../utils/useFetch';
import Selector from '../../../../components/Forms/Selector';
import MultiSelector from '../../../../components/Forms/MultiSelector';
import Button from '../../../../components/Forms/Button';
import DateSelector from '../../../../components/Forms/DateSelector';
import RegionSelector from '../../../../components/Forms/RegionSelector';
import SearchInstStyle from './SearchInstStyle';
import useSearch from '../../useSearch';
import SearchLocation from './SearchLocation';


function SearchForm (){

    // const {fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError} = useFetch();


    return(
        <section className="searchForm__container">
            <h2>INSTRUMENTOS Y ESTILOS</h2>
            <form className="search__form">

                <SearchInstStyle/>

                <SearchLocation/>


                <Button style={{marginLeft: '10px' }}>CONFIRMAR BÚSQUEDA</Button>
                
            </form>
        </section>
    )
}

export default SearchForm;