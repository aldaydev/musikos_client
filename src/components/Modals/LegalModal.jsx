import './modals.css';

import { createPortal } from 'react-dom';

// import close_icon from '../../assets/icons/close_icon.svg'
import Button from '../Forms/Button';
import ExitButton from './ExitButton';

const LegalModal = ({fetchRes, setFetchItem, acceptLegals}) => {

    return createPortal(
        
        <div className="modal__placement">
            <div className="legal__position">
                <div dangerouslySetInnerHTML={{ __html: fetchRes.html }}/>
                <ExitButton exit={()=>setFetchItem(null)}/>
                <Button color='pink' modClass='legal' onClick={acceptLegals}>
                    ACEPTAR Y VOLVER
                </Button>
            </div>
        </div>,
    document.body
    )
}

export default LegalModal;