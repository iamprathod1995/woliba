import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const welcome = localStorage.getItem('welcome');
  return welcome 
    ? <Outlet />
    : <Navigate to="/" replace />;
};

export default PrivateRoute;