import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import SetQuantity from "./SetQuantity";
import {
  decreaseCartQuantity,
  fetchCartProducts,
  increaseCartQuantity,
  removeFromCart,
} from "../../store/actions";
import { formatPrice } from "../../utils/FormatPrice";

const ItemContent = ({
  productId,
  productName,
  productImage,
  productDescription,
  productQuantity,
  productPrice,
  productDiscount,
  productDiscountedPrice,
  cartId,
  quantity,
}) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const dispatch = useDispatch();

  const cartItem = {
    productId,
    productName,
    productImage,
    productDescription,
    productQuantity,
    productPrice,
    productDiscountedPrice,
  };

  const handleQtyIncrease = () => {
    dispatch(
      increaseCartQuantity(
        cartItem,
        toast,
        currentQuantity,
        setCurrentQuantity
      )
    );
  };

  const handleQtyDecrease = () => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      setCurrentQuantity(newQuantity);
      dispatch(decreaseCartQuantity(cartItem, newQuantity));
    }
  };

  const removeItemFromCart = () => {
    dispatch(removeFromCart(cartItem, toast));
  };

  return (
    <div className="p-5 hover:bg-gray-50 transition-colors duration-200">
      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-5 gap-6 items-center">
        {/* Product */}
        <div className="col-span-2 flex gap-4 items-center">
          <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden border bg-white">
            <img
              src={`${import.meta.env.VITE_BACK_END_URL}/images/${ productImage }`}
              alt={productName}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-800 text-lg line-clamp-2">
              {productName}
            </h3>

            {productDiscount > 0 && (
              <span className="mt-2 w-fit text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">
                {productDiscount}% OFF
              </span>
            )}

            <button
              onClick={removeItemFromCart}
              className="mt-4 flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium transition"
            >
              <HiOutlineTrash size={18} />
              Remove
            </button>
          </div>
        </div>

        {/* Price */}
        <div className="text-center">
          <div className="font-semibold text-gray-800">
            {formatPrice(Number(productDiscountedPrice))}
          </div>

          {Number(productPrice) > Number(productDiscountedPrice) && (
            <div className="text-sm text-gray-400 line-through mt-1">
              {formatPrice(Number(productPrice))}
            </div>
          )}
        </div>

        {/* Quantity */}
        <div className="flex justify-center">
          <SetQuantity
            quantity={currentQuantity}
            cardCounter={true}
            handeQtyIncrease={handleQtyIncrease}
            handleQtyDecrease={handleQtyDecrease}
          />
        </div>

        {/* Total */}
        <div className="text-center font-bold text-lg text-banner-color4">
          {formatPrice(
            Number(currentQuantity) * Number(productDiscountedPrice)
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden border rounded-xl p-4 bg-white shadow-sm">
        <div className="flex gap-4">
          <div className="w-24 h-24 rounded-lg overflow-hidden border shrink-0">
            <img
              src={productImage}
              alt={productName}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 line-clamp-2">
              {productName}
            </h3>

            {productDiscount > 0 && (
              <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                {productDiscount}% OFF
              </span>
            )}

            <div className="mt-3">
              <div className="text-lg font-bold text-banner-color4">
                {formatPrice(Number(productDiscountedPrice))}
              </div>

              {Number(productPrice) >
                Number(productDiscountedPrice) && (
                <div className="text-sm text-gray-400 line-through">
                  {formatPrice(Number(productPrice))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <SetQuantity
            quantity={currentQuantity}
            cardCounter={true}
            handeQtyIncrease={handleQtyIncrease}
            handleQtyDecrease={handleQtyDecrease}
          />
        </div>

        <div className="mt-5 flex justify-between items-center border-t pt-4">
          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-xl font-bold text-banner-color4">
              {formatPrice(
                Number(currentQuantity) * Number(productDiscountedPrice)
              )}
            </p>
          </div>

          <button
            onClick={removeItemFromCart}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-red-300 text-red-500 hover:bg-red-50 transition"
          >
            <HiOutlineTrash size={18} />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemContent;