import { Button, Step, StepLabel, Stepper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AddressInfo from '../components/Checkout/AddressInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddresses } from '../store/actions';
import AddressSkeletonLoader from '../components/Checkout/AddressSkeletonLoader';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import PaymentMethod from '../components/Checkout/PaymentMethod';
import OrderSummary from '../components/Checkout/OrderSummary';
import PaypalPayment from '../components/Checkout/PaypalPayment';
import StripePayment from '../components/Checkout/StripePayment';

const CheckoutPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch();
    const { isLoading, errorMessage } = useSelector((state) => state.auth);
    const{ cart, totalPrice } =useSelector((state) =>state.cart);

    const { address , selectedUserCheckoutAddress} = useSelector(
        (state) => state.auth
    )

    const  { paymentMethod } = useSelector((state) => state.payment);

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleNext = () => {
        if(activeStep === 0 && !selectedUserCheckoutAddress) {
            toast.error("Please select checkout address before proceeding.");
            return;
        }

        if(activeStep === 1 && (!selectedUserCheckoutAddress || !paymentMethod)) {
            toast.error("Please select payment address before proceeding.");
            return;
        }
        
        setActiveStep((prevStep) => prevStep + 1);
    };

    const steps = [
        "Address",
        "Payment Method",
        "Order Summary",
        "Payment",
    ];

     useEffect(() => {
        dispatch(getUserAddresses());
    }, [dispatch]);

    return (
        <div className="bg-slate-50 min-h-[calc(100vh-70px)] py-8 pb-24">
            <div className="max-w-6xl mx-auto px-4">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Checkout
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Complete your purchase in a few simple steps.
                    </p>
                </div>

                {/* Stepper */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label, index) => (
                            <Step key={index}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </div>

                {/* Step Content */}
                {isLoading?( <div className='lg:w-[80%] mx-auto py-5'>
                       <div className="flex flex-col items-center justify-center min-h-[60vh]">
                            <DotLottieReact
                            src="\animations\checkout.json"
                            loop
                            autoplay
                            style={{ width: '280px', height: '280px' }}
                            />
                            <h2 className="text-2xl font-semibold mt-4">
                                Hold On....
                            </h2>
                            <p className="text-gray-500 mt-2">
                                Getting steps for checkout
                            </p>
                        </div>
                    </div>):(errorMessage?(
                        <div className="flex flex-col items-center justify-center min-h-[60vh]">
                            <DotLottieReact
                            src="\animations\error.json"
                            loop
                            autoplay
                            style={{ width: '280px', height: '280px' }}
                            />
                            <h2 className="text-2xl font-semibold mt-4">
                                oops
                            </h2>
                            <p className="text-gray-500 mt-2">
                                {errorMessage}
                            </p>
                        </div>
                    ):(<div className="mt-6 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        {activeStep === 0 && (<AddressInfo address={address} />)}
                        {activeStep === 1 && <PaymentMethod />}
                        {activeStep === 2 && <OrderSummary 
                                        totalPrice={totalPrice}
                                        cart={cart}
                                        address={selectedUserCheckoutAddress}
                                        paymentMethod={paymentMethod}/>}
                        {activeStep === 3 && 
                                <>
                                    {paymentMethod === "Stripe" ? (
                                        <StripePayment />
                                    ) : (
                                        <PaypalPayment />
                                    )}
                                </>
                        }
                    </div>)
                     
                )}
               

            </div>

            {/* Bottom Navigation */}
            <div
                className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 shadow-lg"
            >
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">

                    <Button
                        variant="outlined"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                    >
                        Back
                    </Button>

                    {activeStep !== steps.length - 1 && (
                        <button
                            disabled={
                                errorMessage ||
                                (activeStep === 0
                                    ? !selectedUserCheckoutAddress
                                    : activeStep === 1
                                    ? !paymentMethod
                                    : false)
                            }
                            onClick={handleNext}
                            className={`px-8 h-11 rounded-lg font-semibold text-white transition
                            ${
                                errorMessage ||
                                (activeStep === 0 &&
                                    !selectedUserCheckoutAddress) ||
                                (activeStep === 1 && !paymentMethod)
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            Proceed
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;