import React from 'react'
import HeroBanner from '../components/Home/HeroBanner'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProductCard from '../components/products/ProductCard';
import ProductSkeletonCardLoader from '../components/loaders/ProductSkeletonCardLoader';
import { fetchCategories, fetchProducts } from '../store/actions';
import CategoryCardSlider from '../components/Home/CategoryCardSlider';


const HomePage=()=> {

  const dispatch = useDispatch();
    const {products,categories} = useSelector((state) => state.products);
    const { isLoading, errorMessage } = useSelector(
        (state) => state.products
    );
   
    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, [dispatch]);
  return (
      <div className="lg:px-14 sm:px-8 px-4">
            <div className="py-6">
                <HeroBanner />
            </div>
            <CategoryCardSlider/>
            
            <div className="py-5">
                <div className="flex flex-col justify-center items-center space-y-2">
                    <h1 className="text-slate-800 text-4xl font-bold"> Products</h1>
                        <span className="text-slate-700">
                            Discover our handpicked selection of top-rated items just for you!
                        </span>
                    
                </div>

                {isLoading ? (
                    <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <ProductSkeletonCardLoader key={i} />
                    ))}
                </div>
                ) : errorMessage ? (
                    <div className="flex justify-center items-center h-50">
                        <FaExclamationTriangle className="text-slate-800 text-3xl mr-2"/>
                        <span className="text-slate-800 text-lg font-medium">
                            {errorMessage}
                        </span>
                    </div>
                ) : (
            <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                       {products && 
                       products?.slice(0,6)
                                .map((item, i) => <ProductCard key={i} {...item} />
                        )}
                    </div>
                    )}
            </div>
            
      
    </div>
  )
}


export default HomePage;
