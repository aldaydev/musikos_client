import { useEffect, useState } from "react";
import useFetch from "../../../utils/useFetch";

const DashboardComms = ({userId}) => {

    const { fetchRes, fetchReq, fetchItem } = useFetch();

    const [comms, setComms] = useState(null);

    useEffect(()=>{
        if(userId){
            fetchReq({
                endpoint: `/comms/usercomm?user_id=${userId}`,
                method: 'GET',
                item: 'usercomm'
            });
        }
    },[userId]);

    useEffect(()=>{
        
        if(fetchRes && fetchItem === 'usercomm'){
            console.log(fetchRes);
            setComms(fetchRes);
        }
    },[fetchRes, fetchItem])

    return (
        <section className="dashboard__accountContainer">
            <h2 className='dashboard__profileTitle'>COMUNICADOS</h2>
            {comms && comms.map((comm, index) => {
                return(
                    <div key={index} className='dashboard__comm'>
                        <h3 className='dashboard__commTitle'>{comm.title}</h3>
                        <p className='dashboard__commText'>{comm.message}</p>
                    </div>
                )
            })}
        </section>
    );
}

export default DashboardComms;