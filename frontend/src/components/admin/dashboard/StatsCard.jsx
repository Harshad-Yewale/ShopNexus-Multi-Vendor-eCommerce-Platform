import React from 'react'
import { FaBoxOpen, FaShoppingCart, FaUser  } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";

function StatsCard({analytics}) {
 const cards = [
    {
      title: "Total Users",
      value: analytics?.totalUsers || 0,
      icon: <FaUser />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Products",
      value: analytics?.totalProducts || 0,
      icon: <FaBoxOpen />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Confirmed Orders",
      value: analytics?.totalConfirmedOrders || 0,
      icon: <FaShoppingCart />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Revenue",
      value: `₹${analytics?.totalRevenue?.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) || "0.00"}`,
      icon: <FaIndianRupeeSign />,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="p-6">

      {/* Stats Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex justify-between items-center"
          >
            <div>
              <p className="text-gray-500 text-sm font-medium">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-2 text-gray-800">
                {card.value}
              </h2>
            </div>

            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${card.color}`}
            >
              {card.icon}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default StatsCard
