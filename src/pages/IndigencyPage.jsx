import React, { useState } from 'react';
import Stepper from '../components/Stepper';
import { StepperContext } from '../context/StepperContext';
import UploadID from '../components/steps_Indigency/UploadID';
import PersonalInfo from '../components/steps_Indigency/PersonalInfo';
import IndigencyAddress from '../components/steps_Indigency/IndigencyAddress';
import Final from '../components/steps_Indigency/Final';
import Payment from '../components/steps_Indigency/Payment';
import StepperControlIndigency from '../components/StepperControlIndigency';

function IndigencyPage() {

    const [currentStep, setCurrentStep] = useState(1);
    const [userData, setUserData] = useState({
        "government-id": "",
        "fullname": "",
        "sex": "",
        "indigency-purpose": "",
        "house-bldg-number": "",
        "building-name": "",
        "lot-number": "",
        "subdivision": "",
        "street": "",
        "region": "",
        "province": "",
        "city": "",
        "barangay": "",
        "proof-of-payment" : "",
        "reference-number" : "",
        "date-of-payment" : ""
    });
    const [finalData, setFinalData] = useState([]);
    const [uploadIDFieldsComplete, setUploadIDFieldsComplete] = useState(false);
    const [personalInfoFieldsComplete, setPersonalInfoFieldsComplete] = useState(false);
    const [indigencyAddressFieldsComplete, setIndigencyAddressFieldsComplete] = useState(false);
    const [paymentFieldsComplete, setPaymentFieldsComplete] = useState(false);

    const steps = [
        "Upload Government Issued ID",
        "Personal Information",
        "Address",  
        "Payment",
        "Complete"
    ];

    const handleUploadIDComplete = (isComplete) => {
        setUploadIDFieldsComplete(isComplete);
    };

    const handlePersonalInfoFieldsComplete = (isComplete) => {
        setPersonalInfoFieldsComplete(isComplete);
    };

    const handleIndigencyAddressFieldsComplete = (isComplete) => {
        setIndigencyAddressFieldsComplete(isComplete);
    };

    const handlePaymentFieldsComplete = (isComplete, uploadFieldComplete) => {
        setPaymentFieldsComplete(isComplete && uploadFieldComplete);
    };

    const displayStep = (step) => {
        switch (step) {
            case 1:
                return <UploadID handleUploadIDComplete={handleUploadIDComplete} />;
            case 2:
                return <PersonalInfo handlePersonalInfoFieldsComplete={handlePersonalInfoFieldsComplete}/>;
            case 3:
                return <IndigencyAddress handleIndigencyAddressFieldsComplete={handleIndigencyAddressFieldsComplete} />;
            case 4:
                return <Payment handlePaymentFieldsComplete={handlePaymentFieldsComplete}/>;
            case 5:
                return <Final />;
            default:
                return null;
        }
    }

    const handleClick = (direction) => {
        let newStep = currentStep;
        direction === "next" ? newStep++ : newStep--;
        // check if steps are within bounds
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    }

    const handleGoBack = () => {
        // Redirect to the DocumentTypeSection page
        // Replace '/document-types' with the actual path of DocumentTypeSection
        window.location.href = '/document-types';
    }

    return (
        <>
            {/* Go Back to Request Page button */}
            <div className="text-left mt-8 ml-4">
                <button onClick={handleGoBack} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.707 6.293a1 1 0 1 1 1.414-1.414L3.414 8l3.707 3.707a1 1 0 0 1-1.414 1.414L1.586 8.707A1 1 0 0 1 1.586 7.293l4-4z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M11 5a1 1 0 0 0-1 1v2.586l-5.707-5.707A1 1 0 1 0 3.707 4.707L10 11.414V14a1 1 0 1 0 2 0V5z" clipRule="evenodd" />
                    </svg>
                    Go Back to Request Page
                </button>
            </div>

            <div className="flex">
                <div className="w-full md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white mt-8 mb-10 px-4 md:px-0">
                    <h1 className="text-3xl font-bold text-center mb-4 mt-8">Indigency Form</h1>

                    {/*Stepper*/}
                    <div className="container horizontal mt-5">
                        <Stepper
                            steps={steps}
                            currentStep={currentStep}
                        />

                        {/* Display Components */}
                        <div className="my-10 p-10">
                            <StepperContext.Provider value={{
                                userData,
                                setUserData,
                                finalData,
                                setFinalData
                            }}>
                                {displayStep(currentStep)}
                            </StepperContext.Provider>
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    {currentStep !== steps.length &&
                        <StepperControlIndigency
                            handleClick={handleClick}
                            currentStep={currentStep}
                            steps={steps}
                            uploadIDFieldsComplete={uploadIDFieldsComplete}
                            personalInfoFieldsComplete={personalInfoFieldsComplete}
                            indigencyAddressFieldsComplete={indigencyAddressFieldsComplete}
                            paymentFieldsComplete = {paymentFieldsComplete}
                        />
                    }
                </div>
            </div>
        </>
    );
}

export default IndigencyPage;