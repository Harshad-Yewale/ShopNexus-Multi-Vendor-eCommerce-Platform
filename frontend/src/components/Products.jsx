import { FaExclamationTriangle } from "react-icons/fa";
import { TbMoodEmptyFilled } from "react-icons/tb";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../store/actions";
import Filter from "./filter";
import useProductFilter from "./useProductFilter";

const Products = () => {
    const isLoading = false;
    const errorMessage = "";

    const { products } = useSelector((state) => state.products);

    const dispatch = useDispatch();

    useProductFilter();

    // useEffect(() => {
    //     dispatch(fetchProducts());
    // }, [dispatch]);

    console.log("Products:", products);

    return (
       
        <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
            <Filter />

            {isLoading ? (
                <p>It is loading...</p>
            ) : errorMessage ? (
                <div className="flex justify-center items-center h-50">
                    <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />

                    <span className="text-slate-800 text-lg font-medium">
                        {errorMessage}
                    </span>
                </div>
            ) : (
                <div className="min-h-175">
                    <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                        {products?.length > 0 ? (
                            products.map((item) => (
                                <ProductCard
                                    key={item.productId}
                                    {...item}
                                />
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center min-h-[60vh] gap-5">
                                <TbMoodEmptyFilled className="text-[130px] md:text-[170px] text-gray-400" />

                                <h1 className="text-4xl md:text-6xl font-bold text-gray-500 text-center">
                                    No Products Available
                                </h1>

                                <p className="text-lg text-gray-400 text-center max-w-md">
                                    Try changing your search or filter criteria.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;