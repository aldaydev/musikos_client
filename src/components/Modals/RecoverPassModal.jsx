import { createPortal } from 'react-dom';
import ExitButton from './ExitButton';
import useFetch from '../../utils/useFetch';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import { useEffect, useState } from 'react';
import SpinnerModal from './SpinnerModal';
import show_icon from "../../assets/icons/show_icon.svg";
import hide_icon from "../../assets/icons/hide_icon.svg";
import validate from '../../utils/validate';

const RecoverPassModal = ({recoverPass, setRecoverPass}) => {

    const { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError } = useFetch();

    const handleExit = () => {
        setRecoverPass(null);
    }

    const [showPassword, setShowPassword] = useState(['password', show_icon]);
    const [passwordError, setPasswordError] = useState([]);
    const [loginValueError, setLoginValueError] = useState([]);
    
    function handleShowPassword (){
        showPassword[0] === 'password'
            ? setShowPassword(['text', hide_icon])
            : setShowPassword(['password', show_icon])
    }

    useEffect(()=>{
        if(fetchError && fetchItem === 'emailToRecoverPass'){
            setLoginValueError(fetchError.message);
        }else if(fetchError && fetchItem === 'passwordRecover'){
            setPasswordError([fetchError.message]);
        }
    },[fetchError, fetchItem])

    useEffect(()=>{
        
        if(fetchItem === 'emailToRecoverPass' && fetchRes){
            setRecoverPass({title: fetchRes.title, message: fetchRes.message, password: true})
        }

        if(fetchItem === 'passwordRecover' && fetchRes){
            setRecoverPass({title: fetchRes.title, message: fetchRes.message, password: true})
        }
    },[fetchItem, fetchRes])

    const [loginValue, setloginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!recoverPass.password){

            if(!loginValue){
                setLoginValueError('Campo obligatorio');
            }else{
                setLoginValueError([]);
                await fetchReq({
                    endpoint: '/auth/password-recover-email',
                    method: 'POST',
                    body: {login: loginValue},
                    item: 'emailToRecoverPass',
                    credentials: 'include'
                });
            }
        }else{
            const validatePass = validate.password(passwordValue);
            console.log(validatePass);
            if(!validatePass[0]){
                setPasswordError(validatePass[1]);
            }else{
                await fetchReq({
                    endpoint: '/auth/password-recover',
                    method: 'PATCH',
                    body: {
                        password: passwordValue,
                        username: recoverPass.username
                    },
                    item: 'passwordRecover',
                    credentials: 'include'
                });
            }
        }
    }

    return createPortal(
        <div className="modal__placement">
            
            <div className="success__position">
                <h3 className='success__title'>{recoverPass.title}</h3>
                <h4 className='success__text'>{recoverPass.message}</h4>
                <ExitButton exit={handleExit}/>
                {(recoverPass.link && !fetchRes) &&
                    <div className='succes__buttonContainer'>
                    
                        <form className='recoverPass__Form' onSubmit={handleSubmit}>
                            {recoverPass.password
                            ?
                            <Input 
                                type={showPassword[0]}
                                name='password'
                                id='recoverPass'
                                value={passwordValue}
                                placeholder='Contraseña'
                                onChange={(e)=>setPasswordValue(e.target.value)}
                                modClass={fetchError && 'error'}
                                showPassImg={showPassword[1]}
                                showPassFunc={handleShowPassword}
                                error={passwordError}
                                divModClass='recoverPass'
                            />

                            :       
                            <Input
                                name='login'
                                id='login'
                                value={loginValue}
                                placeholder='Email o Username'
                                onChange={(e)=>setloginValue(e.target.value)}
                                modClass={fetchError && 'error'}
                                divModClass='recoverPass'
                                error={loginValueError}
                            />
                            }
                            
                            <Button modClass={fetchError ? 'recoverPass recoverPass--error' :'recoverPass'}>
                                {!recoverPass.password 
                                    ? 'RECUPERAR'
                                    : 'ENVIAR'
                                }
                            </Button>
                            
                        </form>
                        
                    </div>}

                    {isLoading &&
                        <SpinnerModal/>
                    }

                    {/* {fetchError && 
                        <div className='resetPassError__resContainer'>
                            <span className='resetPassError__text'>
                                {fetchError.status === 500 ? 
                                    'USUARIO INEXISTENTE O YA CONFIRMADO'
                                    :
                                    `HA HABIDO UN ERROR (${fetchError.status})`
                                }
                            </span>
                        </div>
                    } */}
            </div>
            
        </div>,
    document.body
    )
}

export default RecoverPassModal;