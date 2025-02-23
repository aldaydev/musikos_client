import './header.css';
import { useNavigate } from "react-router-dom";
import logo from '../../assets/icons/musikos_logo.svg';
import search_icon from '../../assets/icons/search_icon.svg';
import user_icon from '../../assets/icons/user_icon.svg';
import exit_icon from '../../assets/icons/exit_icon.svg';
import menu_icon from '../../assets/icons/menu_icon.svg';
import close_icon from '../../assets/icons/close_icon.svg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useFetch from '../../utils/useFetch';


function Header (){

    const { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError } = useFetch();

    const navigate = useNavigate();

    const { isLoggedIn, setIsLoggedIn  } = useContext(AuthContext);

    const handleLogout = async () => {
        sessionStorage.auth = JSON.stringify({verified: false});
        setIsLoggedIn(false);
        await fetchReq({
            endpoint: '/musicians/clear-cookies',
            method: 'POST',
            item: 'clearCookies',
            credentials: 'include'
        });
        navigate('/');
    }
    

    return(
        <header className='App__header'>
            <div className='header__container'>

                <div className='header__brand'>
                    <Link to="/">
                        <img src={logo} alt="Logo image" className='header__logo'/>
                        <h2 className='header__title'>
                            {/* <span className='header__title--color'>B</span>AND
                            <span className='header__title--color'>B</span>ROS */}
                            <span className='header__title--color'>M</span>USIKOS
                            {/* <span className='header__title--color'>S</span>I
                            <span className='header__title--color'>K</span>O */}
                        </h2>
                    </Link>
                    
                </div>

                <div className='header__navToggle'>
                    <img src={close_icon} alt="Cross icon" />
                    <img src={menu_icon} alt="Menu icon" />
                </div>

                <nav className='header__nav'>
                    <ul className='nav__list'>
                        <li className='nav__item'>
                            <Link to="/buscar-musicos">
                                <span className='nav__link--color'>B</span>USCAR 
                                {/* <span className='nav__link--color'>M</span>ÚSICOS */}
                                <img src={search_icon} alt="Search icon" className='nav__icon'/>
                            </Link>
                        </li>
                        {!isLoggedIn ? 
                            <li className='nav__item'>
                            
                                <Link to="/login">
                                <span className='nav__link--color'>A</span>CCEDER
                                    <img src={user_icon} alt="User icon" className='nav__icon'/>
                                </Link>
                            </li>
                        :
                            <ul className='nav__loggedInList'>
                                <li className='nav__item'>
                                    <Link to="/dashboard">
                                        <span className='nav__link--color'>T</span>U 
                                        <span className='nav__link--color'>C</span>UENTA
                                            <img src={user_icon} alt="User icon" className='nav__icon'/>
                                    </Link>
                                </li>
                                <li className='nav__item'>
                                    <a onClick={handleLogout}>
                                        <span className='nav__link--color'>S</span>ALIR 
                                            <img src={exit_icon} alt="User icon" className='nav__icon'/>
                                    </a>
                                </li>
                            </ul>
                            
                        }
                        

                    </ul>
                </nav>
            </div>
            
        </header>
    )
}

export default Header;