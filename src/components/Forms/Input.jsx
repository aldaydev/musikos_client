const Input = ({ type = 'text', modClass, error, showPassImg, showPassFunc, ...props }) => {

    const initialClass = `${type}Input`;

    return(
        <div className="inputContainer">
            <input 
                type={type}
                className={!modClass ? initialClass : `${initialClass} ${initialClass}--${modClass}`} 
                {...props}
            />
            {showPassImg && showPassFunc && <img src={showPassImg} alt="Show icon" onClick={showPassFunc} className="showPassIcon"/>}
            {error && <span className="inputError">{error}</span>}
        </div>
        
    )
}

export default Input;