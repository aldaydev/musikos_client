import './spinner.css';
import spinner from '../../assets/spinners/bars_spinner.svg'

const Spinner = ({modClass}) => {

    let className = !modClass
        ? `spinner`
        : `spinner spinner--${modClass}`

    return(
        <img src={spinner} alt="Loaging spinner" className={className} />
    )
}

export default Spinner;