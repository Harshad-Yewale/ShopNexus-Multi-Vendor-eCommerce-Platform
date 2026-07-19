import React from "react";

const getStatusColor = (status) => {
  switch (status) {
    case "CONFIRMED":
      return "bg-green-100 text-green-700";

    case "CANCELLED":
      return "bg-red-100 text-red-700";

    case "PENDING_PAYMENT":
      return "bg-yellow-100 text-yellow-700";

    case "DELIVERED":
      return "bg-emerald-100 text-emerald-700";

    case "SHIPPED":
      return "bg-blue-100 text-blue-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getPaymentColor = (status) => {
  switch (status) {
    case "SUCCESS":
      return "text-green-600";

    case "FAILED":
      return "text-red-600";

    case "PENDING":
      return "text-yellow-600";

    default:
      return "text-gray-600";
  }
};

export const OrderCard = ({ order }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      {/* Header */}

      <div className="flex flex-col gap-4 border-b p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-slate-500">
            Order #{order.orderId}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {order.orderDate}
          </p>
        </div>

        <div className="text-right">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
              order.orderStatus
            )}`}
          >
            {order.orderStatus.replaceAll("_", " ")}
          </span>

          <h3 className="mt-3 text-2xl font-bold text-slate-800">
            ₹{order.totalAmount.toFixed(2)}
          </h3>
        </div>
      </div>

      {/* Products */}

      <div className="divide-y">
        {order.orderItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-5 p-5"
          >
            <img
              src={item.productImage}
              alt={item.productName}
              className="h-24 w-24 rounded-lg border object-contain"
            />

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-800">
                {item.productName}
              </h3>

              <p className="mt-1 text-sm text-slate-500 line-clamp-2">
                {item.productDescription}
              </p>

              <div className="mt-3 flex flex-wrap gap-6 text-sm text-slate-600">
                <span>
                  Quantity :
                  <strong className="ml-1">{item.quantity}</strong>
                </span>

                <span>
                  Discount :
                  <strong className="ml-1">{item.discount}%</strong>
                </span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-slate-800">
                ₹{item.productDiscountedPrice}
              </p>

              <p className="text-sm text-slate-400 line-through">
                ₹{item.productPrice}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}

      <div className="grid gap-6 bg-slate-50 p-6 text-sm md:grid-cols-3">
        <div>
          <p className="text-slate-500">Payment Method</p>

          <p className="mt-1 font-semibold text-slate-800">
            {order.payment.paymentMethod}
          </p>
        </div>

        <div>
          <p className="text-slate-500">Payment Status</p>

          <p
            className={`mt-1 font-semibold ${getPaymentColor(
              order.payment.paymentStatus
            )}`}
          >
            {order.payment.paymentStatus}
          </p>
        </div>

        <div>
          <p className="text-slate-500">Gateway</p>

          <p className="mt-1 font-semibold text-slate-800">
            {order.payment.gatewayName}
          </p>
        </div>
      </div>
    </div>
  );
};