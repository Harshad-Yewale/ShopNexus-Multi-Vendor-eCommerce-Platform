import { FaEdit } from "react-icons/fa";

export const adminOrderTableColumn = (handleEdit) => [
  {
    field: "id",
    headerName: "Order ID",
    flex: 0.8,
    minWidth: 120,
    sortable: false,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
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
    field: "email",
    headerName: "Email",
    flex: 2,
    minWidth: 220,
    sortable: false,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    editable: false,
    headerClassName:
      "bg-gray-100 text-gray-800 font-semibold border border-gray-300",
    cellClassName:
      "text-gray-700 border border-gray-200",
    renderHeader: () => (
      <span className="font-semibold tracking-wide">Email</span>
    ),
  },

  {
    field: "totalAmount",
    headerName: "Total Amount",
    flex: 1,
    minWidth: 150,
    sortable: false,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    editable: false,
    headerClassName:
      "bg-gray-100 text-gray-800 font-semibold border border-gray-300",
    cellClassName:
      "text-gray-700 border border-gray-200",
    renderHeader: () => (
      <span className="font-semibold tracking-wide">
        Total Amount
      </span>
    ),
  },

  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 150,
    sortable: false,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    editable: false,
    headerClassName:
      "bg-gray-100 text-gray-800 font-semibold border border-gray-300",
    cellClassName:
      "text-gray-700 border border-gray-200",
    renderHeader: () => (
      <span className="font-semibold tracking-wide">Status</span>
    ),
  },

  {
    field: "date",
    headerName: "Order Date",
    flex: 1.2,
    minWidth: 170,
    sortable: false,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    editable: false,
    headerClassName:
      "bg-gray-100 text-gray-800 font-semibold border border-gray-300",
    cellClassName:
      "text-gray-700 border border-gray-200",
    renderHeader: () => (
      <span className="font-semibold tracking-wide">
        Order Date
      </span>
    ),
  },

  {
    field: "action",
    headerName: "Action",
    flex: 0.8,
    minWidth: 120,
    sortable: false,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    editable: false,
    headerClassName:
      "bg-gray-100 text-gray-800 font-semibold border border-gray-300",
    cellClassName:
      "border border-gray-200",
    renderHeader: () => (
      <span className="font-semibold tracking-wide">Action</span>
    ),
    renderCell: (params) => (
      <div className="flex h-full items-center justify-center">
        <button
          onClick={() => handleEdit(params.row)}
          className="flex items-center gap-1 rounded-md border border-blue-700 bg-white px-2.5 py-1 text-xs font-medium text-blue-700 transition-all duration-200 hover:bg-blue-700 hover:text-white"
        >
          <FaEdit className="text-[11px]" />
          Edit
        </button>
      </div>
    ),
  },
];