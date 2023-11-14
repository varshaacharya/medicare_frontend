import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import ApplicationStore from "./utils/localStorageUtil";


const ProtectedStudentRoutes = () => {
    const userToken = ApplicationStore().getStorage('token');
    const user_type = ApplicationStore().getStorage('user_type');
    return userToken && user_type == "medical" ? <Outlet /> : <Navigate replace to="/login" />;
}

export default ProtectedStudentRoutes;