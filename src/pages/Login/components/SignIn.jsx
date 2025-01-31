import { useState } from "react";
import Input from "../../../components/Forms/Input";

function SignIn (){

    const [signInValue, setsignInValue] = useState('');
    const [passValue, setPassValue] = useState('');

    return(
        <section className="login__signUp">
            <h3>ACCEDE</h3>
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
                <button>ACCEDER</button>
            </form>
        </section>
    )
}

export default SignIn;