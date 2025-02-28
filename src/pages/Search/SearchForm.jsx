import ErrorModal from '../../components/Modals/ErrorModal';
import Input from '../../components/Forms/Input';
import Select from '../../components/Forms/Select';
import { useEffect } from 'react';
import useFetch from '../../utils/useFetch';


function SearchForm (){

    return(
        <section className="searchForm__container">
            <h2>FORMULARIO DE BÚSQUEDA</h2>
            <form className="search__form">
                <Select/>
            </form>
        </section>
    )
}

export default SearchForm;