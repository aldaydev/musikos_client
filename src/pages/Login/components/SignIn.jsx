//React imports
import { useEffect, useState } from "react";
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

function SignIn (){

    //UseFetch Initialization
    const { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError } = useFetch();

    const [ formError, setFormError ] = useState(null);

    useEffect(()=>{
        fetchError 
            && fetchError.status === 400 
            && setFormError('Usuario o contraseña inválidos');
    },[fetchError])

    //Form data STATE
    const [formData, setFormData] = useState({login: "", password: ""});

    const [showPassword, setShowPassword] = useState(['password', show_icon]);

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData({...formData, [name]: value});
    }

    function handleShowPassword (){
        showPassword[0] === 'password'
            ? setShowPassword(['text', hide_icon])
            : setShowPassword(['password', show_icon])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchReq({
            endpoint: '/musicians/signin',
            method: 'POST',
            body: formData,
            item: 'signin'
        });
    }

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
                        
                    />
                </Label>

                
                <span className="resetPass__link">He olvidado mi contraseña</span>

                <Button modClass='signIn'>ACCEDER</Button>
            </form>
            
            {/* {fetchError && fetchError.status !== 400 && <ErrorModal error={fetchError} setError={setFetchError}/>}

            {fetchRes && fetchItem === 'signin' && !isLoading &&
                <SuccessModal success={fetchRes} setSuccess={setFetchItem}/>
            }

            {!formError && !fetchRes && isLoading && <SpinnerModal/>} */}
        </section>
    )
}

export default SignIn;