import Selector from '../../../../components/Forms/Selector';
import useFetch from '../../../utils/useFetch';
import useSearch from '../../useSearch';

function SearchLocation (){

    const {allProvinces, currentTowns, province, setProvince, setTown} = useSearch();

    // const { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError } = useFetch();

    // useEffect(()=>{
    //     console.log('REGION', region)
    //     if(province && province.length > 0 && province[1]){
    //         fetchReq({
    //             endpoint: `/generic/towns?code=${province[1]}`,
    //             method: 'GET',
    //             item: 'provincesByRegion'
    //         });
    //     }
    // },[province])

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