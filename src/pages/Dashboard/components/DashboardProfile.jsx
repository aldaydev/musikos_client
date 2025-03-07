import { useEffect, useState } from "react";
import Button from "../../../components/Forms/Button";
import useFetch from "../../../utils/useFetch";
import Input from "../../../components/Forms/Input";
import validate from "../../../utils/validate";
import SuccessModal from "../../../components/Modals/SuccessModal";
import { UseAuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function DashboardProfile ({userData}){

    //UseFetch Initialization
    const { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError } = useFetch();

    const navigate = useNavigate();

    const {setIsLoggedIn} = UseAuthContext;

    const baseImageUrl = 'https://raw.githubusercontent.com/aldaydev/musikos_images/main/profiles/';

    const [imgFile, setImgFile] = useState(null);
    const [imgError, setImgError] = useState(null);
    const [usernameValue, setUsernameValue] = useState('');
    const [usernameError, setUsernameError] = useState(null);

    const [success, setSuccess] = useState(null);
    

    // const handleImgFile = (e) => {
    //     setImgFile(e.target.files[0]); // Guardamos el archivo seleccionado en el estado
    // };

    // const submitImage = async () => {

    //     if (!imgFile) {
    //         setImgError('Debes añadir una nueva imagen');
    //         return;
    //     }else{
    //         const formData = new FormData();
    //         formData.image = imgFile;
    //         // formData.append('image', imgFile);
    //         console.log(formData);

    //         setImgError(null);
    //         await fetchReq({
    //             endpoint: `/upload`,
    //             method: 'POST',
    //             body: formData,
    //             item: 'updateImage'
    //         });
    //     }

    // }

    const handleSubmit = async (e) =>{
            e.preventDefault();
    
            if(e.target.id === 'changeUsername'){
                const validateUsername = await validate.username(usernameValue);
                if(!validateUsername[0]){
                    setUsernameError(validateUsername[1]);
                }else{
                    setUsernameError(null);
                    await fetchReq({
                        endpoint: `/musicians/update`,
                        method: 'PATCH',
                        body: {
                            username: userData.username,
                            newUsername: usernameValue
                        },
                        item: 'updateData'
                        
                    });
                    const timeOut = setTimeout(()=>{
                        setUsernameValue('');
                        navigate('/');
                        window.location.reload();
                        sessionStorage.auth = JSON.stringify({verified: false});
                    },3000)

                    timeOut();
                    
                }
            }
    
        }
    
    
        useEffect(()=>{
            if(fetchItem === 'updateData'){
                setSuccess(fetchRes)
            }
        },[fetchRes])

    return(

        <section className="dashboard__profileContainer">
            <h2 className='dashboard__profileTitle'>EDITA TU PERFIL</h2>
            {userData &&
            <>
                {/* <article>
                    
                        <div>
                            <h4>Actualizar foto</h4>
                            <img src={`${baseImageUrl}${userData.image}`} className="profile__image"/>
                        </div>

                        <input type="file" id="image" name='image' accept="image/*" onChange={handleImgFile}/>
                        {imgError && <span>{imgError}</span>}
                        <Button onClick={submitImage}>Actualizar</Button>
                    
                </article> */}

                <form id="changeUsername" onSubmit={handleSubmit}>
                    <h4>Editar username (se cerrará la sesión)</h4>
                    <div>
                    <Input 
                        name='username'
                        id='username'
                        value={usernameValue}
                        placeholder='Username'
                        onChange={(e)=>setUsernameValue(e.target.value)}
                        error={usernameError}
                        modClass={usernameError && 'error'}
                    />
                    <Button>Cambiar</Button>
                    </div>
                </form>

                <h4>Estás en la versión beta. Pronto podrás modificar más opciones de tu perfil</h4>

            </>
            }
            {success && <SuccessModal success={success} setSuccess={setSuccess}/>}
        </section>
    )
}

export default DashboardProfile;