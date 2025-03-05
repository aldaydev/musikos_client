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
    const { allAges, allProvinces, currentTowns, setCurrentTowns, allStyles, allInstruments, setFinalList, searchError, setSearchError } = UseSearchContext();

    //UseFetch Initialization
    const { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError} = useFetch();


    const [ageError, setAgeError] = useState(null);
    const [minAgeTitle, setMinAgeTitle] = useState('Desde');

    // useEffect(() => {
    //     (minAge && maxAge) && minAge > maxAges
    //         ? setError('Búsqueda no válida')
    //         : setError(null);
    // }, [minAge, maxAge])

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(minAge, maxAge);
        if(minAge > maxAge){
            setAgeError('Edades incorrectas');
            return setSearchError('La edad mínima no puede ser mayor que la edad máxima');
        }else{
            setAgeError(null);
            setSearchError(null);
            fetchReq({
                endpoint: `/musicians/filter?${finalQuery}`,
                method: 'GET',
                item: 'filterMusicians'
            });
        }
    }

    useEffect(() => {

        if((minAge && maxAge) && minAge > maxAge){
            setAgeError('La edad mínima no puede ser mayor que la máxima')
        }
            // ? setMinAge(maxAge)
            // : setMaxAge(maxAge)

        // (minAge && maxAge) && minAge > maxAge
        //     ? setMinAge(maxAge)
        //     : setMaxAge(maxAge)
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
            <h2 className='searchForm__title'>FILTRAR BÚSQUEDA</h2>
            <form className="searchForm__form">

                <article>
                    <h4>INSTRUMENTOS Y ESTILOS</h4>
                    <MultiSelector
                        options={allInstruments && allInstruments}
                        setSelection={setInstruments}
                        title='Instrumentos'
                    />
                    <MultiSelector
                        options={allStyles && allStyles}
                        setSelection={setStyles}
                        title='Estilos'
                    />
                </article>
                <article>
                    <h4>LOCALIZACIÓN</h4>

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
                <article>
                    <h4>EDAD</h4>

                    <AgeSelector
                        options={allAges && allAges}
                        setSelection={setMinAge}
                        title={minAgeTitle}
                    />

                    <AgeSelector
                        options={allAges && allAges}
                        setSelection={setMaxAge}
                        title='Hasta'
                    />

                    {ageError && <div>{ageError}</div>}

                </article>
                <article>
                    <h4>NOMBRE</h4>
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
                </article>
                

                <Button onClick={handleSearch}>CONFIRMAR BÚSQUEDA</Button>

            </form>
        </section>
    )
}

export default SearchForm;