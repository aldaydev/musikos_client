import { createPortal } from 'react-dom';
import ExitButton from './ExitButton';
import Button from '../Forms/Button';
import useFetch from '../../utils/useFetch';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const ErrorModal = ({error, setError}) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError } = useFetch();

    const handeResend = async (username) => {
        await fetchReq({
            endpoint: '/musicians/resend-confirmation',
            method: 'POST',
            body: {username},
            item: 'resend'
        });
    }

    const handleExit = () => {
        setError(null);
        setSearchParams({}, { replace: true })
    }

    useEffect(() => {
        if(fetchRes && error.link){
            setError({...error, link: null});
            setSearchParams({}, { replace: true })
        }
    }, [fetchRes, error, setError, searchParams, setSearchParams])

    return createPortal(
        <div className="modal__placement">
            <div className="error__position">
                <h3 className='error__title'>
                    {error.status && `Error (${error.status})`}
                    {error.title && error.title}
                </h3>
                <h4 className='error__text'>{error.message}</h4>
                <ExitButton exit={handleExit}/>
                {error.link && !fetchError &&
                    <div className='error_resendContainer'>
                        <Button onClick={()=>handeResend(error.username)}>REENVIAR EMAIL DE CONFIRMACIÓN</Button>
                    </div>
                }
                {fetchRes && 
                    <div className='success_resendContainer'>
                        <span className='succes_resendText'>EMAIL ENVIADO</span>
                    </div>
                    
                }
                {fetchError && 
                    <div className='success_resendContainer'>
                        <span className='succes_resendText'>HA HABIDO UN ERROR ({fetchError.status})</span>
                    </div>
                    
                }
            </div>
        </div>,
    document.body
    )
}

export default ErrorModal;