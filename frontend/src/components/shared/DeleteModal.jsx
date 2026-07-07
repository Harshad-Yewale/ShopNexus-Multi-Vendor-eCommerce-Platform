import React from "react";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";

export const DeleteModal = ({
    open,
    setOpen,
    title,
    onDeleteHandler,
    loader,
}) => {
    return (
        <Dialog
            open={open}
            onClose={() => !loader && setOpen(false)}
            className="relative z-50"
        >
            {/* Backdrop */}
            <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-2xl">
                    {/* Close Button */}
                    <button
                        disabled={loader}
                        onClick={() => setOpen(false)}
                        className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed"
                    >
                        <FaTimes size={16} />
                    </button>

                    <div className="p-8">
                        {/* Icon */}
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                            <FaExclamationTriangle
                                className="text-red-600"
                                size={24}
                            />
                        </div>

                        {/* Title */}
                        <DialogTitle className="mt-5 text-center text-xl font-semibold text-slate-800">
                            {title}
                        </DialogTitle>

                        {/* Message */}
                        <p className="mt-3 text-center text-sm text-slate-500">
                            This action cannot be undone. Are you sure you want
                            to permanently delete this ?
                        </p>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                disabled={loader}
                                onClick={() => setOpen(false)}
                                className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
                            >
                                Cancel
                            </button>

                            <button
                                disabled={loader}
                                onClick={onDeleteHandler}
                                className="rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loader ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};