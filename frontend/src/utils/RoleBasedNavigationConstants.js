import { FaBoxOpen, FaHome, FaStore, FaThList,FaShoppingCart, FaAddressCard } from "react-icons/fa";

export const adminNavigation = [
  {
    name: "Dashboard", 
    href: "/admin", 
    icon: FaHome, 
    current: true 
  },
  {
    name: "Orders", 
    href: "/admin/orders", 
    icon: FaShoppingCart, 
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
  },
   {
    name: "Sellers Applications", 
    href: "/admin/sellers-applications", 
    icon: FaAddressCard
  }
];

export const sellerNavigation = [
 {
    name: "Orders", 
    href: "/seller/orders", 
    icon: FaShoppingCart, 
    current: true 
  },{
    name: "Products", 
    href: "/seller/products", 
    icon: FaBoxOpen
  }
];

