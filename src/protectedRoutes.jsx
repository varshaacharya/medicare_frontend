import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import ApplicationStore from "./utils/localStorageUtil";


const ProtectedRoutes = () => {
    const userToken = ApplicationStore().getStorage('token');
    const user_type = ApplicationStore().getStorage('user_type');
    return userToken && user_type == "admin"? <Outlet /> : <Navigate replace to="/login" />;
}

export default ProtectedRoutes;