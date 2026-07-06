import React from "react";

import StatsCard from "./StatsCard";
import RevenueLineChart from "./RevenueLineChart";
import OrdersBarChart from "./OrdersBarChart";
import UsersBarChart from "./UsersBarChart";
import OrderStatusPieChart from "./OrderStatusPieChart";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const DashboardOverview = ({ analytics, isLoading }) => {
  if (isLoading) {
    return (
      <div className='lg:w-[80%] mx-auto py-5'>
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <DotLottieReact
              src="\animations\analyticsLoading.json"
              loop
              autoplay
              style={{ width: '280px', height: '280px' }}
              />
              <h2 className="text-2xl font-semibold mt-4">
                  Hold On....
              </h2>
              <p className="text-gray-500 mt-2">
                  Analysis in Progress...
              </p>
          </div>
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