import { useEffect, useState } from "react";
import useFetch from "../../../../utils/useFetch";
import ErrorModal from '../../../../components/Modals/ErrorModal';


function SearchList ({musicianslist, loading}){

    const baseImageUrl = 'https://raw.githubusercontent.com/aldaydev/musikos_images/main/profiles/';

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
                            <ul> Estilos: 
                                {musician.styles ? musician.styles.map((style, i)=>{
                                    return <span key={i} className="musician__style">{style}</span>
                                })
                                :
                                    <span>No indicado</span>
                                }
                            </ul>
                            <ul> Instrumentos: 
                                {musician.instruments ? musician.instruments.map((instrument, i)=>{
                                    return <span key={i} className="musician__instrument">{instrument}</span>
                                })
                                :
                                    <span>No indicado</span>
                                }
                            </ul>
                            <div>
                                <span> {musician.region}</span>
                            </div>
                        </div>
                        
                    </li>
                ))
                }
            </ul>
        </section>
    )
}

export default SearchList;