import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { OrderTable } from './OrderTable';
import useOrderFilter from '../../filter and pagination/useOrderFilter';
import { useSelector } from 'react-redux';

function AdminOrders() {
   const {adminOrder, pagination} = useSelector((state) => state.orders);

  useOrderFilter();

  const emptyOrder = !adminOrder || adminOrder?.length ===0;

  
  return (
   <div className="bg-slate-50 min-h-screen px-8 py-8">
        {emptyOrder ? (
            <div className='flex flex-col items-center justify-center text-gray-600 py-10'>
                <FaShoppingCart size={50} className='mb-3'/>
                <h2 className='text-2xl font-semibold'>No Orders Placed Yet</h2>
            </div>
        ) : (
           <OrderTable adminOrder={adminOrder} pagination={pagination}/>
        )}
    </div>
  )
}

export default AdminOrders
