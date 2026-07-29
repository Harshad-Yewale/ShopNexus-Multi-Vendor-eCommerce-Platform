import React, { useState } from "react";
import { FaUserPlus, FaEnvelope } from "react-icons/fa";
import RegisterForm from "../components/user registration/RegisterForm";
import VerifyRegistrationOtp from "../components/user registration/VeifyRegistrationOtp";

const RegisterPage = () => {
    const [step, setStep] = useState("REGISTER");
    const [registrationData, setRegistrationData] = useState(null);

    return (
        <div className="min-h-[calc(100vh-70px)] bg-linear-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
                {/* Left Section */}
                <div className="hidden lg:flex flex-col justify-center">
                    <span className="inline-block w-fit rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700 mb-6">
                        Join ShopNexus
                    </span>

                    <h1 className="text-5xl font-extrabold leading-tight text-slate-900">
                        {step === "REGISTER"
                            ? "Create your account and"
                            : "Verify your email"}
                        <span className="block bg-linear-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                            {step === "REGISTER"
                                ? "start shopping smarter."
                                : "activate your account."}
                        </span>
                    </h1>

                    <p className="mt-6 text-lg text-slate-600 leading-8 max-w-lg">
                        {step === "REGISTER"
                            ? "Discover products from trusted sellers, track your orders, save your favourites and enjoy a seamless shopping experience."
                            : "We've sent a 6-digit verification code to your email. Enter it to complete your registration."}
                    </p>
                </div>

                {/* Right Section */}
                <div className="flex justify-center">
                    <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8">
                        <div className="flex flex-col items-center">
                            <div className="h-20 w-20 rounded-full bg-linear-to-r from-blue-600 to-sky-500 flex items-center justify-center shadow-lg">
                                {step === "REGISTER" ? (
                                    <FaUserPlus className="text-3xl text-white" />
                                ) : (
                                    <FaEnvelope className="text-3xl text-white" />
                                )}
                            </div>

                            <h2 className="mt-5 text-3xl font-bold text-slate-900">
                                {step === "REGISTER"
                                    ? "Create Account"
                                    : "Verify Email"}
                            </h2>

                            <p className="mt-2 text-center text-slate-500">
                                {step === "REGISTER"
                                    ? "Register to start shopping with ShopNexus."
                                    : `OTP sent to ${registrationData?.email}`}
                            </p>
                        </div>

                        {step === "REGISTER" ? (
                            <RegisterForm
                                setStep={setStep}
                                setRegistrationData={setRegistrationData}
                            />
                        ) : (
                            <VerifyRegistrationOtp
                                registrationData={registrationData}
                                setStep={setStep}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;