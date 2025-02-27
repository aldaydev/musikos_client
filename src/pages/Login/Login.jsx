//Style imports
import './login.css';
//React imports
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
//Context imports
import { AuthContext } from '../../context/AuthContext';
//Component imports
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ErrorModal from '../../components/Modals/ErrorModal';
import SuccessModal from '../../components/Modals/SuccessModal';
import RecoverPassModal from '../../components/Modals/RecoverPassModal';
//Uitls imports
import {setErrorMessage, setSuccesMessage} from '../../utils/customMessages';


function Login (){

    const navigate = useNavigate();

    const { isLoggedIn } = useContext(AuthContext);

    const [searchParams, setSearchParams] = useSearchParams();
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
                    const modalData = setSuccesMessage(params.type, params.username);
                    setParamsSucces(modalData);
                    // setParamsSucces({
                    //     title: '¡Tu cuenta ha sido confirmada con éxito!',
                    //     message: 'Ya puedes acceder desde la sección "ACCEDE A TU CUENTA" en esta misma página.'
                    // })
                }else if(params.success && params.type === 'recoverPassword'){
                    const modalData = setSuccesMessage(params.type, params.email, params.username);
                    setNewPassModal(modalData);
                    // setNewPassModal({
                    //     title: 'Recuperación de contraseña',
                    //     message: `Escribe tu nueva contraseña para ${params.username}`,
                    //     password: true,
                    //     link:true,
                    //     username: params.username
                    // });
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