import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TrackDocuments = ({ handleDocumentTypeChange, handleCheckButton }) => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (documentType) => {
    setActiveButton(documentType);
    handleDocumentTypeChange(documentType);
  };

  const tableData = [
    { id: 1, referenceNumber: 'Row 1, Column 1', dateRequested: 'Row 1, Column 2', status: 'Row 1, Column 3' },
    { id: 2, referenceNumber: 'Row 2, Column 1', dateRequested: 'Row 2, Column 2', status: 'Row 2, Column 3' },
    // Add more table data as needed
  ];

  

  return (
    <div>
      <div className='mb-5'>
      <ul className='flex justify-center mt-[150px] '>
          <button
            className={`h-12 place-content-center flex items-center justify-center border w-[300px] rounded-tl-lg rounded-tr-lg cursor-pointer hover:bg-[#abaaaa] ${
              activeButton === 'All' ? 'bg-[#888]' : 'bg-white'
            }`}
            onClick={() => handleButtonClick('All')}
          >
            All
          </button>
          <button
            className={`h-12 place-content-center flex items-center justify-center border w-[300px] rounded-tl-lg rounded-tr-lg cursor-pointer hover:bg-[#abaaaa] ${
              activeButton === 'Pending' ? 'bg-[#888]' : 'bg-white'
            }`}
            onClick={() => handleButtonClick('Pending')}
          >
            Pending
          </button>
          {/* Add other buttons similarly */}
        

            <button
              className={`h-12 place-content-center flex items-center justify-center border w-[300px] rounded-tl-lg rounded-tr-lg cursor-pointer hover:bg-[#abaaaa] ${
                activeButton === 'Processing' ? 'bg-[#888]' : 'bg-white'
              }`}
              onClick={() => handleButtonClick('Processing')}
            >
              Processing
            </button>

            <button
              className={`h-12 place-content-center flex items-center justify-center border w-[300px] rounded-tl-lg rounded-tr-lg cursor-pointer hover:bg-[#abaaaa] ${
                activeButton === 'Completed' ? 'bg-[#888]' : 'bg-white'
              }`}
              onClick={() => handleButtonClick('Completed')}
            >
              Completed
            </button>
      </ul>

      </div>

      <div className='place-content-center flex items-center mb-[100px] mt-[100px]'>
        <div className="p-2 bg-gray-300 w-[500px] flex items-center rounded-md ">
          <input
            id="search"
            type="text"
            className="w-[100%] h-[100%] p-2 bg-white rounded-[0.27px 0.29px 0.29px 0.27px] outline-none text-center"
            placeholder="Search"
          />  
          <div className="absolute left-0 top-0 ml-2">
            {/* Your icon or additional content here */}
          </div>
        </div>
        <div className="documentTypeSection mx-auto p-8 text-center md:flex md:flex-col absolute right-0">
          <div className="md:flex md:items-center mb-4"> 
            <label htmlFor="documentType" className="documentTypeLabel text-lg md:mr-4"> 
              Document type:
            </label>
            <select
              id="documentType"
              onChange={handleDocumentTypeChange}
              className="documentTypeSelect text-lg px-4 py-2 border rounded-md" >
              <option value="">Select</option>
              <option value="Type 1" className="business-permit-1">Business Permit</option>
              <option value="Type 2" className="residency">Residency</option>
              <option value="Type 3" className="label-5">Indigency</option>
              <option value="Type 4" className="business-clearance-1">Business Clearance</option>
              <option value="Type 5" className="community-events-and-activities-1">Community events and activities</option>
              <option value="Type 6" className="good-moral-1">Good Moral</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table with 4 rows and addable columns */}
      <div className='mt-4 place-content-center flex items-center'>
      <table className='bg-white w-[1000px] '>
        <thead className='h-[100px]'>
          <tr className='bg-gray-200'>
            <th>Reference Number</th>
            <th>Date Requested</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody className=''>
          <tr className='h-[100px]'>
            <td className='text-center'>Row 1, Column 1</td>
            <td className='text-center'>Row 1, Column 2</td>
            <td className='text-center'>Row 1, Column 3</td>
            <td className='text-center'>
              {/* Use Link component to navigate to CheckDocuments */}
              <button onClick={() => handleCheckButton('Check')} className="bg-green-500 text-white px-4 py-2 rounded-lg">Check</button>
            </td>
          </tr>
          <tr className='h-[100px]'>
            <td className='text-center'>Row 2, Column 1</td>
            <td className='text-center'>Row 2, Column 2</td>
            <td className='text-center'>Row 2, Column 3</td>
            <td className='text-center'>
              {/* Use Link component to navigate to CheckDocuments */}
              <button  onClick={() => handleCheckButton('Check')} className="bg-green-500 text-white px-4 py-2 rounded-lg">Check</button>
            </td>
          </tr>
          <tr className='h-[100px]'>
            <td className='text-center'>Row 3, Column 1</td>
            <td className='text-center'>Row 3, Column 2</td>
            <td className='text-center'>Row 3, Column 3</td>
            <td className='text-center'>
              {/* Use Link component to navigate to CheckDocuments */}
              <button onClick={() => handleCheckButton('Check')} className="bg-green-500 text-white px-4 py-2 rounded-lg">Check</button>
            </td>
          </tr>
          <tr className='h-[100px]'>
            <td className='text-center'>Row 4, Column 1</td>
            <td className='text-center'>Row 4, Column 2</td>
            <td className='text-center'>Row 4, Column 3</td>
            <td className='text-center'>
              {/* Use Link component to navigate to CheckDocuments */}
              <button onClick={() => handleCheckButton('Check')} className="bg-green-500 text-white px-4 py-2 rounded-lg">Check</button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default TrackDocuments;
