import './home.css';
import bg_image from '../assets/images/musician_image1.jpg';
import { Link } from 'react-router-dom';
import Button from '../components/Forms/Button';

function Home (){
    return(
            <>
                <div className='home__imageContainer'>
                    <img src={bg_image} className='home__image'/>
                    <div className='home__textContainer'>
                        <h1 className='home__title'>BIENVENIDO A LA VERSIÓN BETA DE MUSIKOS</h1>
                        <Button>
                            <Link to='/login' className='home__link'>ACCESO</Link>
                        </Button>
                        
                    </div>
                </div>
                
            </>
    )
}

export default Home;