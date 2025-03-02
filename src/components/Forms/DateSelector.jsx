import { useEffect, useState } from "react";
import useFetch from "../../utils/useFetch";
import Selector from "./Selector";

const DateSelector = ({ options, type, id, value, onChange, modClass, divModClass, error, showPassImg, showPassFunc, ...props }) => {

    const [years, setYears] = useState([]);

    const[yearSelector, setYearSelector] = useState();

    const handleAge = () => {
        const maxYear = new Date().getFullYear() - 10;
    }

    useEffect(()=>{
        const currentYear = new Date(). getFullYear();
        const maxYear = new Date().getFullYear() - 14;
        const minYear = new Date().getFullYear() - 100;
        const minAge = currentYear - maxYear;

        const allYears = [];

        for (let i = maxYear; i > minYear; i --){
            allYears.push(i);
        }

        setYears(allYears);

        console.log('maxYear', maxYear);
        console.log('minAge', minAge);
    }, [])


    return(
        <div className={divModClass ? `dateSelectorContainer dateSelectorContainer--${divModClass}` : 'dateSelectorContainer'}>

            <Selector getSelection={setYearSelector} title='Año'/>

        </div>
        
    )
}

export default DateSelector;