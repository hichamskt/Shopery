import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ children }) => {
    const { auth } = useAuth();
    const location = useLocation();

    
    if (!auth) {
       
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    
    return children;
};

export default RequireAuth;