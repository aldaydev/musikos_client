import './header.css';
import logo from '../../assets/icons/bandbros_logo.svg';
import search_icon from '../../assets/icons/search_icon.svg';
import user_icon from '../../assets/icons/user_icon.svg';
import { Link } from 'react-router-dom';

function Header (){

    const isLoggedIn = false;

    return(
        <header className='App__header'>
            <div className='header__container'>

                <div className='header__brand'>
                    <Link to="/">
                        <img src={logo} alt="Logo image" className='header__logo'/>
                        <h2 className='header__title'>
                            <span className='header__title--color'>B</span>AND
                            <span className='header__title--color'>B</span>ROS
                        </h2>
                    </Link>
                    
                </div>

                <nav className='header__nav'>
                    <ul className='nav__list'>
                        <li className='nav__item'>
                            <Link to="/buscar-musicos">
                                <span className='nav__link--color'>B</span>USCAR 
                                <span className='nav__link--color'>M</span>ÚSICOS
                                <img src={search_icon} alt="Search icon" className='nav__icon'/>
                            </Link>
                        </li>
                        {isLoggedIn ? 
                            <li className='nav__item'>
                        
                            <Link to="/login">
                            <span className='nav__link--color'>A</span>CCEDE
                                <img src={user_icon} alt="User icon" className='nav__icon'/>
                            </Link>
                        </li>
                        :
                            <li className='nav__item'>
                        
                                <Link to="/dashboard">
                                <span className='nav__link--color'>T</span>U 
                                <span className='nav__link--color'>C</span>UENTA
                                    <img src={user_icon} alt="User icon" className='nav__icon'/>
                                </Link>
                            </li>
                        
                        }
                        

                    </ul>
                </nav>
            </div>
            
        </header>
    )
}

export default Header;