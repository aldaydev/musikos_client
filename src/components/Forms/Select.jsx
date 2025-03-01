import { useEffect } from "react";
import useFetch from "../../utils/useFetch";

const Select = ({ options, type, id, value, onChange, modClass, divModClass, error, showPassImg, showPassFunc, ...props }) => {

    return(
        <div className={divModClass ? `selectContainer selectContainer--${divModClass}` : 'selectContainer'}>

            <select 
                id={id} 
                name={id} 
                className="select"
                onChange={onChange}
                value={value}
            >
                <option value={null} className="option">
                    {type}
                </option>
                {options && options.map((option) => (
                    <option key={option.id} value={option.name}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
        
    )
}

export default Select;