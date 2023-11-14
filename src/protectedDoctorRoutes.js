import { Outlet, Navigate } from "react-router-dom";
import ApplicationStore from "./utils/localStorageUtil";

const ProtectedStudentRoutes = () => {
    const userToken = ApplicationStore().getStorage('token');
    const user_type = ApplicationStore().getStorage('user_type');
    

    // Allowed user types
    const allowedUserTypes = ["medical", "user", "doctor"];

    // Check if the user has an allowed user type
    const isAllowedUserType = allowedUserTypes.includes(user_type);

    return userToken && isAllowedUserType ? <Outlet /> : <Navigate replace to="/login" />;
}

export default ProtectedStudentRoutes;
