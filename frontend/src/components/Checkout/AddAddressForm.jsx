import React, { useEffect } from 'react'
import InputField from '../shared/InputField'
import { useForm } from 'react-hook-form';
import { FaAddressCard } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addUpdateUserAddress } from '../../store/actions';

const AddAddressForm = ({ address, setOpenAddressModal }) => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.auth);
    const {
            register,
            handleSubmit,
            reset,
            setValue,
            formState: {errors},
        } = useForm({
            mode: "onTouched",
        });

         useEffect(() => {
            if (address?.addressId) {
                setValue("roomNo", address?.roomNo);
                setValue("building", address?.building);
                setValue("city", address?.city);
                setValue("street", address?.street);
                setValue("pincode", address?.pincode);
                setValue("country", address?.country);
            }
        }, [address]);


        const onSaveAddressHandler = async (data) => {
             dispatch(addUpdateUserAddress(
                data,
                toast,
                address?.addressId,
                setOpenAddressModal
            ));
        };

  return (
    <div className="">
            <form
                onSubmit={handleSubmit(onSaveAddressHandler)}
                className="">
                    <div className="flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
                        <FaAddressCard className="mr-2 text-2xl"/>
                         {!address?.addressId ? 
                        "Add Address" :
                        "Update Address"
                        }
                    </div>
            <div className="flex flex-col gap-4">

                <InputField
                      label="Room Number"
                      required
                      id="roomNo"
                      type="text"
                      message="*Room Number is required"
                      placeholder="Enter Room Number"
                      register={register}
                      errors={errors}
                      />
                      
                <InputField
                    label="Building Name"
                    required
                    id="building"
                    type="text"
                    message="*Building Name is required"
                    placeholder="Enter Building Name"
                    register={register}
                    errors={errors}
                    />

                 <InputField
                    label="Street"
                    required
                    id="street"
                    type="text"
                    message="*Street is required"
                    placeholder="Enter Street"
                    register={register}
                    errors={errors}
                    />   

                <InputField
                    label="City"
                    required
                    id="city"
                    type="text"
                    message="*City is required"
                    placeholder="Enter City"
                    register={register}
                    errors={errors}
                    />

                <InputField
                    label="Pincode"
                    required
                    id="pincode"
                    type="text"
                    message="*Pincode is required"
                    placeholder="Enter Pincode"
                    register={register}
                    errors={errors}
                    />    

                <InputField
                    label="Country"
                    required
                    id="country"
                    type="text"
                    message="*Country is required"
                    placeholder="Enter Country"
                    register={register}
                    errors={errors}
                    />        
            </div>

            <button
                disabled={isLoading}
                className="text-white bg-blue-700 px-4 py-2 rounded-md mt-4"
                type="submit">
                {isLoading ? (
                    <>
                      Loading...
                    </>
                ) : (
                    <>Save</>
                )}
            </button>
            </form>
        </div>
  )
}

export default AddAddressForm;