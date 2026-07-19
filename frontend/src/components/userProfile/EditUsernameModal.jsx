import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../shared/Modal";
import InputField from "../shared/InputField";
import { updateUsername } from "../../store/actions";
import toast from "react-hot-toast";

const EditUsernameModal = ({ open, setOpen, loader, setLoader }) => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: user?.username || "",
        },
    });

    const submitHandler = (data) => {
        
        dispatch(updateUsername(data,toast,reset,setLoader,setOpen));

        setOpen(false);
    };

    return (
        <Modal
            open={open}
            setOpen={setOpen}
            title="Edit Username"
        >
            <form
                onSubmit={handleSubmit(submitHandler)}
                className="mt-8 flex flex-col gap-6"
            >
                <InputField
                    label="Username"
                    id="username"
                    type="text"
                    register={register}
                    errors={errors}
                    required={true}
                    message="Username is required"
                    minLength={3}
                    placeholder="Enter your username"
                />

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
                        Save Changes
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditUsernameModal;