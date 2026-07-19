import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaUserCircle, FaUser, FaEnvelope, FaLock, FaCalendarAlt, FaIdBadge, FaShoppingBag, FaEdit, FaTrash,} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import EditUsernameModal from "../components/userProfile/EditUsernameModal";
// import EditEmailModal from "./EditEmailModal";
import ChangePasswordModal from "../components/userProfile/ChangePasswordModal";

const ProfilePage = () => {
  const navigate = useNavigate();

  const {user} = useSelector((state) => state.auth);

  const [openUsernameModal, setOpenUsernameModal] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [loader, setLoader] = useState(false);

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-70px)] flex justify-center items-center">
        <h2 className="text-xl font-semibold text-gray-600">
          User not found
        </h2>
      </div>
    );
  }

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <>
      <div className="min-h-[calc(100vh-70px)] bg-gray-100 py-10 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* ================= Header ================= */}

          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center">
            <FaUserCircle className="text-8xl text-gray-400 mb-4" />

            <h1 className="text-3xl font-bold text-gray-800">
              {user.username}
            </h1>

            <p className="text-gray-500 mt-1">{user.email}</p>
          </div>

          {/* ================= Personal Information ================= */}

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 border-b pb-3">
              Personal Information
            </h2>

            <div className="space-y-6">
              {/* Username */}

              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="flex items-start gap-3">
                  <FaUser className="text-xl text-blue-600 mt-1" />

                  <div>
                    <p className="text-sm text-gray-500">Username</p>
                    <h3 className="font-semibold text-lg">
                      {user.username}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setOpenUsernameModal(true)}
                  className="mt-4 md:mt-0 flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <FaEdit />
                  Edit
                </button>
              </div>

              <hr />

              {/* Email */}

              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="flex items-start gap-3">
                  <FaEnvelope className="text-xl text-green-600 mt-1" />

                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <h3 className="font-semibold text-lg">{user.email}</h3>
                  </div>
                </div>

                <button
                  onClick={() => setOpenEmailModal(true)}
                  className="mt-4 md:mt-0 flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <FaEdit />
                  Edit
                </button>
              </div>

              <hr />

              {/* Password */}

              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="flex items-start gap-3">
                  <FaLock className="text-xl text-red-500 mt-1" />

                  <div>
                    <p className="text-sm text-gray-500">Password</p>
                    <h3 className="font-semibold text-lg">••••••••••••</h3>
                  </div>
                </div>

                <button
                  onClick={() => setOpenPasswordModal(true)}
                  className="mt-4 md:mt-0 flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <FaEdit />
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* ================= Account Details ================= */}

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 border-b pb-3">
              Account Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* ID */}

              <div className="flex items-center gap-3">
                <FaIdBadge className="text-blue-600 text-xl" />

                <div>
                  <p className="text-sm text-gray-500">User ID</p>
                  <p className="font-semibold">#{user.id}</p>
                </div>
              </div>

              {/* Created */}

              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-green-600 text-xl" />

                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-semibold">
                    {formatDate(user.createdAt)}
                  </p>
                </div>
              </div>

              {/* Roles */}

              <div className="md:col-span-2">
                <p className="text-sm text-gray-500 mb-2">Roles</p>

                <div className="flex flex-wrap gap-2">
                  {user.roles?.map((role) => (
                    <span
                      key={role}
                      className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          role === "ROLE_ADMIN"
                            ? "bg-purple-100 text-purple-700"
                            : role === "ROLE_SELLER"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                    >
                      {role.replace("ROLE_", "")}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ================= Quick Actions ================= */}

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 border-b pb-3">
              Quick Actions
            </h2>

            <button
              onClick={() => navigate("/profile/orders")}
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
            >
              <FaShoppingBag />
              My Orders
            </button>
          </div>
        </div>
      </div>

      {/* ================= Modals ================= */}

     <EditUsernameModal
        open={openUsernameModal}
        setOpen={setOpenUsernameModal}
        loader={loader}
        setLoader={setLoader}
      />

      {/* <EditEmailModal
        open={openEmailModal}
        setOpen={setOpenEmailModal}
      />*/}

      <ChangePasswordModal
        open={openPasswordModal}
        setOpen={setOpenPasswordModal}
      /> 
    </>
  );
};

export default ProfilePage;