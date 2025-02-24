import { createPortal } from 'react-dom';
import ExitButton from './ExitButton';
import Button from '../Forms/Button';
import useFetch from '../../utils/useFetch';
import { useEffect } from 'react';
import Spinner from '../spinners/Spinner';

const ConfirmationErrorModal = ({confirmationError, setConfirmationError}) => {

    const { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError } = useFetch();

    const [errorData, setErrorData] = useEffect(null);

    const handleResend = async (username) => {
        await fetchReq({
            endpoint: '/auth/resend-confirmation',
            method: 'POST',
            body: {username},
            item: 'resend'
        });
    }

    const handleExit = () => {
        setError(null);
    }

    useEffect(()=>{
            if(confirmationError === 'expired'){
                setConfirmationError({
                    title: 'Enlace caducado',
                    message: 'El enlace de confirmación ha caducado. Si necesitas que te mandemos un nuevo email de confirmación pulsa en el siguiente enlace: ',
                    username: params.username,
                    link: true
                });
            }else if(params.error === 'already-updated'){
                setConfirmationError({
                    title: 'Ya confirmado',
                    message: 'Ya confirmaste tu cuenta anteriormente. Puedes acceder con tus datos en el apartado "ACCEDE A TU CUENTA" en esta misma página.'
                });
            }else if(params.error === 'incorrect'){
                setConfirmationError({
                    title: 'Enlace incorrecto',
                    message: 'En enlace de confirmación ha sido maniplado o es incorrecto. Si necesitas que te mandemos un nuevo email de confirmación pulsa en el siguiente enlace: ',
                    username: params.username,
                    link: true
                });
            }else if(params.error === 'external' || params.error === 'unexpected'){
                setConfirmationError({
                    title: 'Error interno',
                    message: 'Ha habido un problema interno a la hora de confirmar tu cuenta. Por favor, prueba dentro de unos minutos o solicita un nuevo email de confirmación en el siguiente enlace: ',
                    username: params.username,
                    link: true
                });
            }else if(params.confirmation){
                setConfirmationSuccess({
                    title: '¡Tu cuenta ha sido confirmada con éxito!',
                    message: 'Ya puedes acceder desde la sección "ACCEDE A TU CUENTA" en esta misma página.'
                });
            }
        }
        
    },[searchParams, isLoggedIn, navigate]);


    useEffect(() => {
        if(fetchRes && error.link){
            setError({...error, link: null});
        }
    }, [fetchRes, error, setError])

    return createPortal(
        <div className="modal__placement">
            <div className="error__position">
                <h3 className='error__title'>
                    {error.status && `Error (${error.status})`}
                    {error.title && error.title}
                </h3>
                <h4 className='error__text'>{error.message}</h4>
                <ExitButton exit={handleExit}/>

                {error.link && !fetchError && !fetchRes &&
                    <div className='error__buttonContainer'>
                        {isLoading ? <Spinner modClass='little'/>
                        :
                        <Button onClick={()=>handleResend(error.username)}>REENVIAR EMAIL DE CONFIRMACIÓN</Button>
                        }
                    </div>}

                {fetchRes && 
                    <div className='error__resContainer'>
                        <span className='error__resendText'>{fetchRes.message}</span>
                    </div>
                    
                }

                {fetchError && 
                    <div className='error__resContainer'>
                        <span className='error__resendText'>
                            {fetchError.status === 400 ? 
                                'USUARIO INEXISTENTE O YA CONFIRMADO'
                                :
                                `HA HABIDO UN ERROR (${fetchError.status})`
                            }
                        </span>
                    </div>
                }
            </div>
        </div>,
    document.body
    )
}

export default ConfirmationErrorModal;