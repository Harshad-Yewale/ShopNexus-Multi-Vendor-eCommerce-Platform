import React, { useEffect, useState } from 'react'
import { MdAddShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { FaBoxOpen } from 'react-icons/fa';
import { DataGrid } from '@mui/x-data-grid';
import { adminProductTableColumn } from '../../../utils/TableColumns';
import useProductFilter from '../../filter and pagination/useProductFilter';
import Modal from '../../shared/Modal';
import AddProductForm from './AddProductForm';
import { deleteProduct, fetchCategories } from '../../../store/actions';
import AdminProductFilter from '../../filter and pagination/AdminProductFilter';
import { DeleteModal } from '../../shared/DeleteModal';
import toast from 'react-hot-toast';

const AdminProducts = () => {  
  const {products, categories, pagination, isLoading , errorMessage} = useSelector((state) => state.products);
  const dispatch = useDispatch();
 
  const [currentPage, setCurrentPage] = useState(
      pagination?.pageNumber + 1 || 1
    );
  
  useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

  
  const [selectedProduct, setSelectedProduct] = useState('');
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loader, setLoader] = useState(false);

  useProductFilter();

  const tableRecords = products?.map((item) => {
    return {
      id: item.productId,
      productName: item.productName,
      description: item.productDescription,
      discount: item.productDiscount,
      image: item.productImage,
      price: item.productPrice,
      quantity: item.productQuantity,
      DiscountedPrice: item.productDiscountedPrice,
    }
  });

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenUpdateModal(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setOpenDeleteModal(true);
  };

  const handleImageUpload = (product) => {

  };

  const handleProductView = (product) => {

  };


  const handlePaginationChange = (paginationModel) => {

  };

  const onDeleteHandler = () => {
  dispatch(deleteProduct(setLoader, selectedProduct?.id, toast, setOpenDeleteModal));
  };



    const emptyProduct = !products || products?.length ===0;

  return (
  <div className="min-h-screen bg-slate-50 p-6">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Product Management
        </h1>
        <p className="text-slate-500 mt-1">
          Manage products, inventory and pricing.
        </p>
      </div>

      <button
        className="flex items-center gap-2 rounded-lg bg-custom-blue px-5 py-3 text-white font-semibold shadow hover:bg-blue-800 transition-all duration-200"
         onClick={() => setOpenAddModal(true)}
      >
        <MdAddShoppingCart size={20} />
        Add Product
      </button>
    </div>
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 mb-6">
      <AdminProductFilter
        categories={categories ? categories : []}
      />
    </div>
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {isLoading ? (
        <div className="flex justify-center items-center h-80">
          <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {emptyProduct ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
              <FaBoxOpen size={70} className="text-slate-400 mb-5" />

              <h2 className="text-2xl font-semibold mb-2">
                No Products Found
              </h2>

              <p className="text-sm text-slate-400 mb-6">
                Create your first product to start selling.
              </p>

              <button
                className="flex items-center gap-2 rounded-lg bg-custom-blue px-5 py-3 text-white font-semibold hover:bg-blue-800 transition"
              >
                <MdAddShoppingCart />
                Add Product
              </button>
            </div>
          ) : (
           <div className="space-y-6 px-4 py-4">
              <div className="text-center">
                <h1 className="text-2xl font-bold uppercase tracking-wide text-slate-800 md:text-3xl">
                  All Products
                </h1>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="w-full">
                  <DataGrid
                    rows={tableRecords}
                    columns={adminProductTableColumn(
                      handleEdit,
                      handleDelete,
                      handleImageUpload,
                      handleProductView
                    )}
                    autoHeight
                    paginationMode="server"
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
        open={openUpdateModal || openAddModal}
        setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
        title={openUpdateModal ? "Update Product" : "Add Product"}
      >
        <AddProductForm
          setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
          product={selectedProduct}
          update={openUpdateModal}
          buttonName={openUpdateModal? "Update":"Add"}
        />
      </Modal>

       <DeleteModal
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          title="Delete Product"
          onDeleteHandler={onDeleteHandler}
          loader={loader}
         />
    </div>
  )
}

export default AdminProducts;