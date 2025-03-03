import { useEffect, useState } from 'react';
import useSearch from '../../useSearch';
import AgeSelector from '../../../../components/Forms/AgeSelector';
import { UseSearchContext } from '../../../../context/SearchContext';

function SearchAge (){

    const {minAge, setMinAge, maxAge, setMaxAge} = useSearch();
    const {allAges} = UseSearchContext();

    const [error, setError] = useState(null);

    useEffect(()=>{
        (minAge && maxAge) && minAge > maxAge 
            ? setError('Búsqueda no válida')
            : setError(null);
    },[minAge, maxAge])

    return(
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
    )
}

export default SearchAge;