export default {
    signIn: async(signUpData) => {
        try{
            const response = await fetch('http://127.0.0.1:3001/bandbros/v1/musicians/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signUpData),
            });

            if(!response.ok){
                return console.log('Error al hacer signUp fetch');
            }

            const data = await response.json();
            console.log(data);
            return data;
        }catch(e){
            console.log(e);
        }
        
    }
}