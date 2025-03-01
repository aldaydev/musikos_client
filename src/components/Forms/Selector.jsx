import { useEffect, useState } from "react";
import useFetch from "../../utils/useFetch";
import down_icon from '../../assets/icons/down_icon.svg';

const Selector = ({ options, getSelection, title, id, value, onChange, modClass, divModClass, error, showPassImg, showPassFunc, ...props }) => {

    const [listVisible, setListVisible] = useState(false);
    const [selected, setSelected] = useState('C. Autónoma')

    const handleSelector = (e) => {
        setSelected(e.target.value);
    };

    const [selectedCircle, setSelectedCircle] = useState(false);

    useEffect(()=>{
        selected !== 'C. Autónoma' ? setSelectedCircle(true) : setSelectedCircle(false);
        getSelection(selected)
    },[selected])

    const { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError } = useFetch();

    useEffect(() => {
        fetchReq({
            endpoint: '/generic/regions',
            method: 'GET',
            item: 'regions'
        });
    }, []);

    return (
        <div className={divModClass ? `selectorContainer selectorContainer--${divModClass}` : 'selectorContainer'}>

            <label className="selector__title" onClick={() => setListVisible(() => listVisible ? false : true)}>
                <span
                    className="selectedCircle"
                    style={{ display: selectedCircle ? 'inline' : 'none' }}>
                </span>
                {selected}
                <img src={down_icon} className="selector__icon" />
            </label>

            <label className="options__container" htmlFor="region" style={{ height: listVisible ? "300px" : "0" }}>
                {fetchRes && fetchItem === 'regions' &&
                    fetchRes.map((option, i) => (
                        <label key={i} className="options__label">
                            <input type="radio" name='regions' onChange={handleSelector} value={option.name} className="options__input"/>
                            <span className="options__span">{option.name}</span>
                        </label>
                    ))

                }
            </label>

        </div>

    )
}

export default Selector;