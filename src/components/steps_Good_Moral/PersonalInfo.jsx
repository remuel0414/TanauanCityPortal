import React, { useContext, useEffect, useState } from 'react';
import { StepperContext } from '../../context/StepperContext';

export default function PersonalDetails({handlePersonalInfoFieldsComplete}) {
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
    const requiredFields = ["fullname", "date-of-birth", "address-good-moral", "contact-details-gm", "goodmoral-purpose"];
    const isComplete = requiredFields.every(field => !!userData[field]);
    // Check if the file is uploaded
    const isFileUploaded = !!uploadedFiles['government-id'];
    handlePersonalInfoFieldsComplete(isComplete, isFileUploaded);
  }, [userData, uploadedFiles, handlePersonalInfoFieldsComplete]);

  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1 ">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Full Name  
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded ">
          <input
            onChange={handleChange}
            value={userData["fullname"] || ""}
            name="fullname"
            placeholder="SURNAME , FIRSTNAME MIDDLENAME"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>

      

      {/* Remaining input fields */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Date of Birth
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            type="date"
            value={userData["date-of-birth"] || ""}
            name="date-of-birth"
            placeholder="Indicate Date of birth"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Address
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["address-good-moral"] || ""}
            name="address-good-moral"
            placeholder="Please input address"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Contact Details
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["contact-details-gm"] || ""}
            name="contact-details-gm"
            placeholder="Please input Number or Email"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Purpose
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["goodmoral-purpose"] || ""}
            name="goodmoral-purpose"
            placeholder="Indicate Purpose of Request"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>

        <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Valid ID
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
