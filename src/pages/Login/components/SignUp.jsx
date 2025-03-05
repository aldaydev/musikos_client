//React imports
import { useEffect, useState } from "react";
//Component imports
import Input from "../../../components/Forms/Input";
import Label from "../../../components/Forms/Label";
import Checkbox from '../../../components/Forms/Checkbox.jsx';
import Button from "../../../components/Forms/Button";
import LegalModal from "../../../components/Modals/LegalModal";
import ErrorModal from '../../../components/Modals/ErrorModal';
import SuccessModal from '../../../components/Modals/SuccessModal.jsx';
import SpinnerModal from "../../../components/Modals/SpinnerModal.jsx";
//Utils imports
import validate from "../../../utils/validate.js";
import useFetch from "../../../utils/useFetch.jsx";
//Media imports
import show_icon from "../../../assets/icons/show_icon.svg";
import hide_icon from "../../../assets/icons/hide_icon.svg";
import DateInput from "../../../components/Forms/DateInput.jsx";



function SignUp (){

    //UseFetch Initialization
    const { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError } = useFetch();

    //Form data STATE
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        birthdate: {year: "", month: "", day: ""},
        acceptTerms: false,
        acceptPrivacy: false
    });

    //Timeout referente
    const [timeoutId, setTimeoutId] = useState(null);

    //Form error STATES
    const [emailError, setEmailError] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [birthdateError, setBirthdateError] = useState(null);
    const [legalsError, setlegalsError] = useState(null);

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
            if(id === 'acceptTerms' && checked === true){
                setlegalsError(null);
            }else if(id === 'acceptPrivacy' && checked === true){
                setlegalsError(null);
            }
        }else if(id === 'email' || id === 'username'){
            setFormData({ ...formData, [id]: value })
        }else{
            setFormData({ ...formData, [id]: value })
        }

        if(id === 'year' || id === 'month' || id === 'day'){
            setFormData({ ...formData, birthdate: {...formData.birthdate, [id]: value} })
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
        }else if(id === 'year'){
            const validateYear = validate.year(value);
            if(!validateYear[0]){
                setBirthdateError(validateYear[1]);
            }else{
                setBirthdateError(null);
            }
        }else if(id === 'month'){
            const validateMonth = validate.month(value);
            if(!validateMonth[0]){
                setBirthdateError(validateMonth[1]);
            }else{
                setBirthdateError(null);
            }
        }else if(id === 'day'){
            const validateDay = validate.day(value);
            if(!validateDay[0]){
                setBirthdateError(validateDay[1]);
            }else{
                setBirthdateError(null);
            }
        }

    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const validateUsername = await validate.username(formData.username);
        const validateEmail = await validate.email(formData.email);
        const validatePassword = validate.password(formData.password);
        const validateBirthdate = validate.birthdate(formData.birthdate);

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

        if(!validateBirthdate[0]){
            setBirthdateError(validateBirthdate[1]);
        }else{
            setBirthdateError(null);
        }

        if(!formData.acceptTerms){
            setlegalsError('Debes aceptar las condiciones de uso');
        }else if(!formData.acceptPrivacy){
            setlegalsError('Debes aceptar la política de privacidad');
        }else{
            setlegalsError(null);
        }

        if(validateUsername[0] && validateEmail[0] && validatePassword[0] && validateBirthdate[0] && formData.acceptTerms && formData.acceptPrivacy){
            await fetchReq({
                endpoint: '/auth/signup',
                method: 'POST',
                body: formData,
                item: 'signup'
            });

            setFormData({email: "",
                username: "",
                password: "",
                birthdate: {year: "", month: "", day: ""},
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

            <h3 className='signUp__title'>REGÍSTRATE AHORA</h3>

            <form className="signUp__form" onSubmit={handleSubmit}>

                <Input 
                    name='email'
                    id='email'
                    value={formData.email}
                    placeholder='Email'
                    onChange={handleChange}
                    error={emailError}
                    modClass={emailError && 'error'}
                />

                <Input 
                    name='username'
                    id='username'
                    value={formData.username}
                    placeholder='Username'
                    onChange={handleChange}
                    error={usernameError}
                    modClass={usernameError && 'error'}
                />

                <Label htmlFor='password'>
                    <Input 
                        type={showPassword[0]}
                        name='password'
                        id='password'
                        value={formData.password}
                        placeholder='Contraseña'
                        onChange={handleChange}
                        error={passwordError}
                        modClass={passwordError && 'error'}
                        showPassImg={showPassword[1]}
                        showPassFunc={handleShowPassword}
                    />
                </Label>

                <div className='birthdate__container'>
                    <span className="birthdate__title">Fecha de nacimiento</span>
                    <div className="birthdate__inputsContainer">
                        <DateInput 
                            id='day'
                            placeholder='Día'
                            value={formData.birthdate.day}
                            onChange={handleChange}
                        />
                        <DateInput 
                            id='month'
                            placeholder='Mes'
                            value={formData.birthdate.month}
                            onChange={handleChange}
                        />
                        <DateInput 
                            id='year'
                            placeholder='Año'
                            value={formData.birthdate.age}
                            onChange={handleChange}
                            modClass={birthdateError && 'error'}
                        />
                    </div>
                    {birthdateError && <span className="inputError">{birthdateError}</span>}
                </div>
                

                <section className='legals_checkboxes'>
                    <Checkbox
                        id='acceptTerms'
                        name='acceptTerms'
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                    >
                        <div>
                            <label htmlFor='acceptTerms'>Acepto los</label>
                            <span onClick={()=>showLegals('terms')} className='legalSpan'>
                                Términos y condiciones
                            </span>
                        </div>
                    </Checkbox>

                    <Checkbox
                        id='acceptPrivacy'
                        name='acceptPrivacy'
                        checked={formData.acceptPrivacy}
                        onChange={handleChange}
                    >
                        <div>
                            <label htmlFor='acceptPrivacy'>Acepto la</label>
                            <span onClick={()=>showLegals('privacy')} className='legalSpan'>
                                Política de privacidad
                            </span>
                        </div>
                    </Checkbox>
                    {legalsError && <span className='checkboxError'>{legalsError}</span>}
                </section>

                
                <Button>REGÍSTRARSE</Button>
            </form>

            {(fetchRes && fetchItem === 'legals') && !fetchError && 
            <LegalModal 
                isLoading={isLoading}
                fetchRes={fetchRes || fetchError} 
                setFetchItem={setFetchItem}
                acceptLegals={acceptLegals}
            />}

            {fetchError && <ErrorModal 
                error={fetchError} 
                setError={setFetchError}
                setItem={setFetchItem}
            />}

            {!fetchError && fetchRes && fetchItem === 'signup' && !isLoading &&
            <SuccessModal success={fetchRes} setSuccess={setFetchItem}/>
            }

            {isLoading && <SpinnerModal/>}

        </section>
    )
}

export default SignUp;