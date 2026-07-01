import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLogin } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { authenticateSignInUser } from "../store/actions";
import InputField from "../components/shared/InputField";

const LogInPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    const loginHandler = (data) => {
        dispatch(
            authenticateSignInUser(
                data,
                toast,
                reset,
                navigate,
                setLoader
            )
        );
    };

    return (
        <div className="min-h-[calc(100vh-70px)] bg-linear-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-center">

                {/* Left Section */}
                <div className="hidden lg:flex flex-col justify-center">
                    <span className="inline-block w-fit rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700 mb-6">
                        Welcome to ShopNexus
                    </span>

                    <h1 className="text-5xl font-extrabold leading-tight text-slate-900">
                        Sign in to continue your
                        <span className="block bg-linear-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                            shopping journey.
                        </span>
                    </h1>

                    <p className="mt-6 text-lg text-slate-600 leading-8 max-w-lg">
                        Access your orders, wishlist, saved addresses and discover
                        thousands of products from trusted sellers.
                    </p>
                </div>

                {/* Login Card */}
                <div className="flex justify-center">
                    <form
                        onSubmit={handleSubmit(loginHandler)}
                        className="w-full max-w-md rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8"
                    >
                        {/* Header */}
                        <div className="flex flex-col items-center">

                            <div className="h-20 w-20 rounded-full bg-linear-to-r from-blue-600 to-sky-500 flex items-center justify-center shadow-lg">
                                <AiOutlineLogin className="text-4xl text-white" />
                            </div>

                            <h2 className="mt-5 text-3xl font-bold text-slate-900">
                                Welcome Back
                            </h2>

                            <p className="mt-2 text-slate-500 text-center">
                                Login to access your ShopNexus account.
                            </p>
                        </div>

                        <div className="mt-8 space-y-5">

                            <InputField
                                label="Username"
                                required
                                id="username"
                                type="text"
                                message="Username is required"
                                placeholder="Enter your username"
                                register={register}
                                errors={errors}
                            />

                            <InputField
                                label="Password"
                                required
                                id="password"
                                type="password"
                                message="Password is required"
                                placeholder="Enter your password"
                                register={register}
                                errors={errors}
                            />

                        </div>

                        <button
                            type="submit"
                            disabled={loader}
                            className="mt-8 w-full rounded-xl bg-linear-to-r from-blue-600 to-sky-500 py-3 font-semibold text-white transition-all duration-300 hover:shadow-xl hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loader ? "Signing In..." : "Login"}
                        </button>

                        <div className="mt-6 text-center text-slate-600">

                            Don't have an account?

                            <Link
                                to="/register"
                                className="ml-1 font-semibold text-blue-600 hover:text-blue-700"
                            >
                                Create Account
                            </Link>

                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default LogInPage;