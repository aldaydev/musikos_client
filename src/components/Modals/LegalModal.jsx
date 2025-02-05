import { createPortal } from 'react-dom';

import close_icon from '../../assets/icons/close_icon.svg'
import Button from '../Forms/Button';
import Loading from '../Loading';

const LegalModal = ({fetchRes, setFetchItem, acceptLegals, isLoading}) => {

    return createPortal(
        // isLoading ?
        // <Loading/>
        // :
        <div className="legal__dialog">
            <div className="legal__position">
                <div dangerouslySetInnerHTML={{ __html: fetchRes.html }}/>
                <img src={close_icon} alt="Cross icon" className="legal__exit" onClick={()=>setFetchItem(null)}/>
                <Button color='pink' modClass='legal' onClick={acceptLegals}>
                    ACEPTAR Y VOLVER
                </Button>
            </div>
        </div>,
    document.body
    )
}

export default LegalModal;