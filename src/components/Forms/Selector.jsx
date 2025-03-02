import { useEffect, useState } from "react";
import useFetch from "../../utils/useFetch";
import down_icon from '../../assets/icons/down_icon.svg';

const Selector = ({ options, setSelection, title, required = false, setExtraData, id, value, onChange, modClass, divModClass, error, showPassImg, showPassFunc, ...props }) => {

    const [listVisible, setListVisible] = useState(false);
    const [selected, setSelected] = useState([title, null]);

    const handleSelector = (e) => {
        setSelected([e.target.value, e.target.id]);
    };

    const [selectedCircle, setSelectedCircle] = useState(false);

    useEffect(()=>{
        selected[0] !== title ? setSelectedCircle(true) : setSelectedCircle(false);

        if(selected[0] !== title && selected[0] !== 'Cualquiera'){
            setSelection(selected);
        }else{
            setSelection(null);
        }
        
    },[selected]);

    return (
        <div className={divModClass ? `selectorContainer selectorContainer--${divModClass}` : 'selectorContainer'}>

            <label className="selector__title" onClick={() => setListVisible(() => listVisible ? false : true)}>
                <span
                    className="selectedCircle"
                    style={{ display: selectedCircle ? 'inline' : 'none' }}>
                </span>
                {selected[0]}
                <img src={down_icon} className="selector__icon" />
            </label>

            <label className="options__container" htmlFor="region" style={{ height: listVisible ? "300px" : "0" }}>
                { !required && 
                    <label>
                        <input type="radio" name='regions' onChange={handleSelector} value={title} className="options__input"/>
                        <span className="options__span">{`Cualquiera`}</span>
                    </label>
                }
                    
                {options &&
                    options.map((option, i) => (
                        
                        <label key={i} className="options__label">
                            <input type="radio" name='regions' onChange={handleSelector} value={option.name} className="options__input" id={option.code}/>
                            <span className="options__span">{option.name}</span>
                        </label>
                    ))

                }
            </label>

        </div>

    )
}

export default Selector;