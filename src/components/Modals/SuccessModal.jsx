import { createPortal } from 'react-dom';

import close_icon from '../../assets/icons/close_icon.svg'
import { useEffect, useState } from 'react';

const SuccessModal = ({type, fetchRes, setFetchItem}) => {

    // const [title, setTitle] = useState('');

    // useEffect(()=>{
    //     switch (type){
    //         case 'signup':
    //             setTitle('¡CONFIRMA TU CUENTA!');
    //             break;
    //         default:
    //     }
    // },[type])
    

    return createPortal(
        <div className="legal__dialog">
            <div className="legal__position">
                <h3>{fetchRes.title}</h3>
                <h4>{fetchRes.message}</h4>
                <img src={close_icon} alt="Cross icon" className="legal__exit" onClick={()=>setFetchItem(null)}/>
            </div>
        </div>,
    document.body
    )
}

export default SuccessModal;