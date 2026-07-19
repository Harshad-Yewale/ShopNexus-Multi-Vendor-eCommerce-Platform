import React from "react";
import { useForm } from "react-hook-form";

import Modal from "../shared/Modal";
import InputField from "../shared/InputField";
const ChangePasswordModal = ({ open, setOpen }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const newPassword = watch("newPassword");

    const submitHandler = (data) => {
        console.log(data);

        // Dispatch change password action here

        // dispatch(changePassword(data));

        setOpen(false);
    };

    return (
        <Modal
            open={open}
            setOpen={setOpen}
            title="Change Password"
        >
            <form
                onSubmit={handleSubmit(submitHandler)}
                className="mt-8 flex flex-col gap-6"
            >
                <InputField
                    label="Current Password"
                    id="currentPassword"
                    type="password"
                    register={register}
                    errors={errors}
                    required={true}
                    message="Current password is required"
                    minLength={6}
                    placeholder="Enter current password"
                />

                <InputField
                    label="New Password"
                    id="newPassword"
                    type="password"
                    register={register}
                    errors={errors}
                    required={true}
                    message="New password is required"
                    minLength={6}
                    placeholder="Enter new password"
                />

                <div className="flex flex-col gap-1 w-full">
                    <label
                        htmlFor="confirmPassword"
                        className="font-semibold text-sm text-slate-800"
                    >
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm new password"
                        className={`px-2 py-2 border outline-none bg-transparent text-slate-800 rounded-md ${
                            errors.confirmPassword
                                ? "border-red-500"
                                : "border-slate-700"
                        }`}
                        {...register("confirmPassword", {
                            required: "Please confirm your password",
                            validate: (value) =>
                                value === newPassword ||
                                "Passwords do not match",
                        })}
                    />

                    {errors.confirmPassword && (
                        <p className="text-sm font-semibold text-red-600">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="px-5 py-2 rounded-md border border-slate-400 text-slate-700 hover:bg-slate-100 transition"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        Update Password
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default ChangePasswordModal;