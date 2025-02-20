import { createPortal } from 'react-dom';
import ExitButton from './ExitButton';
import { useSearchParams } from 'react-router-dom';

const SuccessModal = ({success, setSuccess}) => {
    
    const [searchParams, setSearchParams] = useSearchParams();

    const handleExit = () => {
        setSuccess(null);
        setSearchParams({}, { replace: true })
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