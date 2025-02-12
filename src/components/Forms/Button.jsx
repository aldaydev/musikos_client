const Button = ({ color = "pink", modClass, children, ...props }) => {

    let className = !modClass
        ? `button--${color}`
        : `button--${color} button--${modClass}`

    return(
        <button className={className}
        {...props}>
            {children}
        </button>
    )
}

export default Button;