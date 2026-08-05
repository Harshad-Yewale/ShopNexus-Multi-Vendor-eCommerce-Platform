import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    sendRegistrationOtp,
    verifyRegistrationOtp
} from "../../store/actions";

const VerifyRegistrationOtp = ({ registrationData, setStep }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);
    const [timer, setTimer] = useState(30);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const inputRefs = useRef([]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    useEffect(() => {
        if (timer <= 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const handleOtpChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;

        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        // Move to next input automatically
        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key !== "Backspace") return;

        // If current box has a value, clear it
        if (otp[index]) {
            const updatedOtp = [...otp];
            updatedOtp[index] = "";
            setOtp(updatedOtp);
            return;
        }

        // Move to previous input if current box is empty
        if (index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const verifyHandler = async () => {
        const enteredOtp = otp.join("");

        if (enteredOtp.length !== 6) {
            toast.error("Please enter the complete OTP.");
            return;
        }

        await dispatch(
            verifyRegistrationOtp(
                {
                    email: registrationData.email,
                    otp: enteredOtp
                },
                setLoader,
                toast,
                navigate
            )
        );
    };

    const resendHandler = async () => {
        if (timer > 0) return;

        await dispatch(
            sendRegistrationOtp(registrationData,setLoader,toast,() => {},() => {} )
        );

        setOtp(["", "", "", "", "", ""]);
        setTimer(30);
        inputRefs.current[0]?.focus();
    };

    return (
        <div className="mt-8">
            <p className="text-center text-slate-500">
                Enter the verification code sent to
            </p>

            <p className="mt-1 text-center font-semibold text-blue-600 break-all">
                {registrationData.email}
            </p>

            <div className="mt-8 flex justify-center gap-3">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={1}
                        value={digit}
                        onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                        }
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="h-12 w-12 rounded-xl border border-slate-300 text-center text-xl font-bold outline-none transition-all duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    />
                ))}
            </div>

            <p className="mt-6 text-center text-slate-500">
                {timer > 0
                    ? `Resend OTP in ${timer}s`
                    : "Didn't receive the OTP?"}
            </p>

            <button
                onClick={resendHandler}
                disabled={timer > 0 || loader}
                className="mt-2 w-full text-center font-semibold text-blue-600 disabled:text-slate-400"
            >
                Resend OTP
            </button>

            <button
                onClick={verifyHandler}
                disabled={loader}
                className="mt-6 w-full rounded-xl bg-linear-to-r from-blue-600 to-sky-500 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
            >
                {loader ? "Verifying..." : "Verify Account"}
            </button>

            <button
                onClick={() => setStep("REGISTER")}
                className="mt-4 flex w-full items-center justify-center gap-2 text-slate-600 transition-colors hover:text-blue-600"
            >
                <FaArrowLeft />
                Change Details
            </button>
        </div>
    );
};

export default VerifyRegistrationOtp;