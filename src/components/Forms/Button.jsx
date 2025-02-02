const Button = ({ color, modClass, children, ...props }) => {
    return(
        <button className={`button--${color} button--${modClass}`}
        {...props}>
            {children}
        </button>
    )
}

export default Button;