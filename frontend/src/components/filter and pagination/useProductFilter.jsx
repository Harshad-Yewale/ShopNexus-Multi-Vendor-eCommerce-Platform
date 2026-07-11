import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProducts, fetchProductsForAdminAndSeller } from "../../store/actions";

const useProductFilter = (user) => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const isAdmin = user?.roles?.includes("ROLE_ADMIN");
    const isSeller = user?.roles?.includes("ROLE_SELLER") && !user?.roles?.includes("ROLE_ADMIN");

    useEffect(() => {
        const params = new URLSearchParams();

        const currentPage = searchParams.get("page")
            ? Number(searchParams.get("page"))
            : 1;

        params.set("pageNumber", currentPage - 1);

        const sortOrder = searchParams.get("sortby") || "asc";
        const categoryParams = searchParams.get("category") || null;
        const keyword = searchParams.get("keyword") || null;
        params.set("sortBy","productPrice");
        params.set("sortOrder", sortOrder);

        if (categoryParams) {
            params.set("category", categoryParams);
        }

        if (keyword) {
            params.set("keyword", keyword);
        }

        const queryString = params.toString();
        
            if(isAdmin){
                dispatch(fetchProductsForAdminAndSeller(queryString, isAdmin));
            }
            else if (isSeller){
                dispatch(fetchProductsForAdminAndSeller(queryString,isAdmin));
            }
            else{
                dispatch(fetchProducts(queryString));
            }

    }, [dispatch, searchParams]);
};

export default useProductFilter;