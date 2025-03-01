import { useEffect, useState } from "react";
import down_icon from '../../assets/icons/down_icon.svg';

const MultiSelector = ({ options, getSelection, title, divModClass }) => {

    const [selected, setSelected] = useState([]);
    const [listVisible, setListVisible] = useState(false);
    const [selectedCount, setSelectedCount] = useState(null);

    const handleSelector = (e) => {
        const { value, checked } = e.target;
        setSelected(() =>
            checked ? [...selected, value] : selected.filter((item) => item !== value)
        );
    };

    const [selectedCircle, setSelectedCircle] = useState(false);

    useEffect(()=>{
        selected.length > 0 ? setSelectedCircle(true) : setSelectedCircle(false);
        setSelectedCount(selected.length);
        options && selected.length === options.length ? getSelection(null) : getSelection(selected);
    },[selected, options])

    return(
        <div className={divModClass ? `selectorContainer selectorContainer--${divModClass}` : 'selectorContainer'}>

            <label className="selector__title" onClick={()=>setListVisible(()=> listVisible ? false : true)}>
                <span 
                    className="selectedCircle"
                    style={{display: selectedCircle ? 'inline' : 'none'}}>
                        {selectedCount}
                </span>
                {title}
                <img src={down_icon} className="selector__icon"/>
            </label>

            <div 
                className="options__container" 
                style={{ height: listVisible ? "300px" : "0" }}
            >
                {options && options.map((option) => (
                <label key={option.id} className="options__label">
                        <input type="checkbox" value={option.name} onChange={handleSelector} className="options__input"/>
                        <span className="options__span">{option.name}</span>
                </label>
                ))}
                
            </div>
            
        </div>
        
    )
}

export default MultiSelector;