import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; 

const ProtectedFromNoAuth = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return !isLoggedIn ? <Navigate to="/login" replace /> : <Outlet />;
};

export default ProtectedFromNoAuth;