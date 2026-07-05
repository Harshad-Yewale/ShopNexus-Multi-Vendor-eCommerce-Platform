import { Badge } from "@mui/material";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosMenu, IoMdLogIn } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "./UserMenu";


const Navbar = () => {
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);
  const {cart}=useSelector((state=>state.cart));
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="sticky top-0 z-50 h-17.5  bg-slate-950 text-white">
      <div className="max-w-9xl mx-auto h-full px-4 sm:px-8 lg:px-14 flex items-center justify-between">
        {/* ================= Mobile Left ================= */}
        <div className="flex items-center gap-3 sm:hidden">
          {/* Hamburger */}
          <button onClick={() => setNavbarOpen(!navbarOpen)}>
            {navbarOpen ? (
              <RxCross2 className="text-3xl" />
            ) : (
              <IoIosMenu className="text-3xl" />
            )}
          </button>

          {/* Logo */}
          <Link to="/">
            <img src="/favicon.png" alt="Logo" className="h-10" />
          </Link>
        </div>

        {/* ================= Desktop Logo ================= */}
        <Link to="/" className="hidden sm:flex items-center gap-2">
          <img src="/favicon.png" alt="Logo" className="h-12" />
          <h2 className="text-2xl font-bold">
            Shop<span className="text-blue-500">Nexus</span>
          </h2>
        </Link>

        {/* ================= Desktop Navigation ================= */}
        <ul className="hidden sm:flex items-center gap-10">
          <li>
            <Link
              to="/"
              className={`font-medium transition ${
                path === "/"
                  ? "text-white font-semibold"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/products"
              className={`font-medium transition ${
                path === "/products"
                  ? "text-white font-semibold"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Products
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className={`font-medium transition ${
                path === "/about"
                  ? "text-white font-semibold"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              About
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className={`font-medium transition ${
                path === "/contact"
                  ? "text-white font-semibold"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Contact
            </Link>
          </li>

          {/* Cart */}
          <li>
            <Link to="/cart">
              <Badge
                badgeContent={cart.length}
                color="primary"
                overlap="circular"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <FaShoppingCart
                  size={24}
                  className="hover:text-blue-400 transition"
                />
              </Badge>
            </Link>
          </li>

          {/* Desktop Login */}
           {(user && user.id) ? (
                    <li className="font-medium transition-all duration-150">
                         <UserMenu />
                    </li>
                ) : (
                  <li>
                    <Link
                      to="/login"
                      className="flex items-center gap-1 px-4 py-2 bg-linear-to-r from-blue-600 to-sky-500 rounded-lg font-semibold shadow-lg hover:from-blue-500 hover:to-sky-400 transition-all duration-300 hover:scale-105"
                    >
                      <IoMdLogIn />
                      Login
                    </Link>
                  </li>
              )}
        </ul>

        {/* ================= Mobile Right ================= */}
        <div className="flex items-center gap-4 sm:hidden">
          {/* Cart */}
          <Link to="/cart">
            <Badge
              badgeContent={cart?.length}
              color="primary"
              overlap="circular"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <FaShoppingCart size={23} />
            </Badge>
          </Link>

          {/* Login / User */}
          {(user && user.id) ? (
                    <div className="font-medium transition-all duration-150">
                        <div className="ml-2">
                            <UserMenu />
                        </div>
                    </div>
                )  : (
                  <Link
                    to="/login"
                    className="flex items-center gap-1 rounded-md bg-linear-to-r from-blue-600 to-sky-500 px-3 py-1.5 text-sm font-semibold hover:from-blue-500 hover:to-sky-400 transition-all duration-300"
                  >
                    <IoMdLogIn />
                    Login
                  </Link>
            )}
        </div>
      </div>

      {/* ================= Mobile Menu ================= */}
      <div
        className={`sm:hidden bg-slate-900 overflow-hidden transition-all duration-300 ${
          navbarOpen ? "max-h-96 py-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6 gap-5">
          <li>
            <Link
              to="/"
              onClick={() => setNavbarOpen(false)}
              className={`${
                path === "/" ? "text-blue-400" : "text-white"
              }`}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/products"
              onClick={() => setNavbarOpen(false)}
              className={`${
                path === "/products" ? "text-blue-400" : "text-white"
              }`}
            >
              Products
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              onClick={() => setNavbarOpen(false)}
              className={`${
                path === "/about" ? "text-blue-400" : "text-white"
              }`}
            >
              About
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              onClick={() => setNavbarOpen(false)}
              className={`${
                path === "/contact" ? "text-blue-400" : "text-white"
              }`}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;