import { useEffect, useState } from "react";

const useSearch = () => {

    const [styles, setStyles] = useState();
    const [instruments, setInstruments] = useState();

    const [region, setRegion] = useState();
    const [province, setProvince] = useState();
    const [town, setTown] = useState();

    useEffect(()=>{
        console.log('ESTILOS', styles);
        console.log('INSTRUMENTOS', instruments);
    },[styles, instruments])

    useEffect(()=>{
        console.log('REGION', region);

    },[region, province, town])

    useEffect(()=>{
        setTown(['Ciudad', null]);

    },[region])


    return {setStyles, setInstruments, region, setRegion, setProvince, setTown};
}

export default useSearch;