import { FaBoxOpen, FaHome, FaStore, FaThList } from "react-icons/fa";

export const adminNavigation = [
  {
    name: "Dashboard", 
    href: "/admin", 
    icon: FaHome, 
    current: true 
  }, {
    name: "Products", 
    href: "/admin/products", 
    icon: FaBoxOpen
  }, {
    name: "Categories", 
    href: "/admin/categories", 
    icon: FaThList
  }, {
    name: "Sellers", 
    href: "/admin/sellers", 
    icon: FaStore 
  }
];