import { useEffect } from 'react';
import Selector from '../../../../components/Forms/Selector';
import { UseSearchContext } from '../../../../context/SearchContext';
import useSearch from '../../useSearch';
import useFetch from '../../../../utils/useFetch';

function SearchLocation (){

    const {province, setProvince, setTown} = useSearch();
    const {allProvinces, currentTowns, setCurrentTowns} = UseSearchContext();

    //UseFetch Initialization
    const { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError } = useFetch();

    // useEffect(()=>{
    //     if(province && province.length > 0 && province[1]){
    //         fetchReq({
    //             endpoint: `/generic/towns?code=${province[1]}`,
    //             method: 'GET',
    //             item: 'townsByProvince'
    //         });
    //     }
    // },[province]);


    useEffect(()=>{
        if(fetchRes && fetchItem ==='townsByProvince'){
            setCurrentTowns(fetchRes);
        }
    },[fetchRes])

    return(
        <article className="searchForm__container">
            <h2>LOCALIZACIÓN</h2>

                <Selector 
                    options={allProvinces && allProvinces}
                    setSelection={setProvince} 
                    title='Provincia'
                />

                {/* {province && currentTowns &&
                    <Selector
                        options={currentTowns && currentTowns}
                        setSelection={setTown} 
                        title='Población'
                    />
                } */}

        </article>
    )
}

export default SearchLocation;