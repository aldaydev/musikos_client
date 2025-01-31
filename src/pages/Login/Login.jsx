import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

function Login (){

    return(
            <div className="login__container">
                <h1>ZONA DE ACCESO</h1>
                <SignUp/>
                <SignIn/>
            </div>
    )
}

export default Login;