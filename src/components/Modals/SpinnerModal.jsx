import { createPortal } from 'react-dom';
import Spinner from '../spinners/Spinner';

const SpinnerModal = () => {

    return createPortal(
        <div className="modal__placement modal_placement--spinner">
            <div className="spinner__position">
                <Spinner/>
            </div>
            
        </div>,
    document.body
    )
}

export default SpinnerModal;