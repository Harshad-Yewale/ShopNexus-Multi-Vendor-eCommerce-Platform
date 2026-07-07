import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { OrderTable } from "./OrderTable";
import useOrderFilter from "../../filter and pagination/useOrderFilter";
import { useSelector } from "react-redux";
import OrderFilter from "./OrderFilter";

function AdminOrders() {
  const { adminOrder, pagination } = useSelector((state) => state.orders);

  useOrderFilter();

  const emptyOrder = !adminOrder || adminOrder.length === 0;

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
       <OrderFilter/>
      <div className="mx-auto w-full max-w-7xl">
        {emptyOrder ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <FaShoppingCart
              size={48}
              className="mb-4 text-slate-500"
            />
            <h2 className="text-xl font-semibold text-slate-700 sm:text-2xl">
              No Orders Placed Yet
            </h2>
          </div>
        ) : (
          <div className="overflow-hidden ">
           
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