export default function setErrorMessage (type, error, username){
    let result;
    if(type === 'confirmation'){
        switch (error){
            case 'expired':
                result = {
                    title: 'Enlace caducado',
                    message: 'El enlace de confirmación ha caducado. Si necesitas que te mandemos un nuevo email de confirmación pulsa en el siguiente enlace: ',
                    username: username,
                    link: true
                }
                break;
            case 'already-confirmed':
                result = {
                    title: 'Ya confirmado',
                    message: 'Ya confirmaste tu cuenta anteriormente. Puedes acceder con tus datos en el apartado "ACCEDE A TU CUENTA" en esta misma página.'
                }
                break;
            case 'incorrect':
                result = {
                    title: 'Enlace incorrecto',
                    message: 'En enlace de confirmación ha sido maniplado o es incorrecto. Si necesitas que te mandemos un nuevo email de confirmación pulsa en el siguiente enlace: ',
                    username: username,
                    link: true
                }
                break;
            case 'external', 'unexpected':
                result = {
                    title: 'Error interno',
                    message: 'Ha habido un problema interno a la hora de confirmar tu cuenta. Por favor, prueba dentro de unos minutos o solicita un nuevo email de confirmación en el siguiente enlace: ',
                    username: username,
                    link: true
                }

        }
    }

    if(type === 'recoverPassword'){
        switch (error){
            case 'expired':
                result = {
                    title: 'Enlace caducado',
                    message: 'El enlace para reestablecer tu contraseña ha caducado. Solicítalo de nuevo pulsando en "He olvidado mi contraseña" en esta misma página.'
                }
                break;
            case 'incorrect':
                result = {
                    title: 'Enlace incorrecto',
                    message: 'En enlace para reestablecer tu contraseña ha sido maniplado o es incorrecto. Solicítalo de nuevo pulsando en "He olvidado mi contraseña" en esta misma página.'
                }
                break;
            case 'external', 'unexpected':
                result = {
                    title: 'Error interno',
                    message: 'Ha habido un problema interno a la hora de reestablecer tu contraseña. Por favor, prueba dentro de unos minutos.'
                }
        }
    }

    return result;
}