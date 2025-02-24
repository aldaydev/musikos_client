//React imports
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//Component imports
import Input from "../../../components/Forms/Input";
import Button from "../../../components/Forms/Button";
import Label from "../../../components/Forms/Label";

import ErrorModal from '../../../components/Modals/ErrorModal';
import SuccessModal from '../../../components/Modals/SuccessModal';

//Utils imports
import useFetch from "../../../utils/useFetch.jsx";
//Media imports
import show_icon from "../../../assets/icons/show_icon.svg";
import hide_icon from "../../../assets/icons/hide_icon.svg";
import SpinnerModal from "../../../components/Modals/SpinnerModal.jsx";
import { AuthContext } from "../../../context/AuthContext.jsx";
import RecoverPassModal from "../../../components/Modals/RecoverPassModal.jsx";

function SignIn (){

    //UseFetch Initialization
    const { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError } = useFetch();

    const { setIsLoggedIn } = useContext(AuthContext);

    const [ recoverPass, setRecoverPass ] = useState(null);

    const navigate = useNavigate();

    const [ formError, setFormError ] = useState(null);

    const handleRecoverPass = () => {
        setRecoverPass({ 
            title: 'Recuperar contraseña',
            message: 'Indica tu email o username para recuperar tu contraseña',
            link: true
        })
    }

    useEffect(()=>{
        fetchError 
            && fetchError.status === 400 
            && setFormError('Usuario y/o contraseña incorrectos');
    },[fetchError])

    //Form data STATE
    const [formData, setFormData] = useState({login: "", password: ""});

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData({...formData, [name]: value});
    }

    const [showPassword, setShowPassword] = useState(['password', show_icon]);

    function handleShowPassword (){
        showPassword[0] === 'password'
            ? setShowPassword(['text', hide_icon])
            : setShowPassword(['password', show_icon])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!formData.login || !formData.password){
            return setFormError('Faltan campos obligatorios');
        }

        await fetchReq({
            endpoint: '/auth/signin',
            method: 'POST',
            body: formData,
            item: 'signin',
            credentials: 'include'
        });
    }

    useEffect(()=>{
        if(fetchRes && fetchItem === 'signin'){
            sessionStorage.auth = JSON.stringify(fetchRes);
            // setIsLoggedIn(true);
            navigate('/');
            window.location.reload();
        }
    },[fetchRes, fetchItem, navigate])

    return(
        <section className="login__signIn">
            <h3 className="signIn__title">ACCEDE A TU CUENTA</h3>
            <form className="signIn__form" onSubmit={handleSubmit}>

                <Input 
                    name='login'
                    id='login'
                    value={formData.login}
                    placeholder='Email o Username'
                    onChange={handleChange}
                    modClass={fetchError && 'error'}
                />

                <Label htmlFor='pass'>
                    <Input 
                        type={showPassword[0]}
                        name='password'
                        id='pass'
                        value={formData.password}
                        placeholder='Contraseña'
                        onChange={handleChange}
                        modClass={fetchError && 'error'}
                        showPassImg={showPassword[1]}
                        showPassFunc={handleShowPassword}
                        error={formError}
                    />
                </Label>

                
                <span className="resetPass__link" onClick={handleRecoverPass}>He olvidado mi contraseña</span>

                <Button modClass='signIn'>ACCEDER</Button>
            </form>
            
            {fetchError && fetchError.status !== 400 && <ErrorModal error={fetchError} setError={setFetchError}/>}

            {recoverPass && <RecoverPassModal recoverPass={recoverPass} setRecoverPass={setRecoverPass}/>}

        </section>
    )
}

export default SignIn;