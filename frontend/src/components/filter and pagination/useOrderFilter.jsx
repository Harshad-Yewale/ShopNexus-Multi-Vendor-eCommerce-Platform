import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getOrdersBySellerForDashboard, getOrdersForDashboard, getUserOrders } from "../../store/actions";

const useOrderFilter = (user) => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const isAdmin=user?.roles?.includes("ROLE_ADMIN") ;
    const isSeller=user?.roles?.includes("ROLE_SELLER") && !user?.roles?.includes("ROLE_ADMIN") ;

   useEffect(() => {
    const params = new URLSearchParams();

    const currentPage = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;

    const sortOrder = searchParams.get("sortby") || "";
    const keyword = searchParams.get("keyword");

    params.set("sortBy", "orderDate");
    params.set("sortOrder", sortOrder);
    params.set("pageNumber", currentPage - 1);

    if (keyword && keyword.trim()) {
        params.set("keyword", keyword.trim());
    }

    if(isAdmin){
        dispatch(getOrdersForDashboard(params.toString()));
    }
    else if(isSeller){
        dispatch(getOrdersBySellerForDashboard(params.toString()));
    }
    else{
        dispatch(getUserOrders(params.toString()));
    }
}, [dispatch, searchParams]);
};

export default useOrderFilter;