import { DataGrid } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import {useLocation,useNavigate,useSearchParams,} from "react-router-dom";
import { adminOrderTableColumn } from "../../../utils/TableColumns";
import { formatPrice } from "../../../utils/FormatPrice";
import Modal from "../../shared/Modal";
import UpdateOrderForm from "./UpdateOrderForm";

export const OrderTable = ({ orders, pagination,isAdmin }) => {
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
  };

  const tableRecords = useMemo(
    () =>
      orders?.map((item) => ({
        id: item.orderId,
        email: item.email,
        totalAmount: formatPrice(item.totalAmount),
        status: item.orderStatus,
        date: item.orderDate,
      })),
    [orders]
  );

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };

  return (
    <div className="space-y-6 px-4 py-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold uppercase tracking-wide text-slate-800 md:text-3xl">
          All Orders
        </h1>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="w-full">
          <DataGrid
            rows={tableRecords}
            columns={adminOrderTableColumn(handleEdit)}
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

      <Modal
        open={updateOpenModal}
        setOpen={setUpdateOpenModal}
        title="Update Order Status"
      >
        {selectedItem && (
          <UpdateOrderForm
            setOpen={setUpdateOpenModal}
            loader={loader}
            setLoader={setLoader}
            selectedId={selectedItem.id}
            selectedItem={selectedItem}
            isAdmin={isAdmin}
          />
        )}
      </Modal>
    </div>
  );
};