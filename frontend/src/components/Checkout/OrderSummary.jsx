import React from "react";
import { formatPrice } from "../../utils/FormatPrice";

const OrderSummary = ({ totalPrice, cart, address, paymentMethod }) => {
    return (
        <div className="container mx-auto max-w-6xl px-4 py-6">
            <div className="grid lg:grid-cols-3 gap-6">

                {/* Left Section */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Billing Address */}
                    <div className="bg-white border rounded-xl shadow-sm p-5">
                        <h2 className="text-xl font-semibold mb-4">Billing Address</h2>

                        <div className="space-y-1 text-gray-600">
                            <p><strong>Room No:</strong> {address?.roomNo}</p>
                            <p><strong>Building:</strong> {address?.building}</p>
                            <p><strong>Street:</strong> {address?.street}</p>
                            <p><strong>City:</strong> {address?.city}</p>
                            <p><strong>Pincode:</strong> {address?.pincode}</p>
                            <p><strong>Country:</strong> {address?.country}</p>
                        </div>
                    </div>

                    {/* Payment */}
                    <div className="bg-white border rounded-xl shadow-sm p-5">
                        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                        <p className="text-gray-600">
                            <strong>Method:</strong> {paymentMethod}
                        </p>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white border rounded-xl shadow-sm p-5">
                        <h2 className="text-xl font-semibold mb-4">Order Items</h2>

                        <div className="space-y-4">
                            {cart?.map((item) => (
                                <div
                                    key={item.productId}
                                    className="flex items-center justify-between border-b pb-3 last:border-0"
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={`${import.meta.env.VITE_BACK_END_URL}/images/${ item?.productImage }`}
                                            alt={item.productName}
                                            className="w-16 h-16 rounded-lg object-contain"
                                        />

                                        <div>
                                            <p className="font-medium">{item.productName}</p>
                                            <p className="text-sm text-gray-500">
                                                {item.quantity} ×{" "}
                                                {formatPrice(item.productDiscountedPrice)}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="font-semibold">
                                        {formatPrice(
                                            item.quantity * item.productDiscountedPrice
                                        )}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div>
                    <div className="bg-white border rounded-xl shadow-sm p-5 sticky top-5">
                        <h2 className="text-xl font-semibold mb-4">
                            Order Summary
                        </h2>

                        <div className="space-y-3 text-gray-700">
                            <div className="flex justify-between">
                                <span>Products</span>
                                <span>{formatPrice(totalPrice)}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>₹0.00</span>
                            </div>

                            <hr />

                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>{formatPrice(totalPrice)}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OrderSummary;