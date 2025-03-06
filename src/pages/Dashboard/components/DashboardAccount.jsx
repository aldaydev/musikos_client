import { useEffect, useState } from "react";
import Button from "../../../components/Forms/Button";
import Input from "../../../components/Forms/Input";
import validate from "../../../utils/validate";
import useFetch from "../../../utils/useFetch";
import SuccessModal from "../../../components/Modals/SuccessModal";
import Label from "../../../components/Forms/Label";
import show_icon from "../../../assets/icons/show_icon.svg";
import hide_icon from "../../../assets/icons/hide_icon.svg";

function DashboardAccount ({userData}){

    //UseFetch Initialization
    const { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError } = useFetch();

    const [emailValue, setEmailValue] = useState('');
    const [emailError, setEmailError] = useState(null);
    const [passwordValue, setPasswordValue] = useState('');
    const [passwordError, setPasswordError] = useState(null);
    const [showPassword, setShowPassword] = useState(['password', show_icon]);
    const [success, setSuccess] = useState(null);

    function handleShowPassword (){
            showPassword[0] === 'password'
                ? setShowPassword(['text', hide_icon])
                : setShowPassword(['password', show_icon])
        }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(e.target.id === 'changeEmail'){
            const validateEmail = await validate.email(emailValue);
            if(!validateEmail[0]){
                setEmailError(validateEmail[1]);
            }else{
                setEmailError(null);
                await fetchReq({
                    endpoint: `/musicians/update`,
                    method: 'PATCH',
                    body: {
                        username: userData.username,
                        email: emailValue
                    },
                    item: 'updateData'
                });
                setEmailValue('');
            }
        }

        if(e.target.id === 'changePassword'){
            const validatePassword = await validate.password(passwordValue);
            if(!validatePassword[0]){
                setPasswordError(validatePassword[1]);
            }else{
                setPasswordError(null);
                await fetchReq({
                    endpoint: `/musicians/update`,
                    method: 'PATCH',
                    body: {
                        username: userData.username,
                        password: passwordValue
                    },
                    item: 'updateData'
                });
                setEmailValue('');
            }
        }
    }


    useEffect(()=>{
        setSuccess(fetchRes)
    },[fetchRes])




    return(

        <section className="dashboard__accountContainer">
            <h2 className='dashboard__accountTitle'>EDITA TU CUENTA</h2>
            <form id="changeEmail" onSubmit={handleSubmit}>
                <h4>Editar email</h4>
                <div>
                <Input 
                    name='email'
                    id='email'
                    value={emailValue}
                    placeholder='Email'
                    onChange={(e)=>setEmailValue(e.target.value)}
                    error={emailError}
                    modClass={emailError && 'error'}
                />
                <Button>Cambiar</Button>
                </div>
            </form>
            <form id="changePassword" onSubmit={handleSubmit}>
                <h4>Editar contraseña</h4>
                <div>
                <Label htmlFor='password'>
                    <Input 
                        type={showPassword[0]}
                        name='password'
                        id='password'
                        value={passwordValue}
                        placeholder='Contraseña'
                        onChange={(e)=>setPasswordValue(e.target.value)}
                        error={passwordError}
                        modClass={passwordError && 'error'}
                        showPassImg={showPassword[1]}
                        showPassFunc={handleShowPassword}
                    />
                </Label>
                <Button>Cambiar</Button>
                </div>
            </form>
            <div>
            <Button>ELIMINAR CUENTA</Button>
            <Button>CERRAR SESIÓN</Button>
            </div>
            {success && <SuccessModal success={success} setSuccess={setSuccess}/>}
        </section>
    )
}

export default DashboardAccount;