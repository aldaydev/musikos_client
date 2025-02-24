import './login.css';
import { useNavigate, useSearchParams } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { useContext, useEffect, useState } from 'react';
import ErrorModal from '../../components/Modals/ErrorModal';
import SuccessModal from '../../components/Modals/SuccessModal';
import { AuthContext } from '../../context/AuthContext';
import setErrorMessage from '../../utils/errorMessages';
import RecoverPassModal from '../../components/Modals/RecoverPassModal';


function Login (){

    const navigate = useNavigate();

    const { isLoggedIn } = useContext(AuthContext);

    const [searchParams, setSearchParams] = useSearchParams();
    const [confirmationError, setConfirmationError] = useState(null);
    const [confirmationSuccess, setConfirmationSuccess] = useState(null);
    const [paramsError, setParamsError] = useState(null);
    const [paramsSuccess, setParamsSucces] = useState(null);
    const [newPassModal, setNewPassModal] = useState(null);


    useEffect(()=>{
        if(searchParams && !isLoggedIn){
            const params = Object.fromEntries(searchParams.entries());
            setSearchParams({}, { replace: true });
            console.log(params);
            if(params.error){
                const username = params.username || null;
                const paramError = setErrorMessage(params.type, params.error, username);
                setParamsError(paramError);
            }else{
                if(params.success && params.type === 'confirmation'){
                    setParamsSucces({
                        title: '¡Tu cuenta ha sido confirmada con éxito!',
                        message: 'Ya puedes acceder desde la sección "ACCEDE A TU CUENTA" en esta misma página.'
                    })
                }else if(params.success && params.type === 'recoverPassword'){
                    setNewPassModal({
                        title: 'Recuperación de contraseña',
                        message: `Escribe tu nueva contraseña para ${params.username}`,
                        password: true,
                        link:true
                    });
                }
            } 
        }
    }, [isLoggedIn, searchParams, navigate])

    // useEffect(()=>{
        
    //     // if(isLoggedIn){
    //     //     navigate('/dashboard');
    //     //     window.location.reload();
    //     // }

    //     if(searchParams && !isLoggedIn){
    //         const params = Object.fromEntries(searchParams.entries());
    //         setSearchParams({}, { replace: true });
    //         if(params.error === 'expired'){
    //             setConfirmationError({
    //                 title: 'Enlace caducado',
    //                 message: 'El enlace de confirmación ha caducado. Si necesitas que te mandemos un nuevo email de confirmación pulsa en el siguiente enlace: ',
    //                 username: params.username,
    //                 link: true
    //             });
    //         }else if(params.error === 'already-confirmed'){
    //             setConfirmationError({
    //                 title: 'Ya confirmado',
    //                 message: 'Ya confirmaste tu cuenta anteriormente. Puedes acceder con tus datos en el apartado "ACCEDE A TU CUENTA" en esta misma página.'
    //             });
    //         }else if(params.error === 'incorrect'){
    //             setConfirmationError({
    //                 title: 'Enlace incorrecto',
    //                 message: 'En enlace de confirmación ha sido maniplado o es incorrecto. Si necesitas que te mandemos un nuevo email de confirmación pulsa en el siguiente enlace: ',
    //                 username: params.username,
    //                 link: true
    //             });
    //         }else if(params.error === 'external' || params.error === 'unexpected'){
    //             setConfirmationError({
    //                 title: 'Error interno',
    //                 message: 'Ha habido un problema interno a la hora de confirmar tu cuenta. Por favor, prueba dentro de unos minutos o solicita un nuevo email de confirmación en el siguiente enlace: ',
    //                 username: params.username,
    //                 link: true
    //             });
    //         }else if(params.success){
    //             setConfirmationSuccess({
    //                 title: '¡Tu cuenta ha sido confirmada con éxito!',
    //                 message: 'Ya puedes acceder desde la sección "ACCEDE A TU CUENTA" en esta misma página.'
    //             });
    //         }
    //     }
        
    // },[searchParams, isLoggedIn, navigate]);

    return(
        <div className="login__container">
            {!sessionStorage.auth || !JSON.parse(sessionStorage.auth).verified &&
                <>
                    <h1 className='main__title'>
                        ZONA DE ACCESO
                    </h1>
                    <section className='login__sign'>
                        <SignIn />
                        <span className='signDivider'></span>
                        <SignUp />
                    </section>

                    {paramsError &&
                        <ErrorModal
                            error={paramsError}
                            setError={setParamsError}
                        />
                    }

                    {paramsSuccess &&
                        <SuccessModal
                            success={paramsSuccess}
                            setSuccess={setParamsSucces}
                        />}
                    
                    {newPassModal && newPassModal.password &&
                        <RecoverPassModal
                            recoverPass={newPassModal}
                            setRecoverPass={setNewPassModal}
                        />
                    }
                </>
            }


        </div>
    )
}

export default Login;