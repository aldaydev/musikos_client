//CSS imports
import './signUp.css';
//React imports
import { useState } from "react";
//Component imports
import Input from "../../../components/Forms/Input";
import Label from "../../../components/Forms/Label";
import Button from "../../../components/Forms/Button";
import LegalModal from "../../../components/Modals/LegalModal";
import ErrorModal from '../../../components/Modals/ErrorModal';
//Utils imports
import validate from "../../../utils/validate.js";
import useFetch from "../../../utils/useFetch.jsx";
//Media imports
import show_icon from "../../../assets/icons/show_icon.svg";
import hide_icon from "../../../assets/icons/hide_icon.svg";
import SuccessModal from '../../../components/Modals/SuccessModal.jsx';


function SignUp (){

    //UseFetch Initialization
    const { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError } = useFetch();

    //Form data STATE
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        acceptTerms: false,
        acceptPrivacy: false
    });

    //Timeout referente
    const [timeoutId, setTimeoutId] = useState(null);

    //Form error STATES
    const [emailError, setEmailError] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [termsError, setTermsError] = useState(null);

    const [showPassword, setShowPassword] = useState(['password', show_icon]);

    function handleShowPassword (){
        showPassword[0] === 'password'
            ? setShowPassword(['text', hide_icon])
            : setShowPassword(['password', show_icon])
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
        }else if(id === 'password'){
            const validatePassword = validate.password(value);
            if(!validatePassword[0]){
                setPasswordError(validatePassword[1]);
            }else{
                setPasswordError(null);
            }
        }

    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const validateUsername = await validate.username(formData.username.toLowerCase());
        const validateEmail = await validate.email(formData.email.toLowerCase());
        const validatePassword = validate.password(formData.password);

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

        if(!validatePassword[0]){
            setPasswordError(validatePassword[1]);
        }else{
            setPasswordError(null);
        }

        if(!formData.acceptTerms || !formData.acceptPrivacy){
            setTermsError('Debes aceptar los condiciones y la política de privacidad');
        }else{
            setTermsError(null);
        }

        if(validateUsername[0] && validateEmail[0] && validatePassword[0] && formData.acceptTerms && formData.acceptPrivacy){
            await fetchReq({
                endpoint: '/musicians/signup',
                method: 'POST',
                body: formData,
                item: 'signup'
            });

            setFormData({email: "",
                username: "",
                password: "",
                acceptTerms: false,
                acceptPrivacy: false})
        }
    };

    const showLegals = async (show) => {

        await fetchReq({
            endpoint: `/legal/${show}`,
            item: 'legals'
        })

    }

    const acceptLegals = () =>{

        let key;

        fetchRes.type === 'terms'
            ? key = 'acceptTerms'
            : key = 'acceptPrivacy'

        setFetchItem(null);
        setFormData({...formData, [key]: true})
    }

    return(
        <section className="login__signUp">

            <h3>CREA TU CUENTA</h3>

            {/* <Loading/> */}

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
                        type={showPassword[0]}
                        name='password'
                        id='password'
                        value={formData.password}
                        placeholder='Contraseña'
                        onChange={handleChange}
                    />
                    <img src={showPassword[1]} alt="Show icon" onClick={handleShowPassword} />
                </Label>
                
                {passwordError && <span>{passwordError}</span>}

                <Label htmlFor='acceptTerms'>
                    Acepto los <a href="#" onClick={()=>showLegals('terms')}>
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
                    Acepto la <a href="#" onClick={()=>showLegals('privacy')}>
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
                <Button>CREAR CUENTA</Button>
            </form>

            {(fetchRes && fetchItem === 'legals') && !fetchError && 
            <LegalModal 
                isLoading={isLoading}
                fetchRes={fetchRes || fetchError} 
                setFetchItem={setFetchItem}
                acceptLegals={acceptLegals}
            />}

            {fetchError && <ErrorModal fetchError={fetchError} setFetchError={setFetchError}/>}

            {fetchRes && fetchItem === 'signup' &&
            <SuccessModal type={fetchItem} fetchRes={fetchRes} setFetchItem={setFetchItem}/>
            }

        </section>
    )
}

export default SignUp;