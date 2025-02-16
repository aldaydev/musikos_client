import { useState } from "react";
import Input from "../../../components/Forms/Input";
import Button from "../../../components/Forms/Button";

function SignIn (){

    const [signInValue, setsignInValue] = useState('');
    const [passValue, setPassValue] = useState('');

    return(
        <section className="login__signUp">
            <h3 className="signIn__title">ACCEDE A TU CUENTA</h3>
            <form className="signUp__form">

                <Input 
                    type='text' 
                    placeholder='Email o Username' 
                    onChange={(e)=>setsignInValue(e.taget.value)}
                />

                <Input 
                    type='password'
                    placeholder='Contraseña'
                    onChange={(e)=>setPassValue(e.taget.value)}
                />
                <Button modClass='signIn'>ACCEDER</Button>
            </form>
        </section>
    )
}

export default SignIn;