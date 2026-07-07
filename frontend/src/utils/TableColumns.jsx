import { FaEdit, FaEye, FaImage, FaTrashAlt } from "react-icons/fa";

export const adminProductTableColumn = (
  handleEdit,
  handleDelete,
  handleImageUpload,
  handleProductView
) => [
  {
    field: "id",
    headerName: "Product ID",
    width: 140,
    sortable: true,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    editable: false,
    headerClassName:
      "bg-gray-100 text-gray-800 font-semibold border border-gray-300",
    cellClassName:
      "text-gray-700 border border-gray-200",
  },

  {
    field: "productName",
    headerName: "Product Name",
    flex: 1,
    minWidth: 220,
    sortable: true,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    editable: false,
    headerClassName:
      "bg-gray-100 text-gray-800 font-semibold border border-gray-300",
    cellClassName:
      "text-gray-700 border border-gray-200",
  },

  {
    field: "image",
    headerName: "Image",
    width: 120,
    sortable: false,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    editable: false,
    headerClassName:
      "bg-gray-100 text-gray-800 font-semibold border border-gray-300",
    cellClassName:
      "border border-gray-200",
    renderCell: ({ value }) => (
      <div className="flex h-full items-center justify-center">
        <img
          src={value}
          alt="Product"
          className="h-12 w-12 rounded-md border object-contain"
        />
      </div>
    ),
  },

   {
    field: "description",
    headerName: "Description",
    flex: 1,
    minWidth: 260,
    sortable: false,
    disableColumnMenu: true,
    editable: false,
    headerClassName:
      "bg-gray-100 text-gray-800 font-semibold border border-gray-300",
    cellClassName:
      "text-gray-700 border border-gray-200",
    renderCell: ({ value }) => (
      <div
        className="truncate w-full"
        title={value}
      >
        {value}
      </div>
    ),
  },



  {
    field: "price",
    headerName: "Price",
    width: 130,
    sortable: true,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    editable: false,
    headerClassName:
      "bg-gray-100 text-gray-800 font-semibold border border-gray-300",
    cellClassName:
      "text-gray-700 border border-gray-200",
    renderCell: ({ value }) => (
      <span className="font-medium">
        ₹{Number(value).toLocaleString()}
      </span>
    ),
  },

   {
    field: "discount",
    headerName: "Discount",
    width: 120,
    sortable: true,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    editable: false,
    headerClassName:
      "bg-gray-100 text-gray-800 font-semibold border border-gray-300",
    cellClassName:
      "text-gray-700 border border-gray-200",
    renderCell: ({ value }) => `${value}%`,
  },

  {
    field: "DiscountedPrice",
    headerName: "Discounted Price",
    width: 150,
    sortable: true,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    editable: false,
    headerClassName:
      "bg-gray-100 text-gray-800 font-semibold border border-gray-300",
    cellClassName:
      "text-gray-700 border border-gray-200",
    renderCell: ({ value }) => (
      <span className="font-medium text-green-700">
        ₹{Number(value).toLocaleString()}
      </span>
    ),
  },

 

  {
    field: "quantity",
    headerName: "Stock",
    width: 120,
    sortable: false,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    editable: false,
    headerClassName:
      "bg-gray-100 text-gray-800 font-semibold border border-gray-300",
    cellClassName:
      "text-gray-700 border border-gray-200",
  },

 
  
  {
    field: "action",
    headerName: "Action",
    width: 380,
    sortable: false,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    editable: false,
    headerClassName:
      "bg-gray-100 text-gray-800 font-semibold border border-gray-300",
    cellClassName:
      "border border-gray-200",
    renderCell: (params) => (
      <div className="flex h-full items-center justify-center gap-2">

        <button
          onClick={() => handleImageUpload(params.row)}
          className="flex items-center gap-1 rounded-md border border-green-700 bg-white px-3 py-1 text-xs font-medium text-green-700 transition hover:bg-green-700 hover:text-white cursor-pointer"
        >
          <FaImage />
          Image
        </button>

        <button
          onClick={() => handleEdit(params.row)}
          className="flex items-center gap-1 rounded-md border border-blue-700 bg-white px-3 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-700 hover:text-white cursor-pointer"
        >
          <FaEdit />
          Edit
        </button>

        <button
          onClick={() => handleDelete(params.row)}
          className="flex items-center gap-1 rounded-md border border-red-700 bg-white px-3 py-1 text-xs font-medium text-red-700 transition hover:bg-red-700 hover:text-white cursor-pointer"
        >
          <FaTrashAlt />
          Delete
        </button>

        <button
          onClick={() => handleProductView(params.row)}
          className="flex items-center gap-1 rounded-md border border-slate-700 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-700 hover:text-white cursor-pointer"
        >
          <FaEye />
          View
        </button>

      </div>
    ),
  },
];

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
          className="flex items-center gap-1 rounded-md border border-blue-700 bg-white px-2.5 py-1 text-xs font-medium text-blue-700 transition-all duration-200 hover:bg-blue-700 hover:text-white cursor-pointer"
        >
          <FaEdit className="text-[11px]" />
          Edit
        </button>
      </div>
    ),
  },
];