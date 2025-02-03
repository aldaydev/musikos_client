import { useState } from "react";
import Input from "../../../components/Forms/Input";
import Label from "../../../components/Forms/Label";
import validate from "../../../utils/validate.js";
import show_icon from "../../../assets/icons/show_icon.svg";
import hide_icon from "../../../assets/icons/hide_icon.svg";
import Button from "../../../components/Forms/Button.jsx";
import close_icon_dark from '../../../assets/icons/close_icon.svg';
import './signUp.css';
import customFetch from "../../../utils/customFetch.js";

function SignUp (){

    //Form data STATE
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        pass: "",
        acceptTerms: false,
        acceptPrivacy: false
    });

    //Timeout referente
    const [timeoutId, setTimeoutId] = useState(null);

    //Form error STATES
    const [emailError, setEmailError] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const [passError, setPassError] = useState(null);
    const [termsError, setTermsError] = useState(null);

    const [showPass, setShowPass] = useState(['password', show_icon]);

    const [showLegals, setShowLegals] = useState(null);

    const [submitSuccess, setSubmitSucces] = useState(null);

    function handleShowPass (){
        showPass[0] === 'password'
            ? setShowPass(['text', hide_icon])
            : setShowPass(['password', show_icon])
    }

    const handleChange = (e) => {

        const { id, value, checked, type } = e.target;

        // Cancela el timeout anterior antes de definir uno nuevo
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Define un nuevo timeout para ejecutar la validación
        const newTimeoutId = setTimeout(() => {
            onlineValidations(value, id);
        }, 700); // 700ms de debounce

        setTimeoutId(newTimeoutId); // Guarda el nuevo timeout

        if(type === 'checkbox' ){
            setFormData({ ...formData, [id]: checked })
        }else if(id === 'email' || id === 'username'){
            setFormData({ ...formData, [id]: value })
        }else{
            setFormData({ ...formData, [id]: value })
        }

    };

    const onlineValidations = async (value, id) => {

        if(id === 'username'){
            const validateUsername = await validate.username(value);
            if(!validateUsername[0]){
                setUsernameError(validateUsername[1]);
            }else{
                setUsernameError(null);
            }
        }else if(id === 'email'){
            const validateEmail = await validate.email(value.toLowerCase());
            if(!validateEmail[0]){
                setEmailError(validateEmail[1]);
            }else{
                setEmailError(null);
            }
        }else if(id === 'pass'){
            const validatePass = validate.pass(value);
            if(!validatePass[0]){
                setPassError(validatePass[1]);
            }else{
                setPassError(null);
            }
        }

    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const validateUsername = await validate.username(formData.username.toLowerCase());
        const validateEmail = await validate.email(formData.email.toLowerCase());
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
            const submitResponse = await customFetch({
                endpoint: '/musicians/signup',
                method: 'POST',
                body: formData
            });
            
            console.log(submitResponse.msg);
            setSubmitSucces(await submitResponse.msg);

            setFormData({email: "",
                username: "",
                pass: "",
                acceptTerms: false,
                acceptPrivacy: false})
        }
    };

    const showTermsAndPrivacy = async (show) => {

        const legalsFetch = await customFetch({
            endpoint: `/legal/${show}`,
            method: 'GET'
        });

        setShowLegals(await legalsFetch);
        
    }

    const closeLegals = () =>{

        let key;

        showLegals.type === 'terms'
            ? key = 'acceptTerms'
            : key = 'acceptPrivacy'

        setShowLegals(null);
        setFormData({...formData, [key]: true})
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
                    Acepto los <a href="#" onClick={()=>showTermsAndPrivacy('terms')}>
                        Terminos y condiciones
                    </a>
                </Label>

                <Input 
                    type='checkbox'
                    id='acceptTerms'
                    name='acceptTerms'
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                />

                <Label htmlFor='acceptPrivacy'>
                    Acepto la <a href="#" onClick={()=>showTermsAndPrivacy('privacy')}>
                        Política de privacidad</a>
                </Label>
                <Input 
                    type='checkbox'
                    id='acceptPrivacy'
                    name='acceptPrivacy'
                    checked={formData.acceptPrivacy}
                    onChange={handleChange}
                />
                {termsError && <span>{termsError}</span>}
                <Button color='pink'>CREAR CUENTA</Button>
            </form>

            {showLegals && 
            <div className="legal__dialog">
                <div className="legal__position">
                    <div dangerouslySetInnerHTML={{ __html: showLegals.html }}/>
                    <img src={close_icon_dark} alt="Cross icon" className="legal__exit" onClick={()=>setShowLegals(null)}/>
                    <Button color='pink' modClass='legal' onClick={closeLegals}>
                        ACEPTAR Y VOLVER
                    </Button>
                </div>
                
            </div>}

            {submitSuccess &&
            <div className="submitMsg__container">
                <h4>¡CONFIRMA TU CUENTA!</h4>
                <p>{submitSuccess}</p>
            </div>
            }

        </section>
    )
}

export default SignUp;