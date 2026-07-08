import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../shared/InputField';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addProductFromDashboard, fetchCategories, updateProductFromDashboard } from '../../../store/actions';
import toast from 'react-hot-toast';
import SelectTextField from '../../shared/SelectTextField';
import Category from '../category/Category';

const AddProductForm = ({ setOpen, product, update=false, buttonName}) => {
const [loader, setLoader] = useState(false);
const [selectedCategory, setSelectedCategory] = useState();
const { categories, isLoading, errorMessage } = useSelector((state) => state.products);
const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors }
    } = useForm({
        mode: "onTouched"
    });

  useEffect(() => {
        if (!update) {
            dispatch(fetchCategories());
        }
    }, [dispatch, update]);

    useEffect(() => {
        if (!isLoading && categories) {
            setSelectedCategory(categories[0]);
        }
    }, [categories, isLoading]);


const price = Number(watch("productPrice")) || 0;
const discount = Number(watch("productDiscount")) || 0;

useEffect(() => {
    const discountedPrice =
        price - (price * discount) / 100;

    setValue("productDiscountedPrice", discountedPrice.toFixed(2));
}, [price, discount, setValue]);

    const saveProductHandler = (data) => {
      const categoryId=Number(selectedCategory.categoryId);
        if(!update) {
            const sendData ={
              ...data,
            };
         dispatch(addProductFromDashboard(categoryId,sendData, toast, reset, setLoader, setOpen))
        } else {
            const sendData = {
                ...data,
                id: product.id,
            };
            dispatch(updateProductFromDashboard(sendData, toast, reset, setLoader, setOpen));
        }
    };


    useEffect(() => {
        if (update && product) {
            setValue("productName", product?.productName);
            setValue("productPrice", product?.price);
            setValue("productQuantity", product?.quantity);
            setValue("productDiscount", product?.discount);
            setValue("productDiscountedPrice", product?.DiscountedPrice);
            setValue("productDescription", product?.description);
        }
    }, [update, product]);

  return (
    <div className='py-5 relative h-full'>
        <form className='space-y-4'
            onSubmit={handleSubmit(saveProductHandler)}>
            <div className='flex md:flex-row flex-col gap-4 w-full'>
                <InputField 
                    label="Product Name"
                    required
                    id="productName"
                    type="text"
                    message="This field is required*"
                    register={register}
                    placeholder="Product Name"
                    errors={errors}
                    />
            </div>

             {!update && (
                    <SelectTextField
                        label="Select Categories"
                        select={selectedCategory}
                        setSelect={setSelectedCategory}
                        lists={categories}
                        labelKey="categoryName"
                        valueKey="categoryID"
                    />
                )}

            <div className='flex md:flex-row flex-col gap-4 w-full'>
                <InputField 
                    label="Price"
                    required
                    id="productPrice"
                    type="number"
                    message="This field is required*"
                    placeholder="Product Price"
                    register={register}
                    errors={errors}
                    />

                    <InputField 
                    label="Quantity"
                    required
                    id="productQuantity"
                    type="number"
                    message="This field is required*"
                    register={register}
                    placeholder="Product Quantity"
                    errors={errors}
                    />
            </div>
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
              label="Discount"
              id="productDiscount"
              type="number"
              required
              min={0}
              max={100}
              message="Discount must be between 0 and 100"
              register={register}
              errors={errors}
          />
          <InputField
            label="Discounted Price"
            id="productDiscountedPrice"
            type="number"
            message="This field is required*"
            placeholder="Product Discount"
            register={register}
            errors={errors}
            ReadOnly
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
            <label htmlFor='desc'
              className='font-semibold text-sm text-slate-800'>
                Description
            </label>

            <textarea
                rows={5}
                placeholder="Add product description...."
                className={`px-4 py-2 w-full border outline-hidden bg-transparent text-slate-800 rounded-md ${
                    errors["productDescription"]?.message ? "border-red-500" : "border-slate-700" 
                }`}
                {...register("productDescription", {
                    required: {value: true, message:"Description is required"},
                })}
                />

                {errors["productDescription"]?.message && (
                    <p className="text-sm font-semibold text-red-600 mt-0">
                        {errors["productDescription"]?.message}
                    </p>
                )}
        </div>

        <div className='flex w-full justify-between items-center absolute bottom-14'>
            <Button disabled={loader}
                    onClick={() => setOpen(false)}
                    variant='outlined'
                    className='text-white py-2.5 px-4 text-sm font-medium'>
                Cancel
            </Button>

            <Button
                disabled={loader}
                type='submit'
                variant='contained'
                color='primary'
                className='bg-custom-blue text-white  py-2.5 px-4 text-sm font-medium'>
                {loader ? (
                    <div className='flex gap-2 items-center'>
                       Loading...
                    </div>
                ) : (
                    buttonName
                )}
            </Button>
        </div>
        </form>
    </div>
  )
}

export default AddProductForm