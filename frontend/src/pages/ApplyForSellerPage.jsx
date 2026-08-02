import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyForSeller, getMySellerApplications } from "../store/actions";
import { useForm } from "react-hook-form";
import InputField from "../components/shared/InputField";
import toast from "react-hot-toast";

function ApplyForSellerPage() {
  // Replace this with Redux/API data
  // const applications = [
  //   {
  //     id: 1,
  //     businessName: "Tech Store",
  //     businessDescription: "Electronics and accessories.",
  //     address: "Mumbai, Maharashtra",
  //     csNumber: "9876543210",
  //     status: "PENDING",
  //     adminRemarks: "",
  //     createdAt: "31 Jul 2026",
  //   },
  //   {
  //     id: 2,
  //     businessName: "Fashion Hub",
  //     businessDescription: "Men's & Women's Clothing",
  //     address: "Pune, Maharashtra",
  //     csNumber: "9876501234",
  //     status: "REJECTED",
  //     adminRemarks: "Please provide complete business details.",
  //     createdAt: "20 Jun 2026",
  //   },
  // ];

  const {applications, isLoading, isError}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

const [loader, setLoader] = useState(false);


   useEffect(() => {
         dispatch(getMySellerApplications());
      }, [dispatch]);

   const onSubmit = (data) => {
    dispatch(applyForSeller( data, toast, reset, setLoader));
  };

  const hasPendingApplication = applications?.some(
    (application) => application?.status === "PENDING" || false
  );
  const latestApplication =applications?.[0];

  const getStatusClasses = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (isLoading) {
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-70px)]">
            <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
    );
}

  return (
    <div className="min-h-[calc(100vh-70px)] bg-slate-100 py-10">
      <div className="mx-auto max-w-7xl px-4">

        {/* Hero */}

        <div className="rounded-3xl bg-linear-to-r from-blue-700 to-blue-500 p-10 text-white shadow-xl">
          <h1 className="text-4xl font-bold">Become a Seller</h1>

          <p className="mt-4 max-w-3xl text-blue-100">
            Start selling your products on ShopNexus. Submit your application
            and our admin team will review it shortly.
          </p>
        </div>

        {/* Seller Form */}

        <div className="mt-10 rounded-3xl bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-bold text-slate-800">
            Seller Application
          </h2>

          {latestApplication?.status === "APPROVED" ? (
              <div className="rounded-xl border border-green-300 bg-green-50 p-6">

                <h3 className="text-lg font-semibold text-green-700">
                  🎉 Seller Application Approved
                </h3>

                <p className="mt-2 text-green-700">
                  Congratulations! Your seller application has been approved successfully.
                  Your business profile has been activated.
                </p>

                <div className="mt-4 rounded-lg bg-white p-4 border border-green-200">
                  <p className="font-medium text-green-800">
                    Important
                  </p>

                  <p className="mt-1 text-sm text-green-700">
                    Please <span className="font-semibold">log out and log in again</span>
                    to refresh your account permissions and access your Seller Dashboard.
                  </p>
                </div>

              </div>
            ) : hasPendingApplication ? (
            <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-6">

              <h3 className="text-lg font-semibold text-yellow-700">
                Application Under Review
              </h3>

              <p className="mt-2 text-yellow-700">
                You already have a pending seller application. Please wait until
                the administrator reviews your application.
              </p>

            </div>
          ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              <div>
                <label className="mb-2 block font-medium text-slate-800">
                  Business Name
                </label>

                <input
                  type="text"
                  placeholder="Enter business name"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                  {...register("businessName", {
                    required: "Business name is required",
                  })}
                />

                <p className="mt-1 text-sm text-red-500">
                  {errors.businessName?.message}
                </p>
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-800">
                  Business Description
                </label>

                <textarea
                  rows={4}
                  placeholder="Describe your business"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                  {...register("businessDescription", {
                    required: "Business description is required",
                  })}
                />

                <p className="mt-1 text-sm text-red-500">
                  {errors.businessDescription?.message}
                </p>
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-800">
                  Business Address
                </label>

                <textarea
                  rows={3}
                  placeholder="Enter business address"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                  {...register("address", {
                    required: "Business address is required",
                  })}
                />

                <p className="mt-1 text-sm text-red-500">
                  {errors.address?.message}
                </p>
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-800">
                  Customer Support Number
                </label>

                <input
                  type="text"
                  placeholder="Enter customer support number"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                  {...register("csNumber", {
                    required: "Customer support number is required",
                  })}
                />

                <p className="mt-1 text-sm text-red-500">
                  {errors.csNumber?.message}
                </p>
              </div>

              <button
                type="submit"
                disabled={loader}
                className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loader ? "Submitting..." : "Submit Application"}
              </button>

            </form>
          )}
      
        {/* History */}

        <div className="mt-12">

          <h2 className="text-3xl font-bold text-slate-800">
            My Applications
          </h2>

          <p className="mt-2 text-slate-500">
            View the status of your previous seller applications.
          </p>

        </div>

        {!applications || applications?.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-white py-20 text-center shadow">

            <h2 className="text-2xl font-semibold text-slate-700">
              No Applications Yet
            </h2>

            <p className="mt-3 text-slate-500">
              Fill out the seller application form above to get started.
            </p>

          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2">

            {applications.map((application) => (
              <div
                key={application.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow transition hover:shadow-lg"
              >

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                  <div>
                    <h3 className="text-xl font-bold text-slate-800">
                      {application.businessName}
                    </h3>

                    <p className="text-sm text-slate-500">
                      Applied on {new Date(application.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusClasses(
                      application.status
                    )}`}
                  >
                    {application.status}
                  </span>

                </div>

                <hr className="my-5" />

                <div className="space-y-4">

                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      Description
                    </p>

                    <p>{application.businessDescription}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      Address
                    </p>

                    <p>{application.address}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      Customer Support Number
                    </p>

                    <p>{application.csNumber}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      Admin Remarks
                    </p>

                    <p className="wrap-break-word">
                      {application.adminRemarks || "No remarks"}
                    </p>
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
    </div>
  );
}

export default ApplyForSellerPage;
