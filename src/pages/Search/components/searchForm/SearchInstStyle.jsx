import { useEffect, useState } from "react";
import useFetch from "../../../../utils/useFetch";
import MultiSelector from "../../../../components/Forms/MultiSelector";
import useSearch from "../../useSearch";

const SearchInstStyle = () => {

    const [allStyles, setAllStyles] = useState(()=>{
        sessionStorage.styles ? JSON.parse(sessionStorage.styles) : null
    })

    const [allInstruments, setAllInstruments] = useState(()=>{
        sessionStorage.instruments ? JSON.parse(sessionStorage.instruments) : null
    })

    const {fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError} = useFetch();

    const {styles, setStyles, instruments, setInstruments} = useSearch();

    useEffect(()=>{
        if(!sessionStorage.instruments || !sessionStorage.styles){
            console.log('HACE EL FETCH DE ESTILOS INTRSTRUMENTOS')
            fetchReq({
                endpoint: '/generic/instruments-and-styles',
                method: 'GET',
                item: 'instrumentsAndStyles'
            });
        }else{
            console.log('NO HACE EL FETCH DE ESTILOS INTRSTRUMENTOS')
        }
    }, []);

    useEffect(()=>{
        if(fetchRes && fetchItem === 'instrumentsAndStyles'){
            sessionStorage.styles = JSON.stringify(fetchRes.styles);
            sessionStorage.instruments = JSON.stringify(fetchRes.instruments);
            setAllStyles(fetchRes.styles);
            setAllInstruments(fetchRes.styles);
        }
    }, [fetchRes])

    useEffect(()=>{
        sessionStorage.styles &&
        setAllStyles(JSON.parse(sessionStorage.styles));

        sessionStorage.instruments &&
        setAllInstruments(JSON.parse(sessionStorage.instruments));
    },[sessionStorage]);


    return(
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
    )
}

export default SearchInstStyle;