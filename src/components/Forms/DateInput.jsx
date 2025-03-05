const DateInput = ({placeholder, modClass, ...props}) =>{

    const initialClass = `dateInput`;

    return(
        <>
            <input 
                type="number" 
                className={!modClass ? initialClass : `${initialClass} ${initialClass}--${modClass}`}
                placeholder={placeholder} 
                {...props}/>
        </>
        
    )

}

export default DateInput;