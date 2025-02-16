import { createPortal } from 'react-dom';

// import close_icon from '../../assets/icons/close_icon.svg'
import ExitButton from './ExitButton';

const ErrorModal = ({fetchError, setFetchError}) => {

    return createPortal(
        <div className="modal__placement">
            <div className="error__position">
                <h3 className='error__title'>Error ({fetchError.status})</h3>
                <h4 className='success__text'>{fetchError.message}</h4>
                <ExitButton exit={()=>setFetchError(null)}/>
            </div>
        </div>,
    document.body
    )
}

export default ErrorModal;