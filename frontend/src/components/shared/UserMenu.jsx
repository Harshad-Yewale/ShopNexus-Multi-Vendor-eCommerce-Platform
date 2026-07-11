import React from "react";
import { Avatar, Divider, Menu, MenuItem, ListItemIcon } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { BiUser } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import BackDrop from "../../utils/BackDrops";
import { logOutUser } from "../../store/actions";

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const isAdmin = user?.roles?.includes("ROLE_ADMIN");
    const isSeller = user && user?.roles.includes("ROLE_SELLER");

    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOutHandler = () => {
        handleClose();
        dispatch(logOutUser(navigate));
    };

    return (
        <div className="relative z-30">
            <Avatar
                onClick={handleClick}
                sx={{
                    width: 42,
                    height: 42,
                    bgcolor: "#2563EB",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: "18px",
                    transition: "0.25s",
                    "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: 4,
                    },
                }}
            >
                {user?.username?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 8,
                    sx: {
                        width: 260,
                        mt: 1.5,
                        borderRadius: 3,
                        overflow: "hidden",
                    },
                }}
                transformOrigin={{
                    horizontal: "right",
                    vertical: "top",
                }}
                anchorOrigin={{
                    horizontal: "right",
                    vertical: "bottom",
                }}
            >
                { (isAdmin || isSeller) && (
                        <Link to={isAdmin ? "/admin" : "/seller/orders"}
                        style={{ textDecoration: "none", color: "inherit" }}
                        onClick={handleClose}
                    >
                        <MenuItem
                            sx={{
                                py: 1.5,
                                mx: 1,
                                my: 0.5,
                                borderRadius: 2,
                            }}
                        >
                            <ListItemIcon>
                                <BiUser size={20} />
                            </ListItemIcon>
                           {isAdmin ? "Admin Panel" : "Seller Panel"}
                        </MenuItem>
                    </Link>
                )
                }
              
              <Link
                    to="/profile"
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={handleClose}
                >
                    <MenuItem
                        sx={{
                            py: 1.5,
                            mx: 1,
                            my: 0.5,
                            borderRadius: 2,
                        }}
                    >
                        <ListItemIcon>
                            <BiUser size={20} />
                        </ListItemIcon>

                        My Profile
                    </MenuItem>
                </Link>

                <Link
                    to="/profile/orders"
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={handleClose}
                >
                    <MenuItem
                        sx={{
                            py: 1.5,
                            mx: 1,
                            my: 0.5,
                            borderRadius: 2,
                        }}
                    >
                        <ListItemIcon>
                            <FaShoppingCart size={18} />
                        </ListItemIcon>

                        My Orders
                    </MenuItem>
                </Link>

                <Divider />

                <MenuItem
                    onClick={logOutHandler}
                    sx={{
                        py: 1.5,
                        mx: 1,
                        my: 0.5,
                        borderRadius: 2,
                        color: "error.main",
                        "&:hover": {
                            bgcolor: "#FEE2E2",
                        },
                    }}
                >
                    <ListItemIcon sx={{ color: "error.main" }}>
                        <IoExitOutline size={20} />
                    </ListItemIcon>

                    Logout
                </MenuItem>
            </Menu>
            {open && <BackDrop />}
        </div>
    );
};

export default UserMenu;