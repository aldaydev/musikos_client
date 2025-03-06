import { useEffect } from "react";
import Button from "../../../components/Forms/Button";

function DashboardProfile ({userData}){

    const baseImageUrl = 'https://raw.githubusercontent.com/aldaydev/musikos_images/main/profiles/';

    console.log('USERDATA', userData)

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
                    
                    <input type="file" id="image" name='image'/>
                    <Button>Actualizar</Button>
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