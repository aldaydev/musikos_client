import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; 

const ProtectedFromAuth = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return isLoggedIn ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default ProtectedFromAuth;