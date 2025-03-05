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
    },

    year: (year) => {

        if(!year){
            return [false, "Año oblidatorio"];
        }

        if(year.length !== 4){
            return [false, "Año incorrecto"];
        }

        //Creating object from birthdate
        const thisYear = new Date().getFullYear();
        
        if(thisYear - year >= 100){
            return [false, "Edad máxima 99 años"];
        }else if(thisYear - year < 16){
            return [false, "Edad mínima 16 años"];
        } 

        // Si todas las validaciones son correctas
        return [true, "Año válido"];
    },

    month: (month) => {
        if(month.length > 2){
            return [false, "Mes incorrecto"];
        }

        if(month < 1 || month > 12){
            return [false, "Mes incorrecto"];
        }

        // Si todas las validaciones son correctas
        return [true, "Mes válido"];
    },

    day: (day) => {
        if(day.length > 2){
            return [false, "Día incorrecto"];
        }

        if(day < 1 || day > 31){
            return [false, "Día incorrecto"];
        }

        // Si todas las validaciones son correctas
        return [true, "Día válido"];
    },

    birthdate: ({day, month, year}) =>{

        if(!day || !month || !year){
            return [false, "Campo obligatorio"];
        }

        // Validación del año
        if (year.length !== 4) {
            return [false, "Año incorrecto"];
        }

        // Validación del mes
        if (month < 1 || month > 12) {
            return [false, "Mes incorrecto"];
        }

        // Verificación de días según el mes y si es bisiesto
        //En JavaScript, si el día es 0, se obtiene el último día del mes anterior.
        const daysInMonth = new Date(year, month, 0).getDate();
        if (day < 1 || day > daysInMonth) {
            //El día debe estar entre 1 y ${daysInMonth} para el mes ${month}
            return [false, `Día incorrecto`];
        }

        // Verificación de la edad (entre 16 y 99 años)
        const today = new Date();
        //Month -1 porque en JS los meses van de 0 a 11
        const birthDate = new Date(year, month - 1, day);
        let age = today.getFullYear() - birthDate.getFullYear();

        // Ajuste si el cumpleaños aún no ha ocurrido este año
        if (
            today.getMonth() < birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        if (age < 16 || age > 99) {
            return [false, "La edad debe estar entre 16 y 99 años"];
        }

        return [true, "Fecha válida"];
    
    }
}