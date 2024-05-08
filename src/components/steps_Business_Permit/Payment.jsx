import { useContext, useState, useEffect } from 'react';
import { StepperContext } from '../../context/StepperContext';
import QRCode from '../../img/GCASHNUMBER.jpg';

export default function Payment({ handlePaymentFieldsComplete }) {
    const { userData, setUserData } = useContext(StepperContext);
    const [uploadedFiles, setUploadedFiles] = useState({});


    useEffect(() => {
        // Check if all required files are uploaded
        const requiredFiles = ['proof-of-payment'];
        const requiredFields = ["date-of-payment", "reference-number"];
        const isComplete = requiredFields.every(fieldName => userData[fieldName] !== '');
        const filesUploaded = requiredFiles.every(fieldName => uploadedFiles[fieldName]);
        handlePaymentFieldsComplete(isComplete, filesUploaded); // Update handlePaymentFieldsComplete with upload field status
    }, [uploadedFiles, userData, handlePaymentFieldsComplete]);
    

    const handleChange = (e, fieldName) => {
        const file = e.target.files[0];
        setUploadedFiles({
            ...uploadedFiles,
            [fieldName]: file ? file.name : null
        });
        setUserData({
            ...userData,
            [fieldName]: file
        });
    };

    return (
        <div className='flex flex-col'>
            <div className='w-full mx-2 flex-1'>
                <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
                    PAY VIA QR:
                </div>
                <div className='flex justify-center bg-gray-200 p-4 mb-4'>
                    <img src={QRCode} alt='Proof of Payment' />
                </div>
                <ul className='uploadList'>
                    <li className='flex justify-between items-center'>
                        <span className='text-sm'>Proof of Payment: </span>
                        <div className='flex items-center'>
                            <input
                                type='file'
                                id='proof-of-payment'
                                name='proof-of-payment'
                                className='hidden'
                                onChange={(e) => handleChange(e, 'proof-of-payment')}
                                required  // Marking the upload field as required
                            />
                            <label
                                htmlFor='proof-of-payment'
                                className='bg-white py-1 px-2 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer mr-2'
                            >
                                Choose File
                            </label>
                            <span className='text-sm'>{uploadedFiles['proof-of-payment'] || "No File Uploaded"}</span>
                        </div>
                    </li>
                </ul>
                <div className="w-full mx-2 flex-1">
                    <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                        Reference Number:
                    </div>
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                        <input
                            onChange={(e) => setUserData({...userData, "reference-number": e.target.value})}
                            value={userData["reference-number"] || ""}
                            name="reference-number"   
                            placeholder="XXXXXXXXXXXXXXX"
                            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                            required
                        />
                    </div>
                </div>
                <div className="w-full mx-2 flex-1">
                    <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                        Date of Payment:
                    </div>
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                        <input
                            onChange={(e) => setUserData({...userData, "date-of-payment": e.target.value})}
                            value={userData["date-of-payment"] || ""}   
                            type='date'
                            name="date-of-payment"   
                            placeholder="MM/DD/YY"
                            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
