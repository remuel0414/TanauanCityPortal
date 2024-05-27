import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, onSnapshot, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the import path based on your file structure

const AdminRequest = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDocId, setExpandedDocId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documentsRef = collection(db, 'userData');
        const querySnapshot = await getDocs(documentsRef);
        const docs = [];

        querySnapshot.forEach(doc => {
          const userData = doc.data();
          Object.keys(userData).forEach(key => {
            const userDoc = userData[key];
            docs.push({ mainDocId: doc.id, nestedDocId: key, ...userDoc });
          });
        });

        setDocuments(docs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching documents: ", error);
        setError(error.message);
      }
    };

    fetchData();

    const unsubscribe = onSnapshot(collection(db, 'userData'), () => {
      fetchData();
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (mainDocId, nestedDocId, newStatus) => {
    try {
      const mainDocRef = doc(db, 'userData', mainDocId);
      const mainDocSnapshot = await getDoc(mainDocRef);
      
      if (mainDocSnapshot.exists()) {
        const mainDocData = mainDocSnapshot.data();
        // Ensure the document has the specified nested document as the mainDocId
        if (mainDocData && mainDocData[nestedDocId]) {
          const updatedData = { ...mainDocData };
          updatedData[nestedDocId].status = newStatus;
          await updateDoc(mainDocRef, updatedData);
        } else {
          console.error("Nested document not found:", nestedDocId);
        }
      } else {
        console.error("Main document not found:", mainDocId);
      }
    } catch (error) {
      console.error("Error updating document status: ", error);
    }
  };
  
  const handleToggleDetails = (docId) => {
    setExpandedDocId(expandedDocId === docId ? null : docId);
  };

  const handleOpenLink = (url) => {
    window.open(url, '_blank');
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="text-xl">Loading...</div></div>;
  }

  if (error) {
    return <div className="text-center text-red-600 mt-12">Error: {error}</div>;
  }

  return (
    <div className="mt-12 px-4 max-w-6xl mx-auto">
      <h1 className="text-center text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-indigo-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Document Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Number of Copies</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Change Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Details</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents
              .filter(doc => doc.status !== 'Claimed') // Filter out documents with status "Claimed"
              .map(doc => (
              <React.Fragment key={`${doc.mainDocId}-${doc.nestedDocId}`}>
                <tr className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">{doc['document-type']}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{doc['number-of-copies']}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{doc.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={doc.status}
                      onChange={(e) => handleStatusChange(doc.mainDocId, doc.nestedDocId, e.target.value)}
                      className="block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value='Pending'>Pending</option>
                      <option value='Processing'>Processing</option>
                      <option value='Ready for Pick-up'>Ready for Pick-up</option>
                      <option value='Claimed'>Claimed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => handleToggleDetails(`${doc.mainDocId}-${doc.nestedDocId}`)}
                    >
                      {expandedDocId === `${doc.mainDocId}-${doc.nestedDocId}` ? 'Hide Details' : 'Show Details'}
                    </button>
                  </td>
                </tr>
                {expandedDocId === `${doc.mainDocId}-${doc.nestedDocId}` && (
                  <tr className="bg-gray-100">
                    <td colSpan="5" className="px-3 py-2">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {Object.entries(doc)
                          .filter(([key]) => !['mainDocId', 'nestedDocId', 'proof-of-payment-input', 'userInfo', 'userId'].includes(key))
                          .map(([key, value]) => (
                            <div key={key} className="mb-2">
                              <strong className="text-indigo-600">{key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, ' ')}:</strong>{' '}
                              {typeof value === 'string' && value.startsWith('http') ? (
                                <button
                                  onClick={() => handleOpenLink(value)}
                                  className="text-blue-600 hover:underline"
                                >
                                  Open Link
                                </button>
                              ) : (
                                <span>{value}</span>
                              )}
                            </div>
                          ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRequest;

