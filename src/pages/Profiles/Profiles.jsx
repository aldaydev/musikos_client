import { useEffect } from 'react';
import useFetch from '../../utils/useFetch';
import ErrorModal from '../../components/Modals/ErrorModal';
import { useNavigate, useParams } from 'react-router-dom';

function Profile (){

    const { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError } = useFetch();

    const navigate = useNavigate();
    const params = useParams();

    useEffect(()=>{
        console.log(params);
        fetchReq({
            endpoint: `/musicians/${params.user}`,
            method: 'GET',
            item: 'musicianPublicData'
        });
    },[])

    return(
        <div className="dashboard__container">
            

            {fetchError && <ErrorModal
                error={fetchError} 
                setError={setFetchError}
                setItem={setFetchItem}
            />}
            
        </div>
    )
}

export default Profile;