import React, { useState } from 'react';
import Stepper from '../components/Stepper';

import Upload from '../components/steps_Business_Clearance/Upload';
import BusinessInfo from '../components/steps_Business_Clearance/BusinessInfo';
import Final from '../components/steps_Business_Clearance/Final';
import { StepperContext } from '../context/StepperContext';
import Address from '../components/steps_Business_Clearance/Address';
import PersonalDetails from '../components/steps_Business_Clearance/PersonalDetails';
import OwnerAddress from '../components/steps_Business_Clearance/OwnerAddress';
import Payment from '../components/steps_Business_Clearance/Payment';
import StepperControlBusinessClearance from '../components/StepperControlBusinessClearance';

function BusinessClearancePage() {

    const [currentStep, setCurrentStep] = useState(1);
    const [userData, setUserData] = useState({
        // Initialize userData with default values for all required fields
        "fsi-certificate": "",
        "health-permit": "",
        "zoning-clearance": "",
        "business-permit-or-license": "",
        "income-statements": "",
        "balance-sheets": "",
        "afp": "",
        "registration-type": "",
        "registration-number": "",
        "registration-date": "",
        "tin": "",
        "business-name": "",
        "trade-name": "",
        "house-bldg-number": "", 
        "building-name": "",
        "lot-number": "",
        "subdivision": "",
        "street": "",
        "region": "",
        "province": "",
        "city": "",
        "barangay": "",
        "government-id": "",
        "surname": "",
        "given-name": "",
        "middle-name": "",
        "suffix": "",
        "sex": "",
        "owner-house-bldg-number": "",
        "owner-building-name": "",
        "owner-lot-number": "",
        "owner-subdivision": "",
        "owner-street": "",
        "owner-region": "",
        "owner-province": "",
        "owner-city": "",
        "owner-barangay": ""
    });

    const [finalData, setFinalData] = useState([]);

    const [uploadFieldsComplete, setUploadFieldsComplete] = useState(false);
    const [businessInfoFieldsComplete, setBusinessInfoFieldsComplete] = useState(false);
    const [addressInfoFieldsComplete, setAddressInfoFieldsComplete] = useState(false);
    const [personalDetailsFieldsComplete, setPersonalDetailsFieldsComplete] = useState(false);
    const [ownerAddressFieldsComplete, setownerAddressFieldsComplete] = useState(false);
    const [paymentFieldsComplete, setpaymentFieldsComplete] = useState(false);
    
    const steps = [
        "Upload Required Documents",
        "Business Information and Registration",
        "Business Location / Address",
        "Personal Details",
        "Owner Address",
        "Payment",
        "Complete"
    ];

    const handleUploadFieldsComplete = (isComplete) => {
        setUploadFieldsComplete(isComplete);
    };

    const handleBusinessInfoFieldsComplete = (isComplete) => {
        setBusinessInfoFieldsComplete(isComplete);
    };

    const handleAddressInfoFieldsComplete = (isComplete) => {
        setAddressInfoFieldsComplete(isComplete);
    };

    const handlePersonalDetailsFieldsComplete = (isComplete, isFileUploaded) => {
        setPersonalDetailsFieldsComplete(isComplete && isFileUploaded);
    };

    const handleOwnerAddressFieldsComplete = (isComplete) => {
        setownerAddressFieldsComplete(isComplete);
    };

    const handlePaymentFieldsComplete = (isComplete, isFileUploaded) => {
        setpaymentFieldsComplete(isComplete && isFileUploaded);
    };
    
    

    const displayStep = (step)=>{
        switch (step){
            case 1: 
                return <Upload handleUploadFieldsComplete={handleUploadFieldsComplete}/>
            case 2: 
                return <BusinessInfo handleBusinessInfoFieldsComplete={handleBusinessInfoFieldsComplete}/>
            case 3: 
                return <Address handleAddressInfoFieldsComplete={handleAddressInfoFieldsComplete} />
            case 4: 
                return <PersonalDetails handlePersonalDetailsFieldsComplete={handlePersonalDetailsFieldsComplete}/>
            case 5: 
                return <OwnerAddress handleOwnerAddressFieldsComplete={handleOwnerAddressFieldsComplete}/>
            case 6: 
                return <Payment handlePaymentFieldsComplete={handlePaymentFieldsComplete}/>
            case 7: 
                return <Final />
            default:
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
                            <path fillRule="evenodd" d="M5.707 6.293a1 1 0 1 1 1.414-1.414L3.414 8l3.707 3.707a1 1 0 0 1-1.414 1.414L1.586 8.707A1 1 0 0 1 1.586 7.293l4-4z" clipRule="evenodd"/>
                            <path fillRule="evenodd" d="M11 5a1 1 0 0 0-1 1v2.586l-5.707-5.707A1 1 0 1 0 3.707 4.707L10 11.414V14a1 1 0 1 0 2 0V5z" clipRule="evenodd"/>
                        </svg>
                        Go Back to Request Page
                    </button>
            </div>


            <div className="flex">
                <div className="w-full md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white mt-8 mb-10 px-4 md:px-0">
                    <h1 className="text-3xl font-bold text-center mb-4 mt-8">Business Clearance Form</h1>

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
                        <StepperControlBusinessClearance
                            handleClick={handleClick}
                            currentStep={currentStep}
                            steps={steps}
                            uploadFieldsComplete={uploadFieldsComplete}
                            businessInfoFieldsComplete={businessInfoFieldsComplete}
                            addressInfoFieldsComplete={addressInfoFieldsComplete}
                            personalDetailsComplete={personalDetailsFieldsComplete}
                            ownerAddressFieldsComplete={ownerAddressFieldsComplete}
                            paymentFieldsComplete={paymentFieldsComplete}
                        />
                    }
                </div>

                
            </div>
        </>
    );
}

export default BusinessClearancePage;
