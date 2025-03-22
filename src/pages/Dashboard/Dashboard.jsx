import { useEffect, useState } from 'react';
import DashboardAccount from './components/DashboardAccount';
import DashboardProfile from './components/DashboardProfile';
import './dashboard.css';
import useFetch from '../../utils/useFetch';
import ErrorModal from '../../components/Modals/ErrorModal';
import { useNavigate } from 'react-router-dom';
import DashboardComms from './components/DashboardComms';

function Dashboard (){

    const { fetchRes, isLoading, fetchError, fetchReq, fetchItem, setFetchItem, setFetchError } = useFetch();

    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);

    useEffect(()=>{
        fetchReq({
            endpoint: '/musicians/restricted-data',
            method: 'GET',
            item: 'musicianRestrictedData',
            credentials: 'include'
        });
    },[])

    useEffect(() => {
        if(fetchError && fetchItem === 'musicianRestrictedData'){
            fetchReq({
                endpoint: '/auth/clear-cookies',
                method: 'DELETE',
                item: 'clearCookies',
                credentials: 'include'
            });
        }
    },[fetchError])

    useEffect(() => {

        if(fetchItem === 'clearCookies'){
            setFetchItem(null);
            navigate('/');
            window.location.reload();
            sessionStorage.auth = JSON.stringify({verified: false});
        }

        if(fetchRes && fetchItem === 'musicianRestrictedData'){
            console.log('Entra aquí');
            setUserData(fetchRes);
        }
    }, [fetchRes])

    return(
        <div className="dashboard__container">
            <DashboardAccount userData={userData && userData}/>
            <DashboardProfile userData={userData && userData}/>
            <DashboardComms userId={userData && userData.id}/>

            {fetchError && <ErrorModal
                error={fetchError} 
                setError={setFetchError}
                setItem={setFetchItem}
            />}
            
        </div>
    )
}

export default Dashboard;