import { useEffect } from "react";
import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CartEmpty from "../components/Cart/EmptyCart";
import ItemContent from "../components/Cart/ItemContent";
import { fetchCartProducts } from "../store/actions";
import { formatPrice } from "../utils/FormatPrice";

const Cart = () => {
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);
  const { cartProducts } = useSelector((state) => state.products);

  useEffect(() => {
    if (cart.length != cartProducts.length) {
      dispatch(fetchCartProducts());
    }
  }, [dispatch, cart.length, cartProducts.length]);

  const totalPrice = cart.reduce(
    (acc, item) =>
      acc +
      Number(item.productDiscountedPrice) * Number(item.quantity),
    0
  );

  if (!cart || cart.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-800">
              <MdShoppingCart className="text-banner-color4" size={34} />
              Shopping Cart
            </h1>

            <p className="mt-2 text-gray-500">
              {cart.length} {cart.length === 1 ? "Item" : "Items"} in your cart
            </p>
          </div>

          <Link
            to="/products"
            className="flex items-center gap-2 text-banner-color4 font-medium hover:underline"
          >
            <MdArrowBack />
            Continue Shopping
          </Link>
        </div>

        {/* Main Layout */}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Product List */}

          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Desktop Header */}

            <div className="hidden md:grid md:grid-cols-5 gap-4 px-6 py-5 bg-gray-100 border-b text-gray-600 font-semibold">
              <div className="col-span-2">Product</div>

              <div className="text-center">Price</div>

              <div className="text-center">Quantity</div>

              <div className="text-center">Total</div>
            </div>

            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <ItemContent key={item.productId} {...item} />
              ))}
            </div>
          </div>

          {/* Order Summary */}

          <div className="h-fit bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:sticky lg:top-24">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>

                <span className="font-medium">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>

                <span className="font-medium text-green-600">
                  Free
                </span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Taxes</span>

                <span>Calculated at checkout</span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>

                <span className="text-banner-color4">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            <Link to="/checkout">
              <button className="mt-8 w-full py-3 rounded-xl bg-banner-color4 text-white cursor-pointer font-semibold hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg">
                Proceed to Checkout
              </button>
            </Link>

            <div className="mt-5 space-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                ✅ Secure Checkout
              </div>

              <div className="flex items-center gap-2">
                🚚 Free Shipping
              </div>

              <div className="flex items-center gap-2">
                ↩️ Easy Returns
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <Link
                to="/products"
                className="flex items-center justify-center gap-2 text-banner-color4 font-medium hover:underline"
              >
                <MdArrowBack />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;