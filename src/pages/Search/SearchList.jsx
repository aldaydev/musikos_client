import { useEffect, useState } from "react";
import useFetch from "../../utils/useFetch";
import ErrorModal from '../../components/Modals/ErrorModal';


function SearchList ({musicianslist, loading}){

    const baseImageUrl = 'https://raw.githubusercontent.com/aldaydev/musikos_images/main/profiles/';

    useEffect(()=>{
        console.log('MusicianList',musicianslist);
    },[musicianslist])

    return(
        <section className="searchList__container">
            <h2>LISTADO DE MÚSICOS</h2>
            
            <ul className="searchList__musicians">
                {musicianslist &&
                musicianslist.map((musician, i) => (
                    <li key={i} className="searchList__musician">
                        <div className="musician__imageContainer">
                            <img src={`${baseImageUrl}${musician.image}`} alt={`${musician.username || 'default'} user image`} className="musician__image"/>
                            <span>@{musician.username}</span>
                        </div>
                        <div className="musician__dataContainer">
                            <span>Nombre: {musician.name}</span>
                            <span> Edad: {musician.age}</span>
                            <span> Estilos: {musician.styles?.length > 0 ? musician.styles : 'No indicado'}</span>
                            <span> Instrumentos: {musician.instruments?.length > 0 ? musician.instruments : 'No indicado'}</span>
                        </div>
                        
                    </li>
                ))
                }
            </ul>
        </section>
    )
}

export default SearchList;