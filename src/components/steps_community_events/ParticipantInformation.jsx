import React, { useContext, useState, useEffect } from 'react';
import { StepperContext } from '../../context/StepperContext';

export default function ParticipantInformation({handleParticipantInformationFieldsComplete, passInputDataToParent}) {
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
    const requiredFields = ['participant-number', 'participant-target', 'participant-requirements'];
    const isComplete = requiredFields.every(fieldName => userData[fieldName] !== '');
    handleParticipantInformationFieldsComplete(isComplete);
  }, [userData, handleParticipantInformationFieldsComplete]);

  useEffect(() => {
    passInputDataToParent(inputData);
  }, [inputData, passInputDataToParent]);

  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Number of Participants
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            type = "number"
            value={userData["participant-number"] || ""}
            name="participant-number"
            placeholder="Specify the number of participants in the Event"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>


      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
            Target audience/participants
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["participant-target"] || ""}
            name="participant-target"
            placeholder="Who are the Target audience or demographics of participants"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase ">
            Special requirements
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["participant-requirements"] || ""}
            name="participant-requirements"
            placeholder="Specify Special requirements or accommodations for participants"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>


      
    </div>
  );
}