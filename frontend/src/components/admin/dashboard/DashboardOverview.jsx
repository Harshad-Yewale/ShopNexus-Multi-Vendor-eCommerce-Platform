import React from "react";

import StatsCard from "./StatsCard";
import RevenueLineChart from "./RevenueLineChart";
import OrdersBarChart from "./OrdersBarChart";
import UsersBarChart from "./UsersBarChart";
import OrderStatusPieChart from "./OrderStatusPieChart";

const DashboardOverview = ({ analytics, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Loading...
      </div>
    );
  }
  return(
    <>
    <StatsCard analytics={analytics}/>
    <RevenueLineChart  revenueChart={analytics?.revenueChart}/>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <OrdersBarChart ordersPerMonthChart={analytics?.ordersPerMonthChart}/>
          <UsersBarChart usersPerMonthChart={analytics?.usersPerMonthChart}/>
    </div>
    <div className="mt-6">
        <OrderStatusPieChart
            orderStatusChart={analytics?.orderStatusChart} />
    </div>
    </>
  )
};

export default DashboardOverview;