import customFetch from "./customFetch";

export default {
    username: async (username) => {

        if(!username){
            return [false, 'Campo obligatorio'];
        }

        //Regex 3 a 30 caracteres
        const regexLength = /^.{3,30}$/;
        if (!regexLength.test(username)) {
            return [false, "Debe tener entre 3 y 30 caracteres"];
        }

        //Regex caracteres permitidos (minúsculas, números, guion y guion bajo)
        const regexChars = /^[a-z0-9_-]+$/;
        if (!regexChars.test(username)) {
            return [false, "Solo puede contener minúsculas, números, _ y -"];
        }

        //Regex no empiece ni termine con _ o -
        const regexNoLeadingOrTrailing = /^(?![_-])[^-_].*[^-_]$/;
        if (!regexNoLeadingOrTrailing.test(username)) {
            return [false, "No puede empezar ni terminar con - o _"];
        }

        //Regex no haya guiones o guiones bajos consecutivos
        const regexNoDoubleHyphen = /^(?!.*[_-]{2})/;
        if (!regexNoDoubleHyphen.test(username)) {
            return [false, "No puede tener -- o __ consecutivos"];
        }

        const fetchResponse = await customFetch({
            endpoint: '/musicians/check-username',
            method: 'POST',
            body: {username: username}
        });

        if(fetchResponse.exists){
            return [false, "Ya existe una cuenta con ese username"];
        }

        // Si todas las validaciones son correctas
        return [true, "Username válido"];

    },

    email: async (email) => {
        if(!email){
            return [false, 'Campo obligatorio'];
        }
        // Expresión regular para validar un email
        const regex = /^(?!.*\.\.)[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!regex.test(email)){
            return [false, 'Email con formato incorrecto'];
        }

        const fetchResponse = await customFetch({
            endpoint: '/musicians/check-email',
            method: 'POST',
            body: {email: email}
        });

        if(fetchResponse.exists){
            return [false, "Ya existe una cuenta con ese email"];
        }
        
        return [true, 'Email válido'];
    },

    password: (password) => {

        if(!password){
            return [false, 'Campo obligatorio'];
        }

        // Validar longitud mínima de 8 caracteres
        const regexMinLength = /^.{8,}$/;
        if (!regexMinLength.test(password)) {
            return [false, "Debe tener al menos 8 caracteres"];
        }

        // Validar al menos una letra minúscula, mayúscula y un número
        const regexUpperLowerAndNumber = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
        if (!regexUpperLowerAndNumber.test(password)) {
            return [false, "Al menos una minúscula, una mayúscula y un nº"];
        }
    
        // Validar que contenga al menos un carácter especial
        const regexSpecialChar = /^(?=.*[@$!-_%*?&])/;
        if (!regexSpecialChar.test(password)) {
            return [false, "Al menos un carácter especial: @$!-_%*?."];
        }
    
        // Si todas las validaciones son correctas
        return [true, "Contraseña válida"];
    }
}