import React from 'react';

const StepperControlResidency = ({ handleClick, currentStep, steps, personalInfoFieldsComplete, residencyAddressFieldsComplete, uploadIDFieldsComplete, paymentFieldsComplete }) => {

  const isNextButtonDisabled = () => {
    if (currentStep === 1) {
      return !personalInfoFieldsComplete;
    } else if (currentStep === 2) {
      return !residencyAddressFieldsComplete;
    } else if (currentStep === 3) {
      return !uploadIDFieldsComplete;
    } else if (currentStep === 4) {
      return !paymentFieldsComplete;
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

export default StepperControlResidency;
