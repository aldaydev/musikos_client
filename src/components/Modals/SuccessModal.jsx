import { createPortal } from 'react-dom';
import ExitButton from './ExitButton';

const SuccessModal = ({success, setSuccess}) => {

    const handleExit = () => {
        setSuccess(null);
    }

    return createPortal(
        <div className="modal__placement">
            
            <div className="success__position">
                <h3 className='success__title'>{success.title}</h3>
                <h4 className='success__text'>{success.message}</h4>
                <ExitButton exit={handleExit}/>
            </div>
            
        </div>,
    document.body
    )
}

export default SuccessModal;