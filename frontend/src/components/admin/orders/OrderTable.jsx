import { DataGrid} from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { adminOrderTableColumn } from '../../../utils/TableColumns';
import {formatPrice} from "../../../utils/FormatPrice";
import Modal from '../../shared/Modal';
import UpdateOrderForm from './UpdateOrderForm';

export const OrderTable = ({ adminOrder, pagination}) => {
  const [updateOpenModal, setUpdateOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loader, setLoader] = useState(false);

  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1
  );
   const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  const handleEdit = (order) => {
    setSelectedItem(order);
    setUpdateOpenModal(true);
  }


const tableRecords = useMemo(() =>adminOrder?.map((item) => {
  return {
    id: item.orderId,
    email: item.email,
    totalAmount: formatPrice(item.totalAmount),
    status: item.orderStatus,
    date: item.orderDate,
  }}));

const handlePaginationChange = (paginationModel) => {
  const page = paginationModel.page + 1;
  setCurrentPage(page);
  params.set("page", page.toString());
  navigate(`${pathname}?${params}`)
}

  return (
    <div>
      <h1 className='text-slate-800 text-3xl text-center font-bold pb-6 uppercase'>
        All Orders
      </h1>

      <div className="mx-auto max-w-7xl rounded-2xl bg-white shadow-lg border border-gray-200 overflow-hidden">
         <DataGrid
         className='w-full'
            rows={tableRecords}
            columns={adminOrderTableColumn(handleEdit)}
            paginationMode='server'
            rowCount={pagination?.totalElements || 0}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: pagination?.pageSize || 10,
                  page: currentPage - 1,
                },
              },
            }}
            onPaginationModelChange={handlePaginationChange}
            disableRowSelectionOnClick
            disableColumnResize
            pageSizeOptions={[pagination?.pageSize || 10]}
            pagination
            paginationOptions={{
              showFirstButton: true,
              showLastButton: true,
              hideNextButton: currentPage === pagination?.totalPages,
            }}
          />
      </div>
      <Modal
        open={updateOpenModal}
        setOpen={setUpdateOpenModal}
        title='Update Order Status'>
          {selectedItem && (
            <UpdateOrderForm
              setOpen={setUpdateOpenModal}
              loader={loader}
              setLoader={setLoader}
              selectedId={selectedItem.id}
              selectedItem={selectedItem}
            />
          )}
      </Modal>
    </div>
  )
}

