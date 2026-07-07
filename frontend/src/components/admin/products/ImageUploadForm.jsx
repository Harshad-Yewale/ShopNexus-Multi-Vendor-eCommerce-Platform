import React, { useRef, useState } from "react";
import { FaCloudUploadAlt, FaTrashAlt } from "react-icons/fa";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateProductImageFromDashboard } from "../../../store/actions";

const ImageUploadForm = ({ setOpen, product }) => {
  const [loader, setLoader] = useState(false);
  const fileInputRef = useRef();
  const dispatch = useDispatch();

  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const onHandleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type) ) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    } 
    else {
      toast.error("Please select a valid image (.jpg, .jpeg, .png)");
      setPreviewImage(null);
      setSelectedFile(null);
    }
  };

  const handleClearImage = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    fileInputRef.current.value = null;
  };

 const addNewImageHandler = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            toast.error("Please select an image before saving.");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);

        dispatch(updateProductImageFromDashboard(formData, product.id, toast, setLoader, setOpen));
    };

  return (
    <div className="p-6 h-full">
      <form
        onSubmit={addNewImageHandler}
        className="flex flex-col h-full justify-between"
      >
        <div className="space-y-6">
          <label htmlFor="image"
            className="group flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-300 hover:border-custom-blue rounded-xl bg-slate-50 hover:bg-blue-50 transition-all duration-300 cursor-pointer py-12"
          >
            <FaCloudUploadAlt
              size={55}
              className="text-slate-400 group-hover:text-custom-blue transition"
            />

            <div className="text-center">
              <p className="font-semibold text-slate-700 text-lg">
                Upload Product Image
              </p>

              <p className="text-sm text-slate-500 mt-1">
                JPG, JPEG or PNG • Max 5 MB
              </p>
            </div>

            <input
              id="image"
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png"
              className="hidden"
              onChange={onHandleImageChange}
            />
          </label>

          {/* Preview */}
          {previewImage && (
            <div className="border rounded-xl p-5 bg-white shadow-sm">
              <p className="font-semibold text-slate-700 mb-4">
                Image Preview
              </p>

              <div className="flex flex-col items-center gap-4">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-72 w-auto rounded-lg border object-contain"
                />

                <div className="w-full flex justify-between items-center">
                  <div>
                    <p className="font-medium text-slate-700">
                      {selectedFile?.name}
                    </p>

                    <p className="text-sm text-slate-500">
                      {(selectedFile?.size / 1024).toFixed(1)} KB
                    </p>
                  </div>

                  <Button
                    color="error"
                    variant="outlined"
                    startIcon={<FaTrashAlt />}
                    onClick={handleClearImage}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between gap-3 mt-8 pt-5 border-t">
          <Button
            variant="outlined"
            disabled={loader}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={loader}
            sx={{
              textTransform: "none",
              px: 4,
            }}
          >
            {loader ? "Uploading..." : "Update Image"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ImageUploadForm;