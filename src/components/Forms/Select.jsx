import { useEffect } from "react";
import useFetch from "../../utils/useFetch";

const Select = ({ type = 'text', modClass, divModClass, error, showPassImg, showPassFunc, ...props }) => {

    const {fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError} = useFetch();

    const initialClass = `${type}Input`;
    
    let inputContainer = 'inputContainer';
    if(divModClass){
        inputContainer = `inputContainer inputContainer--${divModClass}`;
    }

    useEffect(()=>{
        fetchReq({
            endpoint: '/generic/get-instruments',
            method: 'GET',
            item: 'getInstruments'
        });
    }, []);

    return(
        <div className={inputContainer}>
            <select>
                {fetchRes && fetchItem === 'getInstruments' && fetchRes.instruments.map((instrument) => {
                    <option>{instrument}</option>
                })}
                <option>Hola</option>
            </select>
        </div>
        
    )
}

export default Select;