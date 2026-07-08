import React, { useEffect, useState } from 'react'
import { adminCategoryTableColumn } from '../../../utils/TableColumns'
import { MdAddShoppingCart } from 'react-icons/md';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { FaBoxOpen } from 'react-icons/fa';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Modal from '../../shared/Modal';
import CategoryForm from './CategoryForm';
import { DeleteModal } from '../../shared/DeleteModal';
import { deleteCategory, fetchCategories } from '../../../store/actions';
import toast from 'react-hot-toast';

function Category() {

  const [updateOpenModal, setUpdateOpenModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loader, setLoader] = useState(false);
  const { categories, categoryPagination, isLoading } = useSelector( (state) => state.products);
  const emptyCategory = !categories || categories.length === 0;
  const [currentPage, setCurrentPage] = useState(
      categoryPagination?.pageNumber + 1 || 1
    );
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;
  const dispatch= useDispatch();

  const handleEdit = (row) => {
    setSelectedItem(row);
    setUpdateOpenModal(true);
  };

    useEffect(() => {
        dispatch(fetchCategories());
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
    dispatch(deleteCategory(setLoader,selectedItem.categoryId,toast,setOpenDeleteModal));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Categpry Management
            </h1>
            <p className="text-slate-500 mt-1">
              Manage Categories.
            </p>
          </div>
    
          <button
            className="flex items-center gap-2 rounded-lg bg-custom-blue px-5 py-3 text-white font-semibold shadow hover:bg-blue-800 transition-all duration-200"
            onClick={() => setOpenAddModal(true)}
          >
            <MdAddShoppingCart size={20} />
            Add Category
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
              {emptyCategory ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                  <FaBoxOpen size={70} className="text-slate-400 mb-5" />
    
                  <h2 className="text-2xl font-semibold mb-2">
                    No catgegory Found
                  </h2>
    
                  <p className="text-sm text-slate-400 mb-6">
                    Create your first Category to add prodcuts.
                  </p>
    
                  <button
                    className="flex items-center gap-2 rounded-lg bg-custom-blue px-5 py-3 text-white font-semibold hover:bg-blue-800 transition"
                  >
                    <MdAddShoppingCart />
                    Add Category
                  </button>
                </div>
              ) : (
               <div className="space-y-6 px-4 py-4">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold uppercase tracking-wide text-slate-800 md:text-3xl">
                      All Categories
                    </h1>
                  </div>
    
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="w-full">
                      <DataGrid
                        rows={categories}
                        columns={adminCategoryTableColumn(handleEdit,handleDelete)}
                          getRowId={(row) => row.categoryId}
                        autoHeight
                        paginationMode="server"
                        rowCount={categoryPagination?.totalElements ||0}
                        initialState={{
                          pagination: {
                            paginationModel: {
                              pageSize:categoryPagination?.pageSize || 10,
                              page:1,
                            },
                          },
                        }}
                        onPaginationModelChange={handlePaginationChange}
                        disableRowSelectionOnClick
                        disableColumnResize
                        pageSizeOptions={[[categoryPagination?.pageSize || 10]]}
                        pagination
                        paginationOptions={{
                          showFirstButton: true,
                          showLastButton: true,
                          hideNextButton:currentPage === categoryPagination?.totalPages,
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
            title="Add Category"
        >
            <CategoryForm
                setOpen={setOpenAddModal}
                loader={loader}
                setLoader={setLoader}
                buttonName="Add"
            />
        </Modal>

        <Modal
            open={updateOpenModal}
            setOpen={setUpdateOpenModal}
            title="Update Category"
        >
            <CategoryForm
                setOpen={setUpdateOpenModal}
                loader={loader}
                setLoader={setLoader}
                selectedId={selectedItem?.categoryId}
                selectedItem={selectedItem}
                update
                buttonName="Update"
            />
        </Modal>

        <DeleteModal
            open ={openDeleteModal}
            setOpen={setOpenDeleteModal}
            title="Delete Category"
            onDeleteHandler={onDeleteHandler}
            loader={loader}
        />
        </div>

  )
}

export default Category
