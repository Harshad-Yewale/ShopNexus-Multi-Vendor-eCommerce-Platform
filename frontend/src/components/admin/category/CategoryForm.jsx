import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import InputField from '../../shared/InputField';
import { Button } from '@mui/material';
import { addCategoryFromDashboard, updateCategoryFromDashboard } from '../../../store/actions';
import toast from 'react-hot-toast';

function CategoryForm( {setOpen, loader,setLoader, selectedId, selectedItem, update=false,buttonName}) {
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

    const saveCategoryHandler = (data) => {
        if(!update) {
            const sendData ={
              ...data,
            };
         dispatch(addCategoryFromDashboard(sendData,toast,setLoader,setOpen));
        } else {
            const sendData = {
                ...data,
            };
            dispatch(updateCategoryFromDashboard(sendData,selectedId,toast,setLoader,setOpen));
        }
    };


    useEffect(() => {
        if (update && selectedItem) {
            setValue("categoryName", selectedItem?.categoryName);
        }
    }, [update, selectedItem]);

  return (
    <div className='py-5 relative h-full'>
        <form className='space-y-4'
            onSubmit={handleSubmit(saveCategoryHandler)}>
            <div className='flex md:flex-row flex-col gap-4 w-full'>
                <InputField 
                    label="Category Name"
                    required
                    id="categoryName"
                    type="text"
                    message="This field is required*"
                    register={register}
                    placeholder="category Name"
                    errors={errors}
                    />
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

export default CategoryForm
