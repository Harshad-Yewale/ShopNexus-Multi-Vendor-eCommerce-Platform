import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getOrdersBySellerForDashboard, getOrdersForDashboard } from "../../store/actions";

const useOrderFilter = (isAdmin) => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

   useEffect(() => {
    const params = new URLSearchParams();

    const currentPage = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;

    const sortOrder = searchParams.get("sortby") || "asc";
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
    else{
        dispatch(getOrdersBySellerForDashboard(params.toString()));
    }
}, [dispatch, searchParams]);
};

export default useOrderFilter;