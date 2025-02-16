import { createPortal } from 'react-dom';

import ExitButton from './ExitButton';

const SuccessModal = ({fetchRes, setFetchItem}) => {
    
    return createPortal(
        <div className="modal__placement">
            <div className="success__position">
                <h3 className='success__title'>{fetchRes.title}</h3>
                <h4 className='success__text'>{fetchRes.message}</h4>
                <ExitButton exit={()=>setFetchItem(null)}/>
            </div>
        </div>,
    document.body
    )
}

export default SuccessModal;