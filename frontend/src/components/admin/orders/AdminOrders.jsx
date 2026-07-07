import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { OrderTable } from "./OrderTable";
import OrderFilter from "./OrderFilter";
import useOrderFilter from "../../filter and pagination/useOrderFilter";

function AdminOrders() {
  const { adminOrder, pagination, isLoading } = useSelector(
    (state) => state.orders
  );

  useOrderFilter();

  const emptyOrder = !adminOrder || adminOrder.length === 0;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Order Management
        </h1>

        <p className="mt-1 text-slate-500">
          Track customer orders, update status and manage deliveries.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <OrderFilter />
      </div>

      {/* Orders Card */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {isLoading ? (
          <div className="flex h-80 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : emptyOrder ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FaShoppingCart
              size={70}
              className="mb-5 text-slate-400"
            />

            <h2 className="mb-2 text-2xl font-semibold text-slate-700">
              No Orders Yet
            </h2>

            <p className="text-sm text-slate-500">
              Customer orders will appear here once purchases are made.
            </p>
          </div>
        ) : (
          <div className="w-full">
            <OrderTable
              adminOrder={adminOrder}
              pagination={pagination}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;