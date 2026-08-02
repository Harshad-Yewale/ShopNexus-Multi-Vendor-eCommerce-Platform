import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({publicPage = false, adminOnly = false, sellerOnly = false, userOnly=false }) => {
    const { user } = useSelector((state) => state.auth);
    
    if (publicPage) {
        return user ? <Navigate to="/" replace /> : <Outlet />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const isAdmin = user.roles?.includes("ROLE_ADMIN");
    const isSeller = user.roles?.includes("ROLE_SELLER");
    const isUserOnly = user.roles?.includes("ROLE_USER") && user.roles?.length == 1;

    if(userOnly && !isUserOnly){
        return <Navigate to="/" replace/>;
    }

    if (adminOnly && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    if (sellerOnly && !isSeller) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;