const Input = ({ type = 'text', modClass, divModClass, error, showPassImg, showPassFunc, ...props }) => {

    const initialClass = `${type}Input`;
    
    let inputContainer = 'inputContainer';
    if(divModClass){
        inputContainer = `inputContainer inputContainer--${divModClass}`;
    }

    return(
        <div className={inputContainer}>
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