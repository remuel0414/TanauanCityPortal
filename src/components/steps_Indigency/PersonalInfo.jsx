import React, { useState, useEffect, useContext } from 'react';
import { StepperContext } from '../../context/StepperContext';

export default function PersonalDetails({ handlePersonalInfoFieldsComplete, passInputDataToParent}) {
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

// Check if all required fields are filled whenever userData changes
useEffect(() => {
  const requiredFields = ['fullname', 'sex', 'residency-purpose'];
  const isComplete = requiredFields.every(fieldName => userData[fieldName] !== '');
  handlePersonalInfoFieldsComplete(isComplete);
}, [userData, handlePersonalInfoFieldsComplete]);

useEffect(() => {
  passInputDataToParent(inputData);
}, [inputData, passInputDataToParent]);

  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Full Name  
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={inputData["fullname"] || ""}
            name="fullname"
            placeholder="SURNAME , FIRSTNAME MIDDLENAME"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            required
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
            value={inputData["sex"] || ""}
            name="sex"
            placeholder="Male / Female / Others"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            required
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
            value={inputData["residency-purpose"] || ""}
            name="residency-purpose"
            placeholder="Indicate Purpose of Request"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            required
          />
        </div>
      </div>
    </div>
  );
}
