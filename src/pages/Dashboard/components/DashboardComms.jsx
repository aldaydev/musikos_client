import { useEffect } from "react";
import useFetch from "../../../utils/useFetch";

const DashboardComms = ({userId}) => {

    const { fetchRes, fetchReq } = useFetch();

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
        console.log(fetchRes);
    },[fetchRes])

    return (
        <section className="dashboard__accountContainer">
            <h2 className='dashboard__profileTitle'>COMUNICADOS</h2>
            {fetchRes && fetchRes.map((comm, index) => {
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