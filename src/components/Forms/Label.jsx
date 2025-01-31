const Label = ({ htmlFor, modClass, children }) => {
    return (
        <label htmlFor={htmlFor} className={!modClass ? 'label' : `label--${modClass}`}>
            {children}
        </label>
    );
};

export default Label;