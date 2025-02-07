import { createPortal } from 'react-dom';

import close_icon from '../../assets/icons/close_icon.svg'

const ErrorModal = ({fetchError, setFetchError}) => {

    return createPortal(
        <div className="legal__dialog">
            <div className="legal__position">
                <h3>Error {fetchError.cause} ({fetchError.status})</h3>
                <h4>{fetchError.message}</h4>
                <img src={close_icon} alt="Cross icon" className="legal__exit" onClick={()=>setFetchError(null)}/>
            </div>
        </div>,
    document.body
    )
}

export default ErrorModal;