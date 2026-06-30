import { FaExclamationTriangle } from "react-icons/fa";
import { TbMoodEmptyFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories, fetchProducts } from "../store/actions";

import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import ProductSkeletonCardLoader from "../components/loaders/ProductSkeletonCardLoader";
import Paginations from "../components/filter and pagination/pagination";
import useProductFilter from "../components/filter and pagination/useProductFilter";
import ProductCard from "../components/products/ProductCard";
import Filter from "../components/filter and pagination/filter";



const Products = () => {


    const { products, categories, pagination, isLoading, errorMessage } = useSelector((state) => state.products);

    const dispatch = useDispatch();

    useProductFilter();

    // useEffect(() => {
    //     dispatch(fetchProducts());
    // }, [dispatch]);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
       
        <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
            <Filter  categories={categories? categories:[]}/>

            {isLoading ? (
                <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <ProductSkeletonCardLoader key={i} />
                    ))}
                </div>
            ) : errorMessage ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <DotLottieReact
                    src="\animations\error.json"
                    loop
                    autoplay
                    style={{ width: '280px', height: '280px' }}
                    />
                    <h2 className="text-2xl font-semibold mt-4">
                        Oops!
                    </h2>
                    <p className="text-gray-500 mt-2">
                        {errorMessage}
                    </p>
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
                            )))
                             : (
                            <div className="col-span-full flex flex-col items-center justify-center min-h-[60vh] gap-5">
                               <DotLottieReact
                               src="\animations\empty.json"
                               loop
                               autoplay
                               style={{ width: '280px', height: '280px' }}/>


                                <h1 className="text-4xl md:text-6xl font-bold text-gray-500 text-center">
                                    No Products Available
                                </h1>

                                <p className="text-lg text-gray-400 text-center max-w-md">
                                    Try changing your search or filter criteria.
                                </p>
                            </div>
                        )}
                       
                    </div>
                     <div className ="flex justify-center pt-10">
                                <Paginations 
                                    numberOfPage = {pagination?.totalPages}
                                    totalProducts = {pagination?.totalElements}/>
                            </div>
                </div>
                
            )}
        </div>
    );
};

export default Products;