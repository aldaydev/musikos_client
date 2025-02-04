// import loading_animation from '../assets/animations/tube-spinner.svg';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Loading = () =>{

    return(
        <div >
            {/* <img src={loading_animation} alt="Loading animation" style={{width: '100px'}}/> */}
            <DotLottieReact
            src="https://lottie.host/8ae8f523-3f31-4736-b127-a54a14846f7e/OLN32mFQfU.lottie"
            loop
            autoplay
            />
        </div>
    )
}

export default Loading;