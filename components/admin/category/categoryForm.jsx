import React from "react";
import { useState } from "react";
import { uploadFile } from "@/functions/firebase/addImage";
import { toast } from "react-toastify";
const CategoryForm = ({ title, setTitle, image, setImage , handleClick }) => {
  const [file, setFile] = useState("");

  const uploadImage = async (e) => {
    console.log("file-->", file);

    e.preventDefault();

    if (!file) {
      // return with nothing will stop function and  all logic will came after it
      toast.error("file is Empty you have to add some files before upload");
      return;
    }

    const filePath = `cats/${file?.name}`;

    try {
      // upload file data and folder path to uploadFile Function
      // if this function success will return  image url {link}
      const url = await uploadFile(file, filePath);

      setImage({ name: file.name, url: url });

      toast.success("Image Uploaded Successfully");
      setFile({})

      console.log("url in form", url);
    } catch (error) {
      toast.error("something wrong");
    }
  };



  // 





  return (
    <div>
      <div className="w-full  p-4">
        <div className="w-[70%] md:!w-[40%] ">
          <div className="    ">
           
            {file?.name}
            <p className=" mb-2  font-semibold">Category title</p>
            <input
            onChange= {(e)=>setTitle(e.target.value)}
              className="w-full border-2 text-black font-medium rounded-md border-teal-400 py-3 px-6"
              type="text"
              placeholder="title"
            
              value={title}
            />
          </div>

          <div className=" my-4">
            <div className="w-full flex">
              <input
                type="file"
                id="file"
                name=""
                className="text-black font-medium rounded-md border-teal-400 py-3 px-6 border-2 border-r-0 rounded-r-none"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button
                onClick={uploadImage}
                type="button"
                className="rounded-l-none   inline-block shrink-0 rounded-md border border-teal-600 bg-teal-600 px-12 py-3 text-sm font-medium text-white transition hover:text-teal-700  focus:outline-none focus:ring active:text-teal-500 "
                //   onClick={uploadImage}
              >
                Upload Image
              </button>
            </div>

            <div className="text-xl font-cutiveMono text-center py-2">or</div>
            <div className="w-full">
              <input
                className="w-full border-2 text-black font-medium rounded-md border-teal-400 py-3 px-6"
                type="text"
                placeholder="Image url"
                onChange={(e) => setImage({ ...image, url: e.target.value })}
                value={image?.url}
              />
            </div>
          </div>

          <div className="w-full md:w-full text-center">
            <button
            onClick={handleClick}
              className=" block   w-[40%] m-auto shrink-0 rounded-md border border-teal-600 bg-teal-600 px-12 py-3 text-sm font-medium text-white transition   focus:outline-none focus:ring active:text-teal-500 "
              
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
