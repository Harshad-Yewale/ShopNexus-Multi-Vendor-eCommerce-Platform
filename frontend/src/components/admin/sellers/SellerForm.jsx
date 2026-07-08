import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import InputField from '../../shared/InputField';
import { Button } from '@mui/material';
import { addCategoryFromDashboard, updateCategoryFromDashboard } from '../../../store/actions';
import toast from 'react-hot-toast';
import SelectTextField from '../../shared/SelectTextField';

function SellerForm( {setOpen, loader,setLoader, selectedId, selectedItem, update=false,buttonName}) {
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
  const [selectedRole, setSelectedRole] = useState({
    id: 2,
    name: "ROLE_SELLER",
  });


  const roles = [
    { id: 1, name: "ROLE_USER" },
    { id: 2, name: "ROLE_SELLER" },
  ];

    const saveSellerHandler = (data) => {
        if(!update) {
        //     const sendData ={
        //       ...data,
        //     };
        //  dispatch(addCategoryFromDashboard(sendData,toast,setLoader,setOpen));
        console.log(data);
        } else {
            // const sendData = {
            //     ...data,
            // };
            // dispatch(updateCategoryFromDashboard(sendData,selectedId,toast,setLoader,setOpen));
                console.log(data);
        }
    };


    useEffect(() => {
        if (update && selectedItem) {

        }
    }, [update, selectedItem]);



  return (
    <div className='py-5 relative h-full'>
     <form
        className="space-y-4"
        onSubmit={handleSubmit(saveSellerHandler)}
      >
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Username"
            required
            id="username"
            type="text"
            message="Username is required*"
            register={register}
            placeholder="Enter username"
            errors={errors}
          />

          <InputField
            label="Email"
            required
            id="email"
            type="email"
            message="Email is required*"
            register={register}
            placeholder="Enter email"
            errors={errors}
          />
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectTextField
              label="Role"
              select={selectedRole}
              setSelect={setSelectedRole}
              lists={roles}
              labelKey="name"
              valueKey="id"
            />
          </div>

       
        <div className="flex w-full justify-between items-center absolute bottom-14">
          <Button
            disabled={loader}
            onClick={() => setOpen(false)}
            variant="outlined"
            className="text-white py-2.5 px-4 text-sm font-medium"
          >
            Cancel
          </Button>

          <Button
            disabled={loader}
            type="submit"
            variant="contained"
            color="primary"
            className="bg-custom-blue text-white py-2.5 px-4 text-sm font-medium"
          >
            {loader ? (
              <div className="flex gap-2 items-center">
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

export default SellerForm
