import React from "react";

function ViewApplication({
  application,
  remarks,
  setRemarks,
  onApprove,
  onReject,
  loadingAction,
}) {
  if (!application) return null;

  return (
    <div className="space-y-6">

      {/* Applicant Details */}
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Applicant Details</h2>

        <div className="flex flex-col gap-4 text-sm md:flex-row md:justify-between">
          <div className="flex-1">
            <p className="text-slate-500">Username</p>
            <p className="font-medium">{application.username}</p>
          </div>

          <div className="flex-1">
            <p className="text-slate-500">Email</p>
            <p className="font-medium break-all">{application.email}</p>
          </div>
        </div>
      </div>

      {/* Business Details */}
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Business Details</h2>

        <div className="space-y-4 text-sm">

          <div>
            <p className="text-slate-500">Business Name</p>
            <p>{application.businessName}</p>
          </div>

          <div>
            <p className="text-slate-500">Business Description</p>
            <p>{application.businessDescription}</p>
          </div>

          <div>
            <p className="text-slate-500">Address</p>
            <p>{application.address}</p>
          </div>

          <div>
            <p className="text-slate-500">Customer Support Number</p>
            <p>{application.csNumber}</p>
          </div>

        </div>
      </div>

      {/* Status */}
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Application Status</h2>

       <span
          className={`px-3 py-1 rounded-full text-sm font-semibold
            ${
              application.status === "APPROVED"
                ? "bg-green-100 text-green-700"
                : application.status === "REJECTED"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
        >
          {application.status}
        </span>
      </div>

      {/* Admin Remarks */}
      <div>
        <label className="block mb-2 font-medium">
          Admin Remarks
        </label>

        <textarea
          rows={4}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter remarks..."
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3">

              <button
            disabled={loadingAction === "REJECT"}
            onClick={onReject}
            className="px-5 py-2 rounded-lg bg-red-600 text-white transition
                      hover:bg-red-700
                      disabled:opacity-50
                      disabled:cursor-not-allowed"
        >
            {loadingAction === "REJECT" ? "Rejecting..." : "Reject"}
        </button>

        <button
            disabled={loadingAction === "APPROVE"}
            onClick={onApprove}
            className="px-5 py-2 rounded-lg bg-green-600 text-white transition
                      hover:bg-green-700
                      disabled:opacity-50
                      disabled:cursor-not-allowed"
        >
            {loadingAction === "APPROVE" ? "Approving..." : "Approve"}
        </button>

      </div>

    </div>
  );
}

export default ViewApplication;