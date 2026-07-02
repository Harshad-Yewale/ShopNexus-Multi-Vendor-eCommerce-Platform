import React from "react";
import {
    FaBuilding,
    FaCheckCircle,
    FaDoorOpen,
    FaEdit,
    FaStreetView,
    FaTrash,
} from "react-icons/fa";
import {
    MdLocationCity,
    MdPinDrop,
    MdPublic,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectUserCheckoutAddress } from "../../store/actions";

const AddressList = ({
    addresses,
    setSelectedAddress,
    setOpenAddressModal,
    setOpenDeleteModal,
}) => {
    const dispatch = useDispatch();

    const { selectedUserCheckoutAddress } = useSelector(
        (state) => state.auth
    );

    const onEditButtonHandler = (address) => {
        setSelectedAddress(address);
        setOpenAddressModal(true);
    };

    const onDeleteButtonHandler = (address) => {
        setSelectedAddress(address);
        setOpenDeleteModal(true);
    };

    const handleAddressSelection = (address) => {
        dispatch(selectUserCheckoutAddress(address));
    };

    return (
        <div className="space-y-5">
            {addresses.map((address) => (
                <div
                    key={address.addressId}
                    onClick={() => handleAddressSelection(address)}
                    className={`relative cursor-pointer rounded-xl border p-5 transition-all duration-200
                    ${
                        selectedUserCheckoutAddress?.addressId ===
                        address.addressId
                            ? "border-blue-600 bg-blue-50 shadow-md"
                            : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-md"
                    }`}
                >
                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEditButtonHandler(address);
                            }}
                            className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600"
                        >
                            <FaEdit size={16} />
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeleteButtonHandler(address);
                            }}
                            className="rounded-md p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                        >
                            <FaTrash size={16} />
                        </button>
                    </div>

                    {/* Address Details */}
                    <div className="space-y-3 pr-16">
                        <div className="flex items-center">
                            <FaBuilding
                                size={16}
                                className="mr-3 text-blue-600"
                            />

                            <h3 className="font-semibold text-slate-800">
                                {address.building}
                            </h3>

                            {selectedUserCheckoutAddress?.addressId ===
                                address.addressId && (
                                <FaCheckCircle className="ml-2 text-blue-600" />
                            )}
                        </div>

                        <div className="flex items-center text-slate-600">
                            <FaDoorOpen className="mr-3" size={15} />
                            <span>{address.roomNo}</span>
                        </div>

                        <div className="flex items-center text-slate-600">
                            <FaStreetView className="mr-3" size={15} />
                            <span>{address.street}</span>
                        </div>

                        <div className="flex items-center text-slate-600">
                            <MdLocationCity className="mr-3" size={18} />
                            <span>{address.city}</span>
                        </div>

                        <div className="flex items-center text-slate-600">
                            <MdPinDrop className="mr-3" size={18} />
                            <span>{address.pincode}</span>
                        </div>

                        <div className="flex items-center text-slate-600">
                            <MdPublic className="mr-3" size={18} />
                            <span>{address.country}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AddressList;