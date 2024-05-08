import React, { useState } from 'react';
import Stepper from '../components/Stepper';
import Upload from '../components/steps_Business_Permit/Upload';
import BusinessInfo from '../components/steps_Business_Permit/BusinessInfo';
import Final from '../components/steps_Business_Permit/Final';
import { StepperContext } from '../context/StepperContext';
import Address from '../components/steps_Business_Permit/Address';
import PersonalDetails from '../components/steps_Business_Permit/PersonalDetails';
import Payment from '../components/steps_Business_Permit/Payment';
import StepperControlBusinessPermit from '../components/StepperControlBusinessPermit';

function BusinessPermitPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [userData, setUserData] = useState({
        // Initialize userData with default values for all required fields
        "registration-type": "",
        "registration-number": "",
        "registration-date": "",
        "tin": "",
        "sss-number": "",
        "business-name": "",
        "trade-name": "",
        "house-bldg-number": "", // New fields for Address step
        "building-name": "",
        "lot-number": "",
        "subdivision": "",
        "street": "",
        "region": "",
        "province": "",
        "city": "",
        "barangay": "", // Add any additional fields here
        "zip-code": "",
        "district": "",
        "surname" : "", 
        "given-name" : "",
        "middle-name" : "",
        "suffix" : "",
        "sex" : "",
        "proof-of-payment" : "",
        "reference-number" : "",
        "date-of-payment" : ""
    });
    const [finalData, setFinalData] = useState([]);
    const [allFilesUploaded, setAllFilesUploaded] = useState(false);
    const [fieldsComplete, setFieldsComplete] = useState(false);
    
    const [businessFieldsComplete, setBusinessFieldsComplete] = useState(false);
    const [addressFieldsComplete, setAddressFieldsComplete] = useState(false);
    const [personalDetailsFieldsComplete, setPersonalDetailsFieldsComplete] = useState(false);
    const [paymentFieldsComplete, setPaymentFieldsComplete] = useState(false);


    const steps = [
        "Upload Required Documents",
        "Business Information and Registration",
        "Address",
        "Personal Details",
        "Payment",
        "Complete"
    ];

    const handleUploadComplete = (isComplete) => {
        setAllFilesUploaded(isComplete);
    };

    const handleBusinessFieldsComplete = (isComplete) => {
        setBusinessFieldsComplete(isComplete);
    };

    const handleAddressFieldsComplete = (isComplete) => {
        setAddressFieldsComplete(isComplete);
    };

    const handlePersonalDetailsFieldsComplete = (isComplete) => {
        setPersonalDetailsFieldsComplete(isComplete);
    };

    const handlePaymentFieldsComplete = (isComplete, uploadFieldComplete) => {
        setPaymentFieldsComplete(isComplete && uploadFieldComplete);
    };
    

    const displayStep = (step) => {
        switch (step) {
            case 1:
                return <Upload handleUploadComplete={handleUploadComplete} />;
            case 2:
                return <BusinessInfo handleBusinessFieldsComplete={handleBusinessFieldsComplete} />;
            case 3:
                return <Address handleAddressFieldsComplete={handleAddressFieldsComplete} />;
            case 4:
                return <PersonalDetails handlePersonalDetailsFieldsComplete={handlePersonalDetailsFieldsComplete} />;
            case 5:
                return <Payment handlePaymentFieldsComplete = {handlePaymentFieldsComplete}/>;
            case 6:
                return <Final />;
            default:
                return null;
        }
    }

    const handleClick = (direction) => {
        let newStep = currentStep;

        direction === "next" ? newStep++ : newStep--;
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    }

    const handleGoBack = () => {
        window.location.href = '/document-types';
        // Reset fieldsComplete state when navigating back to BusinessInfo step
        if (currentStep === 2) {
            setFieldsComplete(true);
        }
    }

    return (
        <>
            <div className="text-left mt-8 ml-4 ">
                <button onClick={handleGoBack} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.707 6.293a1 1 0 1 1 1.414-1.414L3.414 8l3.707 3.707a1 1 0 0 1-1.414 1.414L1.586 8.707A1 1 0 0 1 1.586 7.293l4-4z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M11 5a1 1 0 0 0-1 1v2.586l-5.707-5.707A1 1 0 1 0 3.707 4.707L10 11.414V14a1 1 0 1 0 2 0V5z" clipRule="evenodd" />
                    </svg>
                    Go Back to Request Page
                </button>
            </div>
            <div className="flex ">
                <div className="w-full md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white mt-8 mb-10 px-4 md:px-0">

                    <h1 className="text-3xl font-bold text-center mb-4 mt-8 ">Business Permit and Licensing Form</h1> 
                    <div className="container horizontal mt-5">
                        <Stepper
                            steps={steps}
                            currentStep={currentStep}
                        />
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
                    {currentStep !== steps.length &&
                                <StepperControlBusinessPermit
                                handleClick={handleClick}
                                currentStep={currentStep}
                                steps={steps}
                                allFilesUploaded={allFilesUploaded}
                                fieldsComplete={fieldsComplete} // Pass fieldsComplete directly
                                businessFieldsComplete={businessFieldsComplete}
                                addressFieldsComplete={addressFieldsComplete}
                                personalDetailsFieldsComplete={personalDetailsFieldsComplete}
                                paymentFieldsComplete={paymentFieldsComplete}
                            />
                    }
                </div>
            </div>
        </>
    );
}

export default BusinessPermitPage;
