const Input = ({ type = 'text', modClass, ...props }) => {

    const initialClass = `${type}__input`;

    return(
        <input 
            type={type}
            className={!modClass ? initialClass : `${initialClass} ${initialClass}--${modClass}`} 
            {...props}
        />
    )
}

export default Input;