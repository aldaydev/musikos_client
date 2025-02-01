import { useState, useEffect } from "react";
import Input from "../../../components/Forms/Input";
import Label from "../../../components/Forms/Label";
import validate from "../../../utils/validate.js";
import useFetch from "../../../utils/useFetch.jsx";
import show_icon from "../../../assets/icons/show_icon.svg";
import hide_icon from "../../../assets/icons/hide_icon.svg";
import Button from "../../../components/Forms/Button.jsx";

function SignUp (){

    const [handleFetch, fetchRes] = useFetch();

    //Form data STATE
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        pass: "",
        acceptTerms: false,
        acceptPrivacy: false
    });

    //Form error STATES
    const [emailError, setEmailError] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const [passError, setPassError] = useState(null);
    const [termsError, setTermsError] = useState(null);

    const [showPass, setShowPass] = useState(['password', show_icon]);

    function handleShowPass (e){
        showPass[0] === 'password'
            ? setShowPass(['text', hide_icon])
            : setShowPass(['password', show_icon])
    }

    useEffect(() => {
        
        if(formData.username){
            console.log('ESTA CAMBIANDO. Esto es para comprobar en DB si email y username ya existen');
        }
        
    },[formData.username])


    const handleChange = (e) => {

        const { id, value, checked, type } = e.target;

        type === 'checkbox' 
            ? setFormData({ ...formData, [id]: checked })
            : setFormData({ ...formData, [id]: value })
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        const validateUsername = validate.username(formData.username);
        const validateEmail = validate.email(formData.email);
        const validatePass = validate.pass(formData.pass);

        if(!validateUsername[0]){
            setUsernameError(validateUsername[1]);
        }else{
            setUsernameError(null);
        }

        if(!validateEmail[0]){
            setEmailError(validateEmail[1]);
        }else{
            setEmailError(null);
        }

        if(!validatePass[0]){
            setPassError(validatePass[1]);
        }else{
            setPassError(null);
        }

        if(!formData.acceptTerms || !formData.acceptPrivacy){
            setTermsError('Debes aceptar los condiciones y la política de privacidad');
        }else{
            setTermsError(null);
        }

        if(validateUsername[0] && validateEmail[0] && validatePass[0] && formData.acceptTerms && formData.acceptPrivacy){
            handleFetch({
                endpoint: '/musicians/signup',
                method: 'POST',
                body: formData
            });
        }
    };

    const showTerms = () => {
        console.log('Eaaa');
        handleFetch({
            endpoint: '/legal/terms',
            method: 'GET'
        });
    }

    return(
        <section className="login__signUp">
            <h3>CREA TU CUENTA</h3>
            <form className="signUp__form" onSubmit={handleSubmit}>
                <Input 
                    name='email'
                    id='email'
                    value={formData.email}
                    placeholder='Email'
                    onChange={handleChange}
                />
                {emailError && <span>{emailError}</span>}
                <Input 
                    name='username'
                    id='username'
                    value={formData.username}
                    placeholder='Nombre de usuario'
                    onChange={handleChange}
                />
                {usernameError && <span>{usernameError}</span>}
                <Label htmlFor='pass'>
                    <Input 
                        type={showPass[0]}
                        name='pass'
                        id='pass'
                        value={formData.pass}
                        placeholder='Contraseña'
                        onChange={handleChange}
                    />
                    <img src={showPass[1]} alt="Show icon" onClick={handleShowPass} />
                </Label>
                
                {passError && <span>{passError}</span>}

                <Label htmlFor='acceptTerms'>
                    Acepto los <a href="#" onClick={showTerms}>Terminos y condiciones</a>
                </Label>
                <Input 
                    type='checkbox'
                    id='acceptTerms'
                    name='acceptTerms'
                    onClick={handleChange}
                />

                <Label htmlFor='acceptPrivacy'>
                    Acepto la <a href="#">Política de privacidad</a>
                </Label>
                <Input 
                    type='checkbox'
                    id='acceptPrivacy'
                    name='acceptPrivacy'
                    onClick={handleChange}
                />
                {termsError && <span>{termsError}</span>}
                <Button text='Enviar'></Button>
            </form>
        </section>
    )
}

export default SignUp;