const Button = ({ modClass, ...props }) => {
    return(
        <input 
            type={type}
            className={`button button--${modClass}`}
            {...props}
        />
    )
}

export default Button;