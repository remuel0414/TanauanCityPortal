import React, { useContext, useState, useEffect } from 'react';
import { StepperContext } from '../../context/StepperContext';

export default function PersonalDetails({ handlePersonalInfoFieldsComplete, passInputDataToParent, passIdToParent }) {
  const { userData, setUserData } = useContext(StepperContext);
  const [inputData, setInputData] = useState(userData);
  const [IdFiles, setIdFiles] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({}); // State to track uploaded files
  const [isFileUploaded, setIsFileUploaded] = useState(false); // Define isFileUploaded state

  useEffect(() => {
    passIdToParent(IdFiles); // Pass the proof of payment to the parent component whenever IdFiles changes
  }, [IdFiles, passIdToParent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData(prevInputData => ({ ...prevInputData, [name]: value }));
    passInputDataToParent(inputData); // Step 2: Pass data to parent
  };

  useEffect(() => {
    setUserData(inputData);
  }, [inputData, setUserData]);

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setIdFiles(prevIdFiles => ({
      ...prevIdFiles,
      [fieldName]: file ? [file] : [], // Set as an array with the file or an empty array if no file is selected
    }));
  
    // Set isFileUploaded to true when a file is uploaded
    setIsFileUploaded(true);
  };

  
  useEffect(() => {
    // Check if all required fields are filled
    const requiredFields = ["fullname", "date-of-birth", "address", "contact-details", "good-moral-purpose"];
    const isComplete = requiredFields.every(field => !!userData[field]);

    // Check if the file is uploaded


    handlePersonalInfoFieldsComplete(isComplete, isFileUploaded);
    console.log("isFileUploaded state: ", isFileUploaded)
  }, [userData, isFileUploaded, handlePersonalInfoFieldsComplete, [IdFiles['government-id']]]);

  const handleCancelUpload = (fieldName, fileName) => {
    const updatedIdFiles = {
      ...IdFiles,
      [fieldName]: IdFiles[fieldName].filter(file => file.name !== fileName)
    };
  
    // Check if any files are remaining after canceling upload
    const isFileUploaded = !!updatedIdFiles[fieldName].length;
  
    setIdFiles(updatedIdFiles);
    setIsFileUploaded(isFileUploaded);
    console.log("isFileUploaded state: ", isFileUploaded)
  };
  
  return (
    <div className="flex flex-col">
      {/* Input fields for personal details */}
      {/* Surname */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Full Name
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["fullname"] || ""}
            name="fullname"
            placeholder="Surname, First Name Middle Name"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            required
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Date of Birth
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            type = "date"
            onChange={handleChange}
            value={userData["date-of-birth"] || ""}
            name="date-of-birth"
            placeholder="MM-DD-YYYY"
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
            value={userData["address"] || ""}
            name="address"
            placeholder="Your Address"
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
            value={userData["contact-details"] || ""}
            name="contact-details"
            placeholder="Your Contact Number/Email"
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
            value={userData["good-moral-purpose"] || ""}
            name="good-moral-purpose"
            placeholder="Purpose of Request"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
        <ul>
          <li className='flex justify-between items-center mb-8'>
            <span className='text-sm sm:text-base mt-[10px] '>Government Issued ID: </span>
            <input
                type='file'
                id='government-id-input'
                name='government-id-input'
                className='hidden'
                onChange={(e) => handleFileChange(e, 'government-id')}
                required // Mark as required
            />
            <label
                htmlFor='government-id-input'
                className='bg-blue-500 text-white py-1 px-2 rounded-md border border-gray-300 hover:bg-blue-600 cursor-pointer mr-2 mt-[10px] ml-auto'
            >
                Choose Files
            </label>
            <div>
            {IdFiles['government-id'] && IdFiles['government-id'].map((file, index) => (
                <div key={index} className="flex items-center bg-white py-1 px-2 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer mr-2 mt-4">
                    <p className="mr-2">{file.name}</p>
                    <button className='ml-auto text-black-600 bg-red-600 w-[30px] rounded' onClick={() => handleCancelUpload('government-id', file.name)}>x</button>
                </div>
            ))}
            </div>
            </li>
          </ul>
    </div>
  );
}
