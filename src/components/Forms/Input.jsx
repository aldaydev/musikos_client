const Input = ({ type = 'text', modClass, ...props }) => {

    const initialClass = `${type}Input`;

    return(
        <input 
            type={type}
            className={!modClass ? initialClass : `${initialClass} ${initialClass}--${modClass}`} 
            {...props}
        />
    )
}

export default Input;