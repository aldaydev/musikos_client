

const Checkbox = ({id, name, checked, onChange, children, ...props}) => {
    return(
        <div className="checkboxContainer">
            {children}
            <input
                type='checkbox'
                id={id}
                name={name}
                checked={checked}
                onChange={onChange}
                className="checkboxInput"
                {...props}
            />
        </div>
    )
}

export default Checkbox;