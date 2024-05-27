import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, onSnapshot, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase'; // Adjust the import path based on your file structure
import { useNavigate } from 'react-router-dom';

const TrackDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDocId, setExpandedDocId] = useState(null);
  const [showClaimedPopup, setShowClaimedPopup] = useState(false); // State for managing popup visibility
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const documentsRef = collection(db, 'userData');
          const querySnapshot = await getDocs(documentsRef);
          const docs = [];

          querySnapshot.forEach(doc => {
            const userData = doc.data();
            Object.keys(userData).forEach(key => {
              const userDoc = userData[key];
              if (userDoc.userId === currentUser.uid) {
                docs.push({ mainDocId: doc.id, nestedDocId: key, ...userDoc });
              }
            });
          });

          setDocuments(docs);
          setLoading(false);
        } else {
          console.log("No current user.");
        }
      } catch (error) {
        console.error("Error fetching documents: ", error);
        setError(error.message);
      }
    };

    const unsubscribe = onSnapshot(collection(db, 'userData'), () => {
      fetchData();
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
          if (newStatus === 'Claimed') {
            updatedData[nestedDocId].claimedDateTime = new Date(); // Set claimedDateTime to current date and time
            setShowClaimedPopup(true); // Show the claimed popup
          }
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

  const handleHistoryClick = () => {
    navigate('/history-documents');
  };

  return (
    <div className="mt-12 px-4 mx-auto">
      <h1 className="text-center text-3xl font-bold mb-6">Admin Dashboard</h1>
      {isMobile ? (
        <div className="block md:hidden">
          {documents.map(doc => (
            doc.status !== 'Claimed' && (
              <div key={`${doc.mainDocId}-${doc.nestedDocId}`} className="bg-white shadow-lg rounded-lg mb-4 p-4">
                <p><strong>Document Type:</strong> {doc['document-type']}</p>
                <p><strong>Number of Copies:</strong> {doc['number-of-copies']}</p>
                <p><strong>Status:</strong> {doc.status}</p>
                <p><strong>Request Date:</strong> {new Date(doc['requestDateTime']).toLocaleDateString()}</p>
                <p><strong>Request Time:</strong> {new Date(doc['requestDateTime']).toLocaleTimeString()}</p>
                {doc.status === 'Ready for Pick-up' && (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={() => handleStatusChange(doc.mainDocId, doc.nestedDocId, 'Claimed')}
                  >
                    Claimed
                  </button>
                )}
              </div>
            )
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto overflow-auto rounded-lg shadow-lg hidden md:block">
          <table className="min-w-full">
            <thead className="bg-blue-300 border-b">
              <tr>
                <th className="w-[200px] px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Document Type</th>
                <th className="w-[300px] text-sm font-semibold uppercase tracking-wider text-center">Number of Copies</th>
                <th className="w-[200px] px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Request Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Request Time</th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map(doc => (
                doc.status !== 'Claimed' && (
                  <tr key={`${doc.mainDocId}-${doc.nestedDocId}`} className="hover:bg-gray-100">
                    <td className="px-4 py-3">{doc['document-type']}</td>
                    <td className="px-4 py-3 text-center">{doc['number-of-copies']}</td>
                    <td className="px-4 py-3">{doc.status}</td>
                    <td className="px-4 py-3">{new Date(doc['requestDateTime']).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{new Date(doc['requestDateTime']).toLocaleTimeString()}</td>
                    <td className="px-4 py-3">
                      <div>
                        {doc.status === 'Ready for Pick-up' && (
                          <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleStatusChange(doc.mainDocId, doc.nestedDocId, 'Claimed')}
                          >
                            Claimed
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        className='fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 hover:bg-green-700 py-2 px-4 rounded-md text-white'
        onClick={handleHistoryClick}
      >
        History
      </button>
      {/* Conditional rendering for the overlay or popup */}
      {showClaimedPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-center text-xl font-semibold mb-4">Document Claimed!</p>
            <p className="text-center text-gray-700">Document has been recorded in history.</p>
            <button
              className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => setShowClaimedPopup(false)} // Close the popup when button is clicked
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackDocuments;
