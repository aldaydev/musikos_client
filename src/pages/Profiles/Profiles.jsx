import { useEffect } from 'react';
import DashboardAccount from './components/DashboardAccount';
import DashboardProfile from './components/DashboardProfile';
import './dashboard.css';
import useFetch from '../../utils/useFetch';
import ErrorModal from '../../components/Modals/ErrorModal';
import { useNavigate } from 'react-router-dom';

function Dashboard (){

    const { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError } = useFetch();

    const navigate = useNavigate();

    useEffect(()=>{
        fetchReq({
            endpoint: '/musicians/public-data',
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

export default Dashboard;