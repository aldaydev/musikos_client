import { useEffect, useState } from "react";
import useFetch from "../../utils/useFetch";
import down_icon from '../../assets/icons/down_icon.svg';

const AgeSelector = ({ options, setSelection, title, required = false, setExtraData, id, value, onChange, modClass, divModClass, error, showPassImg, showPassFunc, ...props }) => {

    const [listVisible, setListVisible] = useState(false);
    const [selected, setSelected] = useState(title);

    const handleSelector = (e) => {
        setSelected(e.target.value);
    };

    const [selectedCircle, setSelectedCircle] = useState(false);

    useEffect(()=>{
        selected !== title ? setSelectedCircle(true) : setSelectedCircle(false);

        if(selected !== title && selected !== 'Cualquiera'){
            setSelection(selected);
        }else{
            setSelection(null);
        }
        
    },[selected]);

    useEffect(()=>{
        setSelected(title);
        setListVisible(false);
    }, [options])

    return (
        <div className={divModClass ? `selectorContainer selectorContainer--${divModClass}` : 'selectorContainer'}>

            <label className="selector__title" onClick={() => setListVisible(() => listVisible ? false : true)}>
                <span
                    className="selectedCircle"
                    style={{ display: selectedCircle ? 'inline' : 'none' }}>
                </span>
                {selected !== title 
                    ? `${title}: ${selected}`
                    : title
                }
                <img src={down_icon} className="selector__icon" />
            </label>

            <label className="options__container" htmlFor="options" style={{ height: listVisible ? "300px" : "0" }}>
                { !required && 
                    <label>
                        <input type="radio" name='options' onChange={handleSelector} value={title} className="options__input"/>
                        <span className="options__span">{`Cualquiera`}</span>
                    </label>
                }
                    
                {options &&
                    options.map((option, i) => (
                        
                        <label key={i} className="options__label">
                            <input type="radio" name='options' onChange={handleSelector} value={option} className="options__input" id={i}/>
                            <span className="options__span">{option}</span>
                        </label>
                    ))

                }
            </label>

        </div>

    )
}

export default AgeSelector;