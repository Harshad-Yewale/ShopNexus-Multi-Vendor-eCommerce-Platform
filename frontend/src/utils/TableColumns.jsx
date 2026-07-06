import { FaEdit } from "react-icons/fa";

export const adminOrderTableColumn = (handleEdit) => [
  {
    sortable: false,
    disableColumnMenu: true,
    field: "id",
    headerName: "Order ID",
    minWidth: 180,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName:
      "bg-gray-100 text-gray-800 font-semibold border border-gray-300",
    cellClassName:
      "text-gray-700 border border-gray-200",
    renderHeader: () => (
      <span className="font-semibold tracking-wide">Order ID</span>
    ),
  },
  {
    disableColumnMenu: true,
    field: "email",
    headerName: "Email",
    align: "center",
    flex: 1,
    minWidth: 250,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName:
      "bg-gray-100 text-gray-800 font-semibold border border-gray-300",
    cellClassName:
      "text-gray-700 border border-gray-200",
    renderHeader: () => (
      <span className="font-semibold tracking-wide">Email</span>
    ),
  },
  {
    disableColumnMenu: true,
    field: "totalAmount",
    headerName: "Total Amount",
    align: "center",
    width: 180,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName:
      "bg-gray-100 text-gray-800 font-semibold border border-gray-300",
    cellClassName:
      "text-gray-700 border border-gray-200",
    renderHeader: () => (
      <span className="font-semibold tracking-wide">Total Amount</span>
    ),
  },
  {
    disableColumnMenu: true,
    field: "status",
    headerName: "Status",
    align: "center",
    width: 180,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName:
      "bg-gray-100 text-gray-800 font-semibold border border-gray-300",
    cellClassName:
      "text-gray-700 border border-gray-200",
    renderHeader: () => (
      <span className="font-semibold tracking-wide">Status</span>
    ),
  },
  {
    disableColumnMenu: true,
    field: "date",
    headerName: "Order Date",
    align: "center",
    width: 180,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName:
      "bg-gray-100 text-gray-800 font-semibold border border-gray-300",
    cellClassName:
      "text-gray-700 border border-gray-200",
    renderHeader: () => (
      <span className="font-semibold tracking-wide">Order Date</span>
    ),
  },
  {
    field: "action",
    headerName: "Action",
    align: "center",
    headerAlign: "center",
    width: 180,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    headerClassName:
      "bg-gray-100 text-gray-800 font-semibold border border-gray-300",
    cellClassName:
      "border border-gray-200",
    renderHeader: () => (
      <span className="font-semibold tracking-wide">Action</span>
    ),
    renderCell: (params) => (
      <div className="flex justify-center items-center h-full">
       <button
  onClick={() => handleEdit(params.row)}
  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white cursor-pointer rounded-md text-sm transition"
>
  <FaEdit className="text-xs" />
  Edit
</button>
      </div>
    ),
  },
];