import { useEffect } from "react";

function DashboardProfile ({userData}){

    const baseImageUrl = 'https://raw.githubusercontent.com/aldaydev/musikos_images/main/profiles/';

    console.log('USERDATA', userData)

    return(

        <section className="dashboard__profileContainer">
            <h2 className='dashboard__profileTitle'>TU PERFIL</h2>
            <article>
                <img src={`${baseImageUrl}${userData.image}`}/>
                <span>{userData.name}</span>
                <span>{userData.age}</span>
            </article>
        </section>
    )
}

export default DashboardProfile;