import React, { useState } from "react";
import { FaAddressBook } from "react-icons/fa";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import AddressSkeletonLoader from "./AddressSkeletonLoader";
import AddressInfoModal from "./AddressInfoModal";
import AddAddressForm from "./AddAddressForm";
import AddressList from "./AddressList";
import { DeleteModal } from "../shared/DeleteModal";

import { deleteUserAddress } from "../../store/actions";

const AddressInfo = ({ address }) => {
    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState("");

    const dispatch = useDispatch();

    const { isLoading } = useSelector((state) => state.auth);

    const noAddressExist = !address || address.length === 0;

    const addNewAddressHandler = () => {
        setSelectedAddress("");
        setOpenAddressModal(true);
    };

    const deleteAddressHandler = () => {
        dispatch(
            deleteUserAddress(
                toast,
                selectedAddress?.addressId,
                setOpenDeleteModal
            )
        );
    };

    return (
        <div className="max-w-4xl mx-auto">
            {noAddressExist ? (
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-10 flex flex-col items-center justify-center">
                    <FaAddressBook
                        size={60}
                        className="text-blue-500 mb-5"
                    />

                    <h2 className="text-2xl font-bold text-slate-800">
                        No Address Added
                    </h2>

                    <p className="text-slate-500 text-center mt-2 max-w-sm">
                        Add your delivery address to continue with your
                        purchase.
                    </p>

                    <button
                        onClick={addNewAddressHandler}
                        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                    >
                        Add Address
                    </button>
                </div>
            ) : (
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">
                                Delivery Address
                            </h2>

                            <p className="text-slate-500 text-sm mt-1">
                                Select the address where your order should be
                                delivered.
                            </p>
                        </div>

                        <button
                            onClick={addNewAddressHandler}
                            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
                        >
                            + Add Address
                        </button>
                    </div>

                    {isLoading ? (
                        <AddressSkeletonLoader />
                    ) : (
                        <AddressList
                            addresses={address}
                            setSelectedAddress={setSelectedAddress}
                            setOpenAddressModal={setOpenAddressModal}
                            setOpenDeleteModal={setOpenDeleteModal}
                        />
                    )}
                </div>
            )}

            <AddressInfoModal
                open={openAddressModal}
                setOpen={setOpenAddressModal}
            >
                <AddAddressForm
                    address={selectedAddress}
                    setOpenAddressModal={setOpenAddressModal}
                />
            </AddressInfoModal>

            <DeleteModal
                open={openDeleteModal}
                loader={isLoading}
                setOpen={setOpenDeleteModal}
                title="Delete Address"
                onDeleteHandler={deleteAddressHandler}
            />
        </div>
    );
};

export default AddressInfo;