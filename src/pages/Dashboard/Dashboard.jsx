
import { useEffect, useState } from 'react';
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
    }, [fetchRes])

    return(
        <div className="dashboard__container">
            <DashboardAccount userData={fetchRes && fetchItem === 'musicianRestrictedData' && fetchRes}/>
            <DashboardProfile userData={fetchRes && fetchItem === 'musicianRestrictedData' && fetchRes}/>

            {fetchError && <ErrorModal
                error={fetchError} 
                setError={setFetchError}
                setItem={setFetchItem}
            />}
            
        </div>
    )
}

export default Dashboard;