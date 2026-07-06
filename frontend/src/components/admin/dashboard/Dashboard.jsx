import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import DashboardOverview from "./DashboardOverview";
import { getAdminDashboardAnalytics } from "../../../store/actions";

const Dashboard = () => {

    const dispatch = useDispatch();

    const { analytics, isLoading, errorMessage } = useSelector((state) => state.adminAnalytics);

    useEffect(() => {
        dispatch(getAdminDashboardAnalytics());
    }, [dispatch]);

    return (
        <DashboardOverview
            analytics={analytics}
            isLoading={isLoading}
            errorMessage={errorMessage}
        />
    );
};

export default Dashboard;
