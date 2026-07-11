import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { getOrdersForDashboard, updateOrderStatusBySellerFromDashboard, updateOrderStatusFromDashboard } from '../../../store/actions';
import toast from 'react-hot-toast';

const ORDER_STATUSES = [
    "PENDING_PAYMENT",
    "CONFIRMED",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED"
];

const UpdateOrderForm = ({ setOpen, selectedId, selectedItem, loader, setLoader, isAdmin}) => {
    const [orderStatus, setOrderStatus] = useState(selectedItem?.status || 'Accepted');
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const updateOrderStatus = (e) => {
        e.preventDefault();
        if (!orderStatus) {
            setError("Order status is required");
            return;
        }
        if(isAdmin){
        dispatch(updateOrderStatusFromDashboard(
            selectedId,
            orderStatus,
            toast,
            setLoader
        ));
        }else{
            dispatch(updateOrderStatusBySellerFromDashboard(
            selectedId,
            orderStatus,
            toast,
            setLoader
        ));
        }
        setOpen(false)
    };

    useEffect(() => {
        setOrderStatus(selectedItem?.status || "");
    }, [selectedItem]);

  return (
    <div className='py-5 relative h-full'>
        <form className='space-y-4' onSubmit={updateOrderStatus}>
            <FormControl fullWidth variant='outlined' error={!!error}>
                <InputLabel id="order-status-label">Order Status</InputLabel>
                <Select
                    labelId='order-status-label'
                    label='Order Status'
                    value={orderStatus}
                    onChange={(e) => {
                        setOrderStatus(e.target.value);
                        setError("");
                    }}>
                    
                    {
                        ORDER_STATUSES.map((status) => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))
                    }

                </Select>

                {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>

            <div className='flex w-full justify-between items-center absolute bottom-14'>
                <Button disabled={loader}
                        onClick={() => setOpen(false)}
                        variant='outlined'
                        className='text-white py-2.5 px-4 text-sm font-medium'>
                    Cancel
                </Button>

                <Button
                    disabled={loader}
                    type='submit'
                    variant='contained'
                    color='primary'
                    className='bg-custom-blue text-white  py-2.5 px-4 text-sm font-medium'>
                    {loader ? (
                        <div className='flex gap-2 items-center'>
                             Loading...
                        </div>
                    ) : (
                        "Update"
                    )}
                </Button>
            </div>
        </form>

    </div>
  )
}

export default UpdateOrderForm;