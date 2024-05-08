import React, { useEffect, useContext, useState } from 'react';
import { StepperContext } from '../../context/StepperContext';

export default function UploadID({ handleUploadIDComplete }) {
    const { userData, setUserData } = useContext(StepperContext);
    const [uploadedFiles, setUploadedFiles] = useState({});
    const [allFilesUploaded, setAllFilesUploaded] = useState(false); // Define allFilesUploaded state

    useEffect(() => {
        // Check if all required files are uploaded
        const requiredFiles = ['government-id'];
        const filesUploaded = requiredFiles.every(fieldName => uploadedFiles[fieldName]);
        setAllFilesUploaded(filesUploaded);
    }, [uploadedFiles]);

    const handleChange = (e, fieldName) => {
        const file = e.target.files[0];
        setUploadedFiles({
            ...uploadedFiles,
            [fieldName]: file ? file.name : null
        });
        setUserData({
            ...userData,
            uploadedFiles: {
                ...userData.uploadedFiles,
                [fieldName]: file
            }
        })
    };

    useEffect(() => {
        if (allFilesUploaded) {
            handleUploadIDComplete(true);
        } else {
            handleUploadIDComplete(false);
        }
    }, [allFilesUploaded, handleUploadIDComplete]);

    return (
        <div className='flex flex-col'>
            <div className='w-full mx-2 flex-1'>
                <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
                    Upload the Following:
                </div>
                <ul className='uploadList'>
                    <li className='flex justify-between items-center'>
                        <span className='text-sm'>Government Issued ID</span>
                        <div className='flex items-center'>
                            <input
                                type='file'
                                id='government-id'
                                name='government-id'
                                className='hidden'
                                onChange={(e) => handleChange(e, 'government-id')}
                            />
                            <label
                                htmlFor='government-id'
                                className='bg-white py-1 px-2 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer mr-2'
                            >
                                Choose File
                            </label>
                            <span className='text-sm'>{uploadedFiles['government-id'] ? uploadedFiles['government-id'] : "No File Uploaded"}</span>
                        </div>
                    </li>

                    
                </ul>
            </div>

        </div>
    )
}
