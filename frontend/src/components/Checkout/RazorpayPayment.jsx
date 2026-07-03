import React, { useState } from "react";
import { Alert, AlertTitle, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearUserCart, verifyPayment } from "../../store/actions";

import {createPendingOrder, createRazorpayOrder,} from "../../store/actions";
import { useNavigate } from "react-router-dom";

const RazorpayPayment = () => {
    const dispatch = useDispatch();

    const Navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const { selectedUserCheckoutAddress } = useSelector(
        (state) => state.auth
    );


    

    const handlePayment = async () => {
        try {
            setLoading(true);

            if (!selectedUserCheckoutAddress) {
                toast.error("Please select an address.");
                return;
            }

            const order = await dispatch(
                createPendingOrder(selectedUserCheckoutAddress.addressId, toast)
            );

            if (!order) return;

           
            const razorpayOrder = await dispatch(createRazorpayOrder(order.orderId, toast) );

            if (!razorpayOrder) return;

           
            const options = {
                key: razorpayOrder.key,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                order_id: razorpayOrder.gatewayOrderId,

                name: "ShopNexus",
                description: "Complete your purchase",

               handler: async function (response) {

                    const verifiedOrder = await dispatch(
                        verifyPayment(
                            {
                                orderId: order.orderId,
                                gatewayOrderId: response.razorpay_order_id,
                                gatewayPaymentId: response.razorpay_payment_id,
                                gatewaySignature: response.razorpay_signature,
                            },toast)
                    );

                    if (!verifiedOrder) {
                        return;
                    }
                    Navigate("/order-confirmation", {
                              state: {
                                  orderId: order.orderId,
                                  paymentId: response.razorpay_payment_id,
                                  amount: razorpayOrder.amount,
                                  currency: razorpayOrder.currency,
                              },
                          });
                },

                prefill: {
                    name: "",
                    email: "",
                    contact: "",
                },

                theme: {
                    color: "#2563eb",
                },

                modal: {
                    ondismiss: function () {
                        toast("Payment cancelled.", {
                            icon: "⚠️",
                        });
                    },
                },
            };

            const razorpay = new window.Razorpay(options);

            razorpay.on("payment.failed", function (response) {
                toast.error("Payment failed.");
            });
            razorpay.open();
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-6 py-10">
            <Alert
                severity="info"
                variant="filled"
                style={{ maxWidth: "500px" }}
            >
                <AlertTitle>Razorpay Payment</AlertTitle>

                Click the button below to proceed with your payment.
            </Alert>

            <Button
                variant="contained"
                size="large"
                onClick={handlePayment}
                disabled={loading}
            >
                {loading ? "Please Wait..." : "Pay Now"}
            </Button>
        </div>
    );
};

export default RazorpayPayment;