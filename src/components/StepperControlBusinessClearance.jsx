// StepperControlBusinessClearance.jsx
import React from 'react';

const StepperControlBusinessClearance = ({ handleClick, currentStep, steps, uploadFieldsComplete, 
  businessInfoFieldsComplete, addressInfoFieldsComplete, personalDetailsComplete, 
  ownerAddressFieldsComplete, paymentFieldsComplete }) => {

    
  const isNextButtonDisabled = () => {
    if (currentStep === 1) {
      return !uploadFieldsComplete;
    } else if (currentStep === 2) {
      return !businessInfoFieldsComplete;
    } else if (currentStep === 3) {
      return !addressInfoFieldsComplete;
    } else if (currentStep === 4) {
      return !personalDetailsComplete;
    } else if (currentStep === 5) {
      return !ownerAddressFieldsComplete;
    } else if (currentStep === 6) {
      return !paymentFieldsComplete; // Disable Next button if payment fields are not complete
    } else {
      return false;
    }
  };
  
  return (
    <div className="container flex justify-around mt-4 mb-8">
      <button
        onClick={() => handleClick()}
        className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl 
          font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700
          hover:text-white transition duration-200 ease-in-out ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Back
      </button>

      <button
        onClick={() => handleClick("next")}
        disabled={isNextButtonDisabled()}
        className={`uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer transition duration-200 ease-in-out 
                ${!isNextButtonDisabled() ? "bg-green-500 text-white hover:bg-green-900 hover:text-white" : "bg-green-200 text-gray-700 cursor-not-allowed"}`}
      >
        {currentStep === steps.length - 1 ? "Confirm" : "Next"}
      </button>
    </div>
  );
}

export default StepperControlBusinessClearance;
