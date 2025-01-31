import { useState, useEffect } from "react";
import Input from "../../../components/Forms/Input";
import Label from "../../../components/Forms/Label";
import validate from "../../../utils/validate.js";

import setFetch from "../../../utils/fetch/setFetch.js";

function SignUp (){

    //Form - value states
    // const [email, setEmail] = useState('');
    // const [username, setUsername] = useState('');
    // const [pass, setPass] = useState('');
    // const [acceptTerms, setacceptTerms] = useState(false);
    // const [acceptPrivacy, setacceptPrivacy] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        username: "",
        pass: "",
        acceptTerms: false,
        acceptPrivacy: false
    });

    useEffect(() => {
        
        console.log('ESTA CAMBIANDO');
        
    },[formData.username])

    const [formError, setFormError] = useState({
        email: null,
        username: null,
        pass: null,
        acceptTerms: null,
        acceptPrivacy: null
    });

    const handleChange = (e) => {

        const { id, value, checked, type } = e.target;

        type === 'checkbox' 
            ? setFormData({ ...formData, [id]: checked })
            : setFormData({ ...formData, [id]: value })
    };


    const handleError = (field, text) => {
        setFormError({ ...formError, [field]: text });
    }

    //Form - error states
    // const [emailError, setEmailError] = useState(null);
    // const [usernameError, setUsernameError] = useState(null);
    // const [passError, setPassError] = useState(null);
    // const [termsError, setTermsError] = useState(null);


    const handleSignUp = async (e)=>{

        e.preventDefault();

        if(!validate.pass(formData.pass)){
            console.log('Error en la pass');
            // return setPassError('Contraseña con formato incorrecto');
            return handleError('pass', 'La contraseña debe tener un formato...');
        }

        console.log(formData);
        await setFetch.signIn(formData);
    }

    return(
        <section className="login__signUp">
            <h3>CREA TU CUENTA</h3>
            <form className="signUp__form">
                <Input 
                    name='email'
                    id='email'
                    value={formData.email}
                    placeholder='Email'
                    onChange={handleChange}
                />
                <Input 
                    name='username'
                    id='username'
                    value={formData.username}
                    placeholder='Nombre de usuario'
                    onChange={handleChange}
                />
                <Input 
                    type='password'
                    name='pass'
                    id='pass'
                    value={formData.pass}
                    placeholder='Contraseña'
                    onChange={handleChange}
                />
                {formError.pass && <span>{formError.pass}</span>}

                <Label htmlFor='acceptTerms'>
                    Acepto los <a href="">Terminos y condiciones</a>
                </Label>
                <Input 
                    type='checkbox'
                    id='acceptTerms'
                    name='acceptTerms'
                    onClick={handleChange}
                />

                <Label htmlFor='acceptPrivacy'>
                    Acepto la <a href="">Política de privacidad</a>
                </Label>
                <Input 
                    type='checkbox'
                    id='acceptPrivacy'
                    name='acceptPrivacy'
                    onClick={handleChange}
                />
                <button onClick={(e)=>handleSignUp(e)}>REGISTRAR</button>
            </form>
        </section>
    )
}

export default SignUp;