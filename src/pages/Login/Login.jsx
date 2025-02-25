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
            console.log('PARAMS', params);
            if(params.error){
                const username = params.username || null;
                const paramError = setErrorMessage(params.type, params.error, username);
                setParamsError(paramError);
            }else if(params.success){
                console.log('AQUÍ', params)
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
                        link:true,
                        username: params.username
                    });
                }
            } 
        }
    }, [isLoggedIn, searchParams, navigate]);

    return(
        <div className="login__container">
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
        </div>
    )
}

export default Login;