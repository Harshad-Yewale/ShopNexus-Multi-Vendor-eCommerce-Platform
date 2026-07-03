import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentMethod, createUserCart } from "../../store/actions";

const PaymentMethod = () => {
    const dispatch = useDispatch();

    const { paymentMethod } = useSelector((state) => state.payment);
    const { cart, cartId, isLoading, errorMessage } = useSelector(
        (state) => state.cart
    );

    useEffect(() => {
        if (cart.length > 0 && !cartId && !errorMessage) {
            const sendCartItems = cart.map((item) => ({
                productId: item.productId,
                quantity: item.productQuantity,
            }));

            dispatch(createUserCart(sendCartItems));
        }
    }, [dispatch, cart, cartId, errorMessage]);

    const paymentMethodHandler = (method) => {
        dispatch(addPaymentMethod(method));
    };

    return (
        <div className="max-w-lg mx-auto mt-12 px-4">
            <div className="bg-white border rounded-xl shadow-sm p-6">
                <h1 className="text-2xl font-semibold">
                    Select Payment Method
                </h1>

                <p className="text-gray-500 text-sm mt-1 mb-6">
                    Choose your preferred payment option.
                </p>

                <FormControl fullWidth>
                    <RadioGroup
                        name="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) =>
                            paymentMethodHandler(e.target.value)
                        }
                    >
                        <div className="border rounded-lg px-4 py-3 mb-3 hover:border-blue-500 transition">
                            <FormControlLabel
                                value="Stripe"
                                control={<Radio />}
                                label="Stripe"
                            />
                        </div>

                        <div className="border rounded-lg px-4 py-3 hover:border-blue-500 transition">
                            <FormControlLabel
                                value="Paypal"
                                control={<Radio />}
                                label="PayPal"
                            />
                        </div>
                    </RadioGroup>
                </FormControl>

                {isLoading && (
                    <p className="text-sm text-gray-500 mt-4">
                        Creating your cart...
                    </p>
                )}

                {errorMessage && (
                    <p className="text-sm text-red-500 mt-4">
                        {errorMessage}
                    </p>
                )}
            </div>
        </div>
    );
};

export default PaymentMethod;