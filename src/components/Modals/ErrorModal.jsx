import { createPortal } from 'react-dom';
import ExitButton from './ExitButton';
import Button from '../Forms/Button';
import useFetch from '../../utils/useFetch';
import { useEffect } from 'react';
import Spinner from '../spinners/Spinner';

const ErrorModal = ({error, setError}) => {

    const { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError } = useFetch();

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
                    </div>
                }

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

export default ErrorModal;