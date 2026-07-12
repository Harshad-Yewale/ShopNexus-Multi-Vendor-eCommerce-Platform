import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { OrderCard } from "../components/orders/orderCard";
import Paginations from "../components/filter and pagination/pagination";
import useOrderFilter from "../components/filter and pagination/useOrderFilter";

function MyOrdersPage() {
  const { userOrders, userPagination, isLoading } = useSelector(
    (state) => state.orders
  );

  const { user } = useSelector((state) => state.auth);

  useOrderFilter(user);

  const emptyOrder = !userOrders || userOrders.length === 0;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Your Orders
          </h1>

          <p className="mt-2 text-slate-500">
            View all your previous purchases and payment history.
          </p>
        </div>

        {/* Orders */}
        {isLoading ? (
          <div className="flex h-80 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : emptyOrder ? (
          <div className="rounded-2xl bg-white py-20 shadow-sm">
            <div className="flex flex-col items-center">
              <FaShoppingCart
                size={70}
                className="mb-5 text-slate-400"
              />

              <h2 className="text-2xl font-semibold text-slate-700">
                No Orders Yet
              </h2>

              <p className="mt-2 text-slate-500">
                Looks like you haven't placed any orders yet.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {userOrders.map((order) => (
                <OrderCard key={order.orderId} order={order} />
              ))}
            </div>

            <div className="mt-8">
              {!emptyOrder && userPagination?.totalPages > 1 && (
              <Paginations numberOfPages={userPagination.totalPages} />
            )}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default MyOrdersPage;