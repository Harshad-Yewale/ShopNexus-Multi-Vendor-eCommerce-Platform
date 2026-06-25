import React from 'react'
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from './ProductViewModal';

const ProductCard = ({
        productId,
        productName,
        productImage,
        productDescription,
        productQuantity,
        productPrice,
        productDiscount,
        productDiscountedPrice
}) => {
    const [openProductViewModal, setOpenProductViewModal] = useState(false);
    const btnLoader = false;
    const [selectedViewProduct, setSelectedViewProduct] = useState("");
    const isAvailable = productQuantity && Number(productQuantity) > 0;

    const handleProductView = (product) => {
        setSelectedViewProduct(product);
        setOpenProductViewModal(true);
    };
  return (
    <div>
        <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
            <div onClick={() => {
                handleProductView({
                    id: productId,
                        productName,
                        productImage,
                        productDescription,
                        productQuantity,
                        productPrice,
                        productDiscount,
                        productDiscountedPrice,
                })
            }} 
                    className="w-full overflow-hidden aspect-3/2">
                <img 
                className="w-full h-full object-contain cursor-pointer transition-transform duration-300 transform hover:scale-105"
                src={productImage}
                alt={productName}>
                </img>
            </div>
            <div className="p-4">
                <h2 onClick={() => {
                handleProductView({
                    id: productId,
                        productName,
                        productImage,
                        productDescription,
                        productQuantity,
                        productPrice,
                        productDiscount,
                        productDiscountedPrice
                })
            }}
                    className="text-lg font-semibold mb-2 cursor-pointer">
                    {productName}
                </h2>
                
                <div className="min-h-20 max-h-20">
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">{productDescription}</p>
                </div>

                <div className="flex items-center justify-between">
                {productDiscountedPrice ? (
                    <div className="flex flex-col">
                        <span className="text-gray-400 line-through">
                            ₹{Number(productPrice).toFixed(2)}
                        </span>
                        <span className="text-xl font-bold text-slate-700">
                            ₹{Number(productDiscountedPrice).toFixed(2)}
                        </span>
                    </div>
                ) : (
                    <span className="text-xl font-bold text-slate-700">
                        {"  "}
                        ₹{Number(productPrice).toFixed(2)}
                    </span>
                )}

                <button
                    disabled={!isAvailable || btnLoader}
                    onClick={() => {}}
                    className={`bg-blue-500 ${isAvailable ? "opacity-100 hover:bg-blue-600 cursor-pointer" : "opacity-70 cursor-not-allowed"}
                        text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center `}>
                    <FaShoppingCart className="mr-2"/>
                    {isAvailable ? "Add to Cart" : "Stock Out"}
                </button>
                </div>
                 <ProductViewModal 
                open={openProductViewModal}
                setOpen={setOpenProductViewModal}
                product={selectedViewProduct}
                isAvailable={isAvailable}
            />
            </div>
        </div>
    </div>
  )
}

export default ProductCard
