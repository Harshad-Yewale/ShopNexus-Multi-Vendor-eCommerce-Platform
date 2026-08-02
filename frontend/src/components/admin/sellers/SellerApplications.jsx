import React, { useEffect, useState } from 'react'
import { adminSellerApplicationTableColumn } from '../../../utils/TableColumns'
import { MdAddShoppingCart } from 'react-icons/md';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { FaAddressCard } from "react-icons/fa";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Modal from '../../shared/Modal';
import toast from 'react-hot-toast';
import { getSellerApplicationsForDashboard, modifyApplication } from '../../../store/actions';
import ViewApplication from './ViewApplication';

function SellerApplications() {

  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loader, setLoader] = useState(false);
  const [loadingAction, setLoadingAction] = useState(null);
  const [remarks, setRemarks] = useState("");
  const { sellerApplications, applicationPagination, isLoading } = useSelector( (state) => state.adminAnalytics);
  const emptySellerApplications = !sellerApplications || sellerApplications.length === 0;
  const [currentPage, setCurrentPage] = useState(
      applicationPagination?.pageNumber + 1 || 1
    );
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;
  const dispatch= useDispatch();
  const queryString = params.toString();

  useEffect(() => {
      if (applicationPagination) {
          setCurrentPage(applicationPagination.pageNumber + 1);
      }
  }, [applicationPagination]);

 const handleView = (row) => {
    setSelectedItem(row);
    setRemarks(row.adminRemarks || "");
    setOpenAddModal(true);
  };

const handleApprove = async () => {
  setLoadingAction("APPROVE")
    const sendData = {
        id: selectedItem.id,
        status: "APPROVED",
        adminRemarks: remarks,
    };
    await dispatch( modifyApplication( sendData, toast, setLoader, setOpenAddModal));
    dispatch(getSellerApplicationsForDashboard(queryString));
  setLoadingAction(null)
};

const handleReject = async () => {
  setLoadingAction("REJECT")
    const sendData = {
        id: selectedItem.id,
        status: "REJECTED",
        adminRemarks: remarks,
    };
    await dispatch( modifyApplication( sendData, toast, setLoader, setOpenAddModal));
    dispatch(getSellerApplicationsForDashboard(queryString));
  setLoadingAction(null)
};

    useEffect(() => {
        dispatch(getSellerApplicationsForDashboard(queryString));
    }, [dispatch,queryString]);

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Seller Applications Management
            </h1>
            <p className="text-slate-500 mt-1">
              Manage seller Applications.
            </p>
          </div>
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
              {emptySellerApplications ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                  <FaAddressCard size={70} className="text-slate-400 mb-5" />
    
                  <h2 className="text-2xl font-semibold mb-2">
                    No seller Applications found
                  </h2>
                </div>
              ) : (
               <div className="space-y-6 px-4 py-4">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold uppercase tracking-wide text-slate-800 md:text-3xl">
                      All Seller Applications
                    </h1>
                  </div>
    
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="w-full">
                      <DataGrid
                        rows={sellerApplications}
                        columns={adminSellerApplicationTableColumn(handleView)}
                        getRowId={(row) => row.id}
                        autoHeight
                        paginationMode="server"
                        rowCount={applicationPagination?.totalElements ||0}
                        initialState={{
                          pagination: {
                            paginationModel: {
                               page: currentPage - 1,
                               pageSize: applicationPagination?.pageSize || 10,
                            },
                          },
                        }}
                        onPaginationModelChange={handlePaginationChange}
                        disableRowSelectionOnClick
                        disableColumnResize
                        pageSizeOptions={[applicationPagination?.pageSize || 10]}
                        pagination
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
            title="Seller Application"
        >
           <ViewApplication
                application={selectedItem}
                remarks={remarks}
                setRemarks={setRemarks}
                onApprove={handleApprove}
                onReject={handleReject}
                loadingAction={loadingAction}
            />
        </Modal>
       
        </div>

  )
}

export default SellerApplications
