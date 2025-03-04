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
import SearchAge from './SearchAge';
import Input from '../../../../components/Forms/Input';
import { UseSearchContext } from '../../../../context/SearchContext';
import AgeSelector from '../../../../components/Forms/AgeSelector';


function SearchForm() {

    const { minAge, setMinAge, maxAge, setMaxAge, setStyles, setInstruments, province, setProvince, setTown, name, setName, finalQuery } = useSearch();
    const { allAges, allProvinces, currentTowns, setCurrentTowns, allStyles, allInstruments, setFinalList } = UseSearchContext();

    //UseFetch Initialization
    const { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError} = useFetch();


    const [error, setError] = useState(null);

    // useEffect(() => {
    //     (minAge && maxAge) && minAge > maxAge
    //         ? setError('Búsqueda no válida')
    //         : setError(null);
    // }, [minAge, maxAge])

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(finalQuery);
        fetchReq({
            endpoint: `/musicians/filter?${finalQuery}`,
            method: 'GET',
            item: 'filterMusicians'
        });
        console.log('Ha hecho fetch');
    }

    useEffect(() => {
        (minAge && maxAge) && minAge > maxAge
            ? setMinAge(maxAge)
            : setMaxAge(maxAge)
    }, [minAge, maxAge])

    useEffect(()=>{
        if(province && province.length > 0 && province[1]){
            fetchReq({
                endpoint: `/generic/towns?code=${province[1]}`,
                method: 'GET',
                item: 'townsByProvince'
            });
        }
    },[province]);


    useEffect(() => {
        if (fetchRes && fetchItem === 'townsByProvince') {
            setCurrentTowns(fetchRes);
        }

        if (fetchRes && fetchItem === 'filterMusicians') {
            setFinalList(fetchRes);
            // sessionStorage.lastSearch = JSON.stringify(fetchRes);
        }
    }, [fetchRes])

    return (
        <section className="searchForm__container">
            <h2>INSTRUMENTOS Y ESTILOS</h2>
            <form className="search__form">

                <article>
                    <MultiSelector
                        options={allInstruments && allInstruments}
                        setSelection={setInstruments}
                        title='Buscar por instrumento'
                    />
                    <MultiSelector
                        options={allStyles && allStyles}
                        setSelection={setStyles}
                        title='Buscar por estilo'
                    />
                </article>
                <article className="searchForm__container">
                    <h2>LOCALIZACIÓN</h2>

                    <Selector
                        options={allProvinces && allProvinces}
                        setSelection={setProvince}
                        title='Provincia'
                    />

                    {province && currentTowns &&
                    <Selector
                        options={currentTowns && currentTowns}
                        setSelection={setTown} 
                        title='Población'
                    />
                }

                </article>
                <article className="searchForm__container">
                    <h2>EDAD</h2>

                    <AgeSelector
                        options={allAges && allAges}
                        setSelection={setMinAge}
                        title='Desde'
                    />

                    <AgeSelector
                        options={allAges && allAges}
                        setSelection={setMaxAge}
                        title='Hasta'
                    />

                    {error && <div>{error}</div>}

                </article>
                <Input
                    name='email'
                    id='email'
                    value={name}
                    placeholder='Busca por nombre'
                    onChange={(e) => setName(e.target.value)}
                    modClass='searchByName'
                    divModClass='searchByName'
                // error={emailError}
                // modClass={emailError && 'error'}
                />

                <Button onClick={handleSearch}>CONFIRMAR BÚSQUEDA</Button>

            </form>
        </section>
    )
}

export default SearchForm;