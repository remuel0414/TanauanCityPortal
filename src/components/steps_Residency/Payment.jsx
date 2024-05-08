import { useContext, useState, useEffect } from 'react';
import { StepperContext } from '../../context/StepperContext';
import QRCode from '../../img/GCASHNUMBER.jpg';

export default function Upload({ handlePaymentFieldsComplete }) {
    const { userData, setUserData } = useContext(StepperContext);
    const [uploadedFiles, setUploadedFiles] = useState({});

    const [uploadCompleted, setUploadCompleted] = useState(false); // New state variable

    useEffect(() => {
        const requiredFiles = ['proof-of-payment'];
        const requiredFields = ['reference-number', 'date-of-payment'];
        const isComplete = requiredFields.every(fieldName => userData[fieldName] !== '');
        const filesUploaded = requiredFiles.every(fieldName => uploadedFiles[fieldName]);
        handlePaymentFieldsComplete(isComplete, filesUploaded && uploadCompleted); // Check if upload completed
    }, [uploadedFiles, userData, handlePaymentFieldsComplete, uploadCompleted]);

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFiles({
                ...uploadedFiles,
                [fieldName]: file.name
            });
            setUserData({
                ...userData,
                uploadedFiles: {
                    ...userData.uploadedFiles,
                    [fieldName]: file
                }
            });
            setUploadCompleted(true); // Set upload completed to true
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    return (
        <div className='flex flex-col'>
            <div className='w-full mx-2 flex-1'>
                <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
                    PAY VIA QR:
                </div>
                <div className='flex justify-center bg-gray-200 p-4 mb-4'>
                    <img src={QRCode} alt='Proof of Payment' className='' />
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
                                onChange={(e) => handleFileChange(e, 'proof-of-payment')}
                            />
                            <label
                                htmlFor='proof-of-payment'
                                className='bg-white py-1 px-2 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer mr-2'
                            >
                                Choose File
                            </label>
                            <span className='text-sm'>{uploadedFiles['proof-of-payment'] ? uploadedFiles['proof-of-payment'] : "No File Uploaded"}</span>
                        </div>
                    </li>
                </ul>
                <div className="w-full mx-2 flex-1">
                    <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                        Reference Number:
                    </div>
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                        <input
                            onChange={handleInputChange}
                            value={userData["reference-number"] || ""}
                            name="reference-number"
                            placeholder="XXXXXXXXXXXXXXX"
                            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                        />
                    </div>
                </div>
                <div className="w-full mx-2 flex-1">
                    <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                        Date of Payment:
                    </div>
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                        <input
                            onChange={handleInputChange}
                            value={userData["date-of-payment"] || ""}
                            type='date'
                            name="date-of-payment"
                            placeholder="MM/DD/YY"
                            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
