
// PersonalDetails.jsx
import React, { useState, useContext, useEffect } from 'react';
import { StepperContext } from '../../context/StepperContext';

export default function PersonalDetails({ handlePersonalDetailsFieldsComplete, passInputDataToParent }) {
  const { userData, setUserData } = useContext(StepperContext);
  const [inputData, setInputData] = useState(userData);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    passInputDataToParent(inputData); // Step 2: Pass data to parent
  };

  useEffect(() => {
    setUserData(inputData);
  }, [inputData, setUserData]);

  useEffect(() => {
    const requiredFields = ["surname", "given-name", "middle-name", "suffix", "sex"];
    const isComplete = requiredFields.every(field => !!userData[field]);
    handlePersonalDetailsFieldsComplete(isComplete);
  }, [userData, handlePersonalDetailsFieldsComplete]);

  useEffect(() => {
    passInputDataToParent(inputData);
  }, [inputData, passInputDataToParent]);

  return (
    <div className="flex flex-col">
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
    </div>
  );
}
