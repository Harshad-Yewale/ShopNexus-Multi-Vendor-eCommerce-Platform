import React, { useEffect, useState } from 'react'
import { adminCategoryTableColumn, adminSellerTableColumn } from '../../../utils/TableColumns'
import { MdAddShoppingCart } from 'react-icons/md';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { BsShop } from "react-icons/bs";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Modal from '../../shared/Modal';
import { DeleteModal } from '../../shared/DeleteModal';
import { deleteCategory, fetchCategories, getSellersForDashboard } from '../../../store/actions';
import toast from 'react-hot-toast';
import SellerForm from './SellerForm';

function Sellers() {

  const [updateOpenModal, setUpdateOpenModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loader, setLoader] = useState(false);
  const { sellers, sellerPagination, isLoading } = useSelector( (state) => state.adminAnalytics);
  const emptySellers = !sellers || sellers.length === 0;
  const [currentPage, setCurrentPage] = useState(
      sellerPagination?.pageNumber + 1 || 1
    );
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;
  const dispatch= useDispatch();
  const queryString = params.toString();

  const handleEdit = (row) => {
    setSelectedItem(row);
    setUpdateOpenModal(true);
  };

    useEffect(() => {
        dispatch(getSellersForDashboard(queryString));
    }, [dispatch]);


const handleDelete = (row) => {
    setSelectedItem(row);
    setOpenDeleteModal(true);
  };

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };

   const onDeleteHandler = () => {
    //dispatch(deleteCategory(setLoader,selectedItem.categoryId,toast,setOpenDeleteModal));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Seller Management
            </h1>
            <p className="text-slate-500 mt-1">
              Manage sellers.
            </p>
          </div>
    
          <button
            className="flex items-center gap-2 rounded-lg bg-custom-blue px-5 py-3 text-white font-semibold shadow hover:bg-blue-800 transition-all duration-200"
            onClick={() => setOpenAddModal(true)}
          >
            <BsShop  size={20} />
            Add sellers
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 mb-6">
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center h-80">
              <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {emptySellers ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                  <BsShop size={70} className="text-slate-400 mb-5" />
    
                  <h2 className="text-2xl font-semibold mb-2">
                    No seller Found
                  </h2>
    
                  <p className="text-sm text-slate-400 mb-6">
                    Add your first seller.
                  </p>
    
                  <button
                    className="flex items-center gap-2 rounded-lg bg-custom-blue px-5 py-3 text-white font-semibold hover:bg-blue-800 transition"
                  >
                    <BsShop/>
                    Add Seller
                  </button>
                </div>
              ) : (
               <div className="space-y-6 px-4 py-4">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold uppercase tracking-wide text-slate-800 md:text-3xl">
                      All Seller
                    </h1>
                  </div>
    
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="w-full">
                      <DataGrid
                        rows={sellers}
                        columns={adminSellerTableColumn(handleEdit,handleDelete)}
                        getRowId={(row) => row.id}
                        autoHeight
                        paginationMode="server"
                        rowCount={sellerPagination?.totalElements ||0}
                        initialState={{
                          pagination: {
                            paginationModel: {
                              pageSize:sellerPagination?.pageSize || 10,
                              page:1,
                            },
                          },
                        }}
                        onPaginationModelChange={handlePaginationChange}
                        disableRowSelectionOnClick
                        disableColumnResize
                        pageSizeOptions={[[sellerPagination?.pageSize || 10]]}
                        pagination
                        paginationOptions={{
                          showFirstButton: true,
                          showLastButton: true,
                          hideNextButton:currentPage === sellerPagination?.totalPages,
                        }}
                        sx={{
                          border: 0,
                          "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#f8fafc",
                            fontWeight: 600,
                          },
                          "& .MuiDataGrid-cell": {
                            display: "flex",
                            alignItems: "center",
                          },
                          "& .MuiDataGrid-footerContainer": {
                            borderTop: "1px solid #e5e7eb",
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
                )}
              </>
            )}
          </div>
        <Modal
            open={openAddModal}
            setOpen={setOpenAddModal}
            title="Add Seller"
        >
            <SellerForm
                setOpen={setOpenAddModal}
                loader={loader}
                setLoader={setLoader}
                buttonName="Add"
            />
        </Modal>

        <Modal
            open={updateOpenModal}
            setOpen={setUpdateOpenModal}
            title="Update Seller"
        >
            <SellerForm
                setOpen={setUpdateOpenModal}
                loader={loader}
                setLoader={setLoader}
                selectedId={selectedItem?.id}
                selectedItem={selectedItem}
                update
                buttonName="Update"
            />
        </Modal>

        <DeleteModal
            open ={openDeleteModal}
            setOpen={setOpenDeleteModal}
            title="Delete Seller"
            onDeleteHandler={onDeleteHandler}
            loader={loader}
        />
        </div>

  )
}

export default Sellers
