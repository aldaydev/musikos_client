import { createPortal } from 'react-dom';
import ExitButton from './ExitButton';
import useFetch from '../../utils/useFetch';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import { useEffect, useState } from 'react';
import SpinnerModal from './SpinnerModal';
import show_icon from "../../assets/icons/show_icon.svg";
import hide_icon from "../../assets/icons/hide_icon.svg";

const RecoverPassModal = ({recoverPass, setRecoverPass}) => {

    const { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError } = useFetch();

    const handleExit = () => {
        setRecoverPass(null);
    }

    const [showPassword, setShowPassword] = useState(['password', show_icon]);
    
    function handleShowPassword (){
        showPassword[0] === 'password'
            ? setShowPassword(['text', hide_icon])
            : setShowPassword(['password', show_icon])
    }

    useEffect(()=>{
        
        if(fetchItem === 'emailToRecoverPass' && fetchRes){
            setRecoverPass({title: fetchRes.title, message: fetchRes.message})
        }
        console.log('RECOVERPASS',recoverPass.password);
    },[fetchItem, fetchRes])

    const [loginValue, setloginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!recoverPass.password){
            await fetchReq({
                endpoint: '/auth/validate-password-recover',
                method: 'POST',
                body: {login: loginValue},
                item: 'emailToRecoverPass',
                credentials: 'include'
            });
        }else{
            await fetchReq({
                endpoint: '/auth/password-recover',
                method: 'POST',
                body: {password: passwordValue},
                item: 'passwordRecover'
            });
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
                    
                        <form className='succes__form' onSubmit={handleSubmit}>
                            {recoverPass
                            ?
                            <Input 
                                type={showPassword[0]}
                                name='password'
                                id='pass'
                                value={passwordValue}
                                placeholder='Contraseña'
                                onChange={(e)=>setPasswordValue(e.target.value)}
                                modClass={fetchError && 'error'}
                                showPassImg={showPassword[1]}
                                showPassFunc={handleShowPassword}
                                // error={passwordError}
                            />

                            :       
                            <Input
                                name='login'
                                id='login'
                                value={loginValue}
                                placeholder='Email o Username'
                                onChange={(e)=>setloginValue(e.target.value)}
                                modClass={fetchError && 'error'}
                                divModClass={'recoverPass'}
                            />
                            }
                            
                            <Button>RECUPERAR</Button>
                        </form>
                        {fetchError && fetchItem === 'emailToRecoverPass' &&
                            <span className='success__loginError'>{fetchError.message}</span>
                        }
                    </div>}

                    {isLoading &&
                        <SpinnerModal/>
                    }
            </div>
            
        </div>,
    document.body
    )
}

export default RecoverPassModal;