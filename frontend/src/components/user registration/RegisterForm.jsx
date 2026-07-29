import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import InputField from "../shared/InputField";
import { sendRegistrationOtp } from "../../store/actions";

const RegisterForm = ({ setStep, setRegistrationData }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: "onTouched"
    });

    const registerHandler = async (data) => {
            await dispatch(sendRegistrationOtp(data,setLoader,toast,setRegistrationData,setStep));
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(registerHandler)}
                className="mt-8 space-y-5"
            >
                <InputField
                    label="Username"
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    register={register}
                    errors={errors}
                    required
                    message="Username is required"
                    minLength={3}
                    minLengthMessage="Username must be at least 3 characters"
                />

                <InputField
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    register={register}
                    errors={errors}
                    required
                    message="Email is required"
                />

                <InputField
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    register={register}
                    errors={errors}
                    required
                    message="Password is required"
                    minLength={6}
                    minLengthMessage="Password must be at least 6 characters"
                />

                <button
                    type="submit"
                    disabled={loader}
                    className="w-full rounded-xl bg-linear-to-r from-blue-600 to-sky-500 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {loader ? "Sending OTP..." : "Continue"}
                </button>
            </form>
            <div className="mt-6 text-center text-slate-600">
                Already have an account?
                <Link
                    to="/login"
                    className="ml-1 font-semibold text-blue-600 hover:text-blue-700"
                >
                    Login
                </Link>
            </div>
        </>
    );
};

export default RegisterForm;