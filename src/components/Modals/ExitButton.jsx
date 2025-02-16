import close_icon from '../../assets/icons/close_icon.svg';

const ExitButton = ({ color = 'pink', modClass, exit}) => {

    let className = !modClass
        ? `exitButton--${color}`
        : `exitButton--${color} exitButton--${modClass}`

    return(
        <img src={close_icon} className={className} onClick={exit}/>
    )
}

export default ExitButton;