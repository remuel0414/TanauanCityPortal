import { useContext, useState, useEffect } from 'react';
import { StepperContext } from '../../context/StepperContext';

export default function Upload({handleUploadFieldsComplete}) {
    const { userData, setUserData } = useContext(StepperContext);
    const [uploadedFiles, setUploadedFiles] = useState({});
    const [allFilesUploaded, setAllFilesUploaded] = useState(false);

    useEffect(() => {
        // Check if all required files are uploaded
        const requiredFiles = ['fsi-certificate', 'health-permit', 'zoning-clearance', 'business-permit-or-license', 'income-statements', 'balance-sheets', 'afp'];
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
        });
    };

    useEffect(() => {
        if (allFilesUploaded) {
            handleUploadFieldsComplete(true);
        } else {
            handleUploadFieldsComplete(false);
        }
    }, [allFilesUploaded, handleUploadFieldsComplete]);

    return (
        <div className='flex flex-col'>
            <div className='w-full mx-2 flex-1'>
                <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
                    Upload the Following:
                </div>
                <ul className='uploadList'>
                    <li className='flex justify-between items-center mb-8'>
                        <span className='text-sm'>Fire Safety Inspection Certificate:</span>
                        <div className='flex items-center'>
                            <input
                                type='file'
                                id='fsi-certificate'
                                name='fsi-certificate'
                                className='hidden'
                                onChange={(e) => handleChange(e, 'fsi-certificate')}
                            />
                            <label
                                htmlFor='fsi-certificate'
                                className='bg-white py-1 px-2 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer mr-2'
                            >
                                Choose File
                            </label>
                            <span className='text-sm'>{uploadedFiles['fsi-certificate'] ? uploadedFiles['fsi-certificate'] : "No File Uploaded"}</span>
                        </div>
                    </li>

                    <li className='flex justify-between items-center mb-8'>
                        <span className='text-sm'>Health Permit:</span>
                        <div className='flex items-center'>
                            <input
                                type='file'
                                id='health-permit'
                                name='health-permit'
                                className='hidden'
                                onChange={(e) => handleChange(e, 'health-permit')}
                            />
                            <label
                                htmlFor='health-permit'
                                className='bg-white py-1 px-2 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer mr-2'
                            >
                                Choose File
                            </label>
                            <span className='text-sm'>{uploadedFiles['health-permit'] ? uploadedFiles['health-permit'] : "No File Uploaded"}</span>
                        </div>
                    </li>
                    
                    <li className='flex justify-between items-center mb-8'>
                        <span className='text-sm'>Zoning Clearance:</span>
                        <div className='flex items-center'>
                            <input
                                type='file'
                                id='zoning-clearance'
                                name='zoning-clearance'
                                className='hidden'
                                onChange={(e) => handleChange(e, 'zoning-clearance')}
                            />
                            <label
                                htmlFor='zoning-clearance'
                                className='bg-white py-1 px-2 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer mr-2'
                            >
                                Choose File
                            </label>
                            <span className='text-sm'>{uploadedFiles['zoning-clearance'] ? uploadedFiles['zoning-clearance'] : "No File Uploaded"}</span>
                        </div>
                    </li>

                    <li className='flex justify-between items-center mb-8'>
                        <span className='text-sm'>Business Permit/License</span>
                        <div className='flex items-center'>
                            <input
                                type='file'
                                id='business-permit-or-license'
                                name='business-permit-or-license'
                                className='hidden'
                                onChange={(e) => handleChange(e, 'business-permit-or-license')}
                            />
                            <label
                                htmlFor='business-permit-or-license'
                                className='bg-white py-1 px-2 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer mr-2'
                            >
                                Choose File
                            </label>
                            <span className='text-sm'>{uploadedFiles['business-permit-or-license'] ? uploadedFiles['business-permit-or-license'] : "No File Uploaded"}</span>
                        </div>
                    </li>

                    <li className='flex justify-between items-center mb-8'>
                        <span className='text-sm'> Income Statements (also known as Profit and Loss Statements)</span>
                        <div className='flex items-center'>
                            <input
                                type='file'
                                id='income-statements'
                                name='income-statements'
                                className='hidden'
                                onChange={(e) => handleChange(e, 'income-statements')}
                            />
                            <label
                                htmlFor='income-statements'
                                className='bg-white py-1 px-2 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer mr-2'
                            >
                                Choose File
                            </label>
                            <span className='text-sm'>{uploadedFiles['income-statements'] ? uploadedFiles['income-statements'] : "No File Uploaded"}</span>
                        </div>
                    </li>

                    <li className='flex justify-between items-center mb-8'>
                        <span className='text-sm'> Balance Sheets </span>
                        <div className='flex items-center'>
                            <input
                                type='file'
                                id='balance-sheets'
                                name='balance-sheets'
                                className='hidden'
                                onChange={(e) => handleChange(e, 'balance-sheets')}
                            />
                            <label
                                htmlFor='balance-sheets'
                                className='bg-white py-1 px-2 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer mr-2'
                            >
                                Choose File
                            </label>
                            <span className='text-sm'>{uploadedFiles['balance-sheets'] ? uploadedFiles['balance-sheets'] : "No File Uploaded"}</span>
                        </div>
                    </li>
                    
                    <li className='flex justify-between items-center mb-8'>
                        <span className='text-sm'> Audited Financial Reports (if applicable). </span>
                        <div className='flex items-center'>
                            <input
                                type='file'
                                id='afp'
                                name='afp'
                                className='hidden'
                                onChange={(e) => handleChange(e, 'afp')}
                            />
                            <label
                                htmlFor='afp'
                                className='bg-white py-1 px-2 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer mr-2'
                            >
                                Choose File
                            </label>
                            <span className='text-sm'>{uploadedFiles['afp'] ? uploadedFiles['afp'] : "No File Uploaded"}</span>
                        </div>
                    </li>

                    
                    {/* Add more list items for other uploads */}
                </ul>
            </div>


        </div>
    )
}
