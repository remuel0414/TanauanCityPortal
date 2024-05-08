import React, { useContext, useState, useEffect } from 'react';
import { StepperContext } from '../../context/StepperContext';

export default function PersonalDetails({ handlePersonalDetailsFieldsComplete }) {
  const { userData, setUserData } = useContext(StepperContext);
  const [uploadedFiles, setUploadedFiles] = useState({}); // State to track uploaded files

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedFiles({ ...uploadedFiles, 'government-id': file }); // Update the key to match the file input name
  };

  useEffect(() => {
    // Check if all required fields are filled
    const requiredFields = ["surname", "given-name", "middle-name", "suffix", "sex"];
    const isComplete = requiredFields.every(field => !!userData[field]);
    // Check if the file is uploaded
    const isFileUploaded = !!uploadedFiles['government-id'];
    handlePersonalDetailsFieldsComplete(isComplete, isFileUploaded);
  }, [userData, uploadedFiles, handlePersonalDetailsFieldsComplete]);

  return (
    <div className="flex flex-col">
      {/* Input fields for personal details */}
      {/* Surname */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Surname  
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["surname"] || ""}
            name="surname"
            placeholder="Surname"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            required
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Given Name
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["given-name"] || ""}
            name="given-name"
            placeholder="Your given name"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Middle Name:
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["middle-name"] || ""}
            name="middle-name"
            placeholder="Your Middle Name"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
      
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Suffix
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["suffix"] || ""}
            name="suffix"
            placeholder="Your Suffix"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Sex
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["sex"] || ""}
            name="sex"
            placeholder="Male / Female / Others"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Government Issued ID
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            type='file'
            id='government-id'
            name='government-id'
            className='hidden'
            onChange={handleFileChange}
          />
          <label
            htmlFor='government-id'
            className='bg-white py-1 px-2 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer mr-2'
          >
            Choose File
          </label>
          <span className='text-sm'>{uploadedFiles['government-id'] ? uploadedFiles['government-id'].name : "No File Uploaded"}</span>
        </div>
      </div>
    </div>
  );
}
