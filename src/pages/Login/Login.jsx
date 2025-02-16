import './login.css';
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

function Login (){


    return(
            <div className="login__container">
                <h1 className='main__title'>
                    ZONA DE ACCESO
                </h1>
                <section className='login__sign'>
                    <SignIn/>
                    <span className='signDivider'></span>
                    <SignUp/>
                </section>
                
            </div>
    )
}

export default Login;