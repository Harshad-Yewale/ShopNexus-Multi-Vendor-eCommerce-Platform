import {Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle,
} from "@headlessui/react";
import { MdClose, MdDone } from "react-icons/md";
import Status from "./status";

function ProductViewModal({ open, setOpen, product, isAvailable, isAdmin = false,}) {
  if (!product) return null;
  const {id,
    productName,
    productImage,
    productDescription,
    productQuantity,
    productPrice,
    productDiscount,
    productDiscountedPrice,
    category,
    user,
  } = product;

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      {/* Backdrop */}
      <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="grid md:grid-cols-2">
              {/* Left Side */}
              <div className="bg-slate-100 flex items-center justify-center p-8">
                {productImage ? (
                  <img
                    src={productImage}
                    alt={productName}
                    className="max-h-[500px] w-full object-contain rounded-xl"
                  />
                ) : (
                  <div className="text-slate-400">
                    No Image Available
                  </div>
                )}
              </div>

              {/* Right Side */}
              <div className="flex flex-col p-8">
                <DialogTitle className="text-3xl font-bold text-slate-800">
                  {productName}
                </DialogTitle>

                {/* Price */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {productDiscountedPrice ? (
                    <>
                      <span className="text-4xl font-bold text-custom-blue">
                        ₹{Number(productDiscountedPrice).toFixed(2)}
                      </span>

                      <span className="text-xl text-slate-400 line-through">
                        ₹{Number(productPrice).toFixed(2)}
                      </span>

                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                        {productDiscount}% OFF
                      </span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold text-custom-blue">
                      ₹{Number(productPrice).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Status */}
                <div className="mt-5">
                  {isAvailable ? (
                    <Status
                      text="In Stock"
                      icon={MdDone}
                      bg="bg-emerald-100"
                      color="text-emerald-700"
                    />
                  ) : (
                    <Status
                      text="Out of Stock"
                      icon={MdClose}
                      bg="bg-rose-100"
                      color="text-rose-700"
                    />
                  )}
                </div>

                {/* Description */}
                <div className="mt-8">
                  <h3 className="mb-2 text-lg font-semibold text-slate-800">
                    Description
                  </h3>

                  <p className="leading-7 text-slate-600">
                    {productDescription}
                  </p>
                </div>

                {/* Admin Section */}
                {isAdmin && (
                  <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="mb-5 text-lg font-semibold text-slate-800">
                      Product Information
                    </h3>

                    <div className="space-y-4">

                      <div className="flex justify-between border-b pb-2">
                        <span className="text-slate-500">
                          Product ID
                        </span>

                        <span className="font-medium">
                          #{id}
                        </span>
                      </div>

                      <div className="flex justify-between border-b pb-2">
                        <span className="text-slate-500">
                          Quantity
                        </span>

                        <span className="font-medium">
                          {productQuantity}
                        </span>
                      </div>

                      {category && (
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-slate-500">
                            Category
                          </span>

                          <span className="font-medium">
                            {category.categoryName}
                          </span>
                        </div>
                      )}

                      {user && (
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-slate-500">
                            Seller
                          </span>

                          <span className="font-medium">
                            {user.name}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span className="text-slate-500">
                          Discount
                        </span>

                        <span className="font-medium text-green-600">
                          {productDiscount
                            ? `${productDiscount}%`
                            : "No Discount"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="mt-auto pt-8">
                  <div className="border-t pt-5 flex justify-end">
                    <Button
                      onClick={() => setOpen(false)}
                      className="rounded-lg border border-slate-300 px-6 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ProductViewModal;