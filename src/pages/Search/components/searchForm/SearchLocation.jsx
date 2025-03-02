
import { useEffect, useState } from 'react';
import useFetch from '../../../../utils/useFetch';
import Selector from '../../../../components/Forms/Selector';
import useSearch from '../../useSearch';


function SearchLocation (){

    const [allRegions, setAllRegions] = useState(()=>{
        sessionStorage.regions ? JSON.parse(sessionStorage.regions) : null;
    })

    const {fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError} = useFetch();
    const {region, setRegion, setProvince, setTown} = useSearch();


    useEffect(()=>{
        if(!sessionStorage.regions){
            fetchReq({
                endpoint: '/generic/provinces',
                method: 'GET',
                item: 'allRegions'
            });
        }
    }, []);

    useEffect(()=>{
        if(fetchRes && fetchItem === 'allRegions'){
            sessionStorage.regions = JSON.stringify(fetchRes);
            setAllRegions(JSON.parse(sessionStorage.regions));
        }
    }, [fetchRes]);

    useEffect(()=>{
        sessionStorage.regions &&
        setAllRegions(JSON.parse(sessionStorage.regions));
    },[sessionStorage]);

    useEffect(()=>{
        console.log('REGION', region)
        if(!sessionStorage.lastProvinces && region){
            fetchReq({
                endpoint: `/generic/towns?code=${region[1]}`,
                method: 'GET',
                item: 'provincesByRegion'
            });
        }
    },[region])


    return(
        <article className="searchForm__container">
            <h2>LOCALIZACIÓN</h2>

                <Selector 
                    options={allRegions && allRegions}
                    setSelection={setRegion} 
                    title='Comunidad Autónoma'
                />

                <Selector
                    options={fetchRes && fetchRes}
                    setSelection={setProvince} 
                    title='Provincia'
                />
                
        </article>
    )
}

export default SearchLocation;