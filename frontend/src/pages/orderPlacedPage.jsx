import React, { useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FaArrowRight, FaShoppingBag } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { clearUserCart } from "../store/actions";


const OrderPlacedPage = () => {

  const location = useLocation();
   const dispatch = useDispatch();

  useEffect(() => {
      dispatch(clearUserCart());
    }, [dispatch]);

  // Redirect if user visits this page directly
  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  const { orderId, paymentId, amount, currency } = location.state;

  const formattedAmount = amount
    ? `₹${(amount / 100).toLocaleString("en-IN")}`
    : "--";

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-70px)] py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            Order Confirmation
          </h1>

          <p className="text-slate-500 mt-1">
            Your payment has been received successfully.
          </p>
        </div>

        {/* Success Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <DotLottieReact
            src="/animations/orderPlaced.json"
            loop={true}
            autoplay
            style={{ width: "240px", height: "240px", margin: "0 auto" }}
          />

          <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
            Order Confirmed 🎉
          </span>

          <h2 className="mt-5 text-3xl font-bold text-slate-800">
            Thank You for Your Purchase!
          </h2>

          <p className="mt-3 max-w-2xl mx-auto text-slate-500">
            We've received your order and our team has already started preparing
            it. 
          </p>
        </div>

        {/* Order Details */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="border-b border-slate-200 px-6 py-4">
            <h3 className="text-xl font-semibold text-slate-800">
              Order Details
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-6">
            <div>
              <p className="text-sm text-slate-500">Order ID</p>
              <p className="mt-1 font-semibold text-slate-800">
                #{orderId}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Payment ID</p>
              <p className="mt-1 font-semibold text-slate-800 break-all">
                {paymentId}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Amount Paid</p>
              <p className="mt-1 font-semibold text-green-600">
                {formattedAmount}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Currency</p>
              <p className="mt-1 font-semibold text-slate-800">
                {currency}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Payment Status</p>
              <p className="mt-1 font-semibold text-green-600">
                Successful
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Order Status</p>
              <p className="mt-1 font-semibold text-blue-600">
                Confirmed
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Estimated Delivery</p>
              <p className="mt-1 font-semibold text-slate-800">
                2 - 5 Business Days
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Support</p>
              <p className="mt-1 font-semibold text-slate-800">
                Contact us if you need any assistance.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/profile/orders"
            className="flex items-center justify-center gap-2 px-8 h-11 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            <FaShoppingBag />
            View My Orders
          </Link>

          <Link
            to="/products"
            className="flex items-center justify-center gap-2 px-8 h-11 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-semibold transition"
          >
            Continue Shopping
            <FaArrowRight />
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-slate-500 text-sm">
          Thank you for shopping with <span className="font-semibold">ShopNexus</span>.
          We appreciate your trust and hope to see you again soon.
        </div>
      </div>
    </div>
  );
};

export default OrderPlacedPage;