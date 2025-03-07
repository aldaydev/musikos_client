import { useEffect, useState } from "react";
import Button from "../../../components/Forms/Button";
import useFetch from "../../../utils/useFetch";

function DashboardProfile ({userData}){

    //UseFetch Initialization
    const { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError } = useFetch();

    const baseImageUrl = 'https://raw.githubusercontent.com/aldaydev/musikos_images/main/profiles/';

    const [imgFile, setImgFile] = useState(null);
    const [imgError, setImgError] = useState(null);

    const handleImgFile = (e) => {
        setImgFile(e.target.files[0]); // Guardamos el archivo seleccionado en el estado
    };

    const submitImage = async () => {
        if (!imgFile) {
            setImgError('Debes añadir una nueva imagen');
            return;
        }else{
            setImgError(null);
            await fetchReq({
                endpoint: `/musicians/update`,
                method: 'PATCH',
                body: {
                    image: imgFile,
                    username: userData.username
                },
                item: 'updateImage'
            });
        }
    
    

    }

    return(

        <section className="dashboard__profileContainer">
            <h2 className='dashboard__profileTitle'>EDITA TU PERFIL</h2>
            {userData &&
            <>
                <article>
                    
                        <div>
                            <h4>Actualizar foto</h4>
                            <img src={`${baseImageUrl}${userData.image}`} className="profile__image"/>
                        </div>

                        <input type="file" id="image" name='image' accept="image/*" onChange={handleImgFile}/>
                        {imgError && <span>{imgError}</span>}
                        <Button onClick={submitImage}>Actualizar</Button>
                    
                </article>



                <article>
                    <span>{userData.name}</span>
                    <span>{userData.age}</span>
                </article>
            </>
                
            }
        </section>
    )
}

export default DashboardProfile;