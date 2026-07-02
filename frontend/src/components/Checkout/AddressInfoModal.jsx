import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
} from "@headlessui/react";
import React from "react";
import { FaTimes } from "react-icons/fa";

const AddressInfoModal = ({ open, setOpen, children }) => {
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            className="relative z-50"
        >
            {/* Backdrop */}
            <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
                    {/* Close Button */}
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                    >
                        <FaTimes size={18} />
                    </button>

                    {/* Content */}
                    <div className="p-6 sm:p-8">
                        {children}
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default AddressInfoModal;