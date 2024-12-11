import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }
  
  const token = getCookie("token");
  
  const isAuthenticated = token ? true : false;
  

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;