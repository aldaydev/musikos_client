import { Children } from "react";

const Button = ({ modClass, text, ...props }) => {
    return(
        <button className={`button button--${modClass}`}
        {...props}>
            {text}
        </button>
    )
}

export default Button;