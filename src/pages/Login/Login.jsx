import './login.css';
import { useSearchParams } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { useEffect, useState } from 'react';
import ErrorModal from '../../components/Modals/ErrorModal';
import SuccessModal from '../../components/Modals/SuccessModal';


function Login (){

    const [searchParams] = useSearchParams();
    const [confirmationError, setConfirmationError] = useState(null);
    const [confirmationSuccess, setConfirmationSuccess] = useState(null);

    useEffect(()=>{
        const params = Object.fromEntries(searchParams.entries());
        if(params.error === 'expired'){
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
    },[searchParams]);

    return(
            <div className="login__container">
                <h1 className='main__title'>
                    ZONA DE ACCESO
                </h1>
                <section className='login__sign'>
                    <SignIn/>
                    <span className='signDivider'></span>
                    <SignUp/>
                </section>

                {confirmationError && 
                    <ErrorModal 
                        error={confirmationError} 
                        setError={setConfirmationError}
                    />
                }

                {confirmationSuccess && 
                    <SuccessModal 
                        success={confirmationSuccess} 
                        setSuccess={setConfirmationSuccess}
                    />}
                
            </div>
    )
}

export default Login;