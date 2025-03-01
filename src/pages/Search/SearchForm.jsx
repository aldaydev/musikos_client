import ErrorModal from '../../components/Modals/ErrorModal';
import { useEffect, useState } from 'react';
import useFetch from '../../utils/useFetch';
import Selector from '../../components/Forms/Selector';
import MultiSelector from '../../components/Forms/MultiSelector';
import Button from '../../components/Forms/Button';


function SearchForm (){

    const {fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError} = useFetch();

    const [searchForm, setSearchForm] = useState({
        styles: null,
        instruments: null
    });

    const [instrumentSelection, setInstrumentSelection] = useState(null);
    const [styleSelection, setStyleSelection] = useState(null);
    const [regionSelection, setRegionSelection] = useState(null);

    const handleChange = (e) =>{
        console.log('ETAGET', e.target)
        // const { id, value} = e.target;

        // setSearchForm(()=>{
        //     return {...searchForm, [id] : value}
        // })
    };

    useEffect(()=>{
        console.log(instrumentSelection);
        setSearchForm({...searchForm, instruments: instrumentSelection})
    },[instrumentSelection]);

    useEffect(()=>{
        console.log(styleSelection);
        setSearchForm({...searchForm, styles: styleSelection})
    },[styleSelection]);

    useEffect(()=>{
        setSearchForm({...searchForm, region: regionSelection})
    },[regionSelection]);

    useEffect(()=>{
        console.log(searchForm);
        if(regionSelection){
            console.log('Ha elegido una región');
        }
    },[searchForm]);

    useEffect(()=>{
        fetchReq({
            endpoint: '/generic/instruments-and-styles',
            method: 'GET',
            item: 'instrumentsAndStyles'
        });
    }, []);

    return(
        <section className="searchForm__container">
            <h2>FORMULARIO DE BÚSQUEDA</h2>
            <form className="search__form">
                <MultiSelector
                    options={fetchRes && fetchRes.instruments}
                    onChange={handleChange}
                    getSelection={setInstrumentSelection}
                    title='Buscar por instrumento'
                />
                <MultiSelector
                    options={fetchRes && fetchRes.styles}
                    onChange={handleChange}
                    getSelection={setStyleSelection}
                    title='Buscar por estilo'
                />

                <Selector getSelection={setRegionSelection}/>

                <Button style={{marginLeft: '10px' }}>CONFIRMAR BÚSQUEDA</Button>
                
            </form>
        </section>
    )
}

export default SearchForm;