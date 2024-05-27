import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase'; // Adjust the import path based on your file structure
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const HistoryDocuments = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDocId, setSelectedDocId] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const navigate = useNavigate();

    // Function to fetch user documents
    const fetchUserDocuments = async () => {
        try {
            console.log("Fetching user documents...");
            const currentUser = auth.currentUser;
            if (currentUser) {
                console.log("Current user ID:", currentUser.uid);

                const documentsRef = collection(db, 'userData');
                const querySnapshot = await getDocs(documentsRef);

                console.log("Query snapshot size:", querySnapshot.size);

                if (!querySnapshot.empty) {
                    const docs = [];
                    querySnapshot.forEach(doc => {
                        console.log("Document data:", doc.data());
                        const userData = doc.data();
                        Object.keys(userData).forEach(key => {
                            const userDoc = userData[key];
                            if (userDoc.userId === currentUser.uid && userDoc.status === "Claimed") {
                                // Include only the document ID in the object
                                docs.push({ id: doc.id, ...userDoc });
                            }
                        });
                    });
                    console.log("Fetched documents:", docs);
                    setDocuments(docs);
                } else {
                    console.log("No documents found for this user.");
                }
            } else {
                console.log("No current user.");
            }
        } catch (err) {
            console.error("Error fetching documents: ", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                fetchUserDocuments();
            } else {
                setLoading(false); // Set loading to false if no user is logged in
            }
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

    const handleDeleteDocument = async (docId) => {
        try {
            const documentPath = `userData/${docId}`;
            console.log("Attempting to delete document at path:", documentPath);

            const docRef = doc(db, documentPath);

            // Delete the document
            await deleteDoc(docRef);
            console.log("Document deleted successfully:", documentPath);

            // Update local state after successful deletion
            setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== docId));
            setShowDeleteSuccess(true);
            setSelectedDocId(null);

            // Hide success message after 2 seconds
            setTimeout(() => setShowDeleteSuccess(false), 2000);

            // Hide confirmation prompt
            setShowDeleteConfirmation(false);
        } catch (error) {
            console.error("Error deleting document: ", error);
            console.error("Error details: ", error.message);
            setError(error.message);
        }
    };

    const cancelDelete = () => {
        setSelectedDocId(null);
        setShowDeleteConfirmation(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleHistoryClick = () => {
        navigate('/track'); // Navigate to TrackDocuments.jsx
    };

    return (
        <div className='mt-24 px-4'>
            {showDeleteConfirmation && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6">
                        <p className="mb-4">Are you sure you want to delete this document from your history? The data will not be recovered.</p>
                        <div className="flex justify-center">
                            <button className="mr-2 bg-red-500 text-white py-2 px-4 rounded-md" onClick={() => handleDeleteDocument(selectedDocId)}>
                                Yes
                            </button>
                            <button className="bg-blue-500 text-white py-2 px-4 rounded-md" onClick={cancelDelete}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showDeleteSuccess && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-green-400 rounded-lg shadow-md p-6">
                        <p className="text-lg text-white font-bold">Document Deleted Successfully</p>
                    </div>
                </div>
            )}
            <button
                className='ml-2 mb-10 bg-green-500 hover:bg-green-700 py-2 px-4 rounded-md text-white'
                onClick={handleHistoryClick}
            >
                Go Back
            </button>
            {isMobile ? (
                <div className="block md:hidden lg:hidden">
                    {documents.map(doc => (
                        <div key={doc.id} className="bg-white shadow-lg rounded-lg mb-4 p-4">
                            <p><strong>Document Type:</strong> {doc['document-type']}</p>
                            <p><strong>Request Date:</strong> {new Date(doc['requestDateTime']).toLocaleDateString()}</p>
                            <p><strong>Request Time:</strong> {new Date(doc['requestDateTime']).toLocaleTimeString()}</p>
                            <p><strong>Number of Copies:</strong> {doc['number-of-copies']}</p>
                            <p><strong>Claimed on:</strong> {doc['status'] === 'Claimed' && doc['claimedDateTime'] ?
                                `${new Date(doc['claimedDateTime'].toDate()).toLocaleDateString()} at ${new Date(doc['claimedDateTime'].toDate()).toLocaleTimeString()}` : '-'}</p>
                            <button
                                className="text-red-600 hover:text-red-900"
                                onClick={() => {
                                    setSelectedDocId(doc.id);
                                    setShowDeleteConfirmation(true);
                                }}
                            >
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='flex justify-center'>
                    <div className='rounded-lg shadow-lg w-full overflow-auto'>
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead className='bg-blue-300 border-b'>
                                <tr>
                                    <th className='py-3 px-4 sm:px-6 text-left text-xs sm:text-sm'>Document Type</th>
                                    <th className='py-3 px-4 sm:px-6 text-left text-xs sm:text-sm'>Request Date</th>
                                    <th className='py-3 px-4 sm:px-6 text-left text-xs sm:text-sm'>Request Time</th>
                                    <th className='py-3 px-4 sm:px-6 text-left text-xs sm:text-sm'>Number of Copies</th>
                                    <th className='py-3 px-4 sm:px-6 text-left text-xs sm:text-sm'>Claimed on</th>
                                    <th className='py-3 px-4 sm:px-6 text-left text-xs sm:text-sm'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-200'>
                                {documents.map(doc => (
                                    <tr key={doc.id} className='hover:bg-gray-200'>
                                        <td className='py-4 px-4 sm:px-6 text-xs sm:text-sm'>{doc['document-type']}</td>
                                        <td className='py-4 px-4 sm:px-6 text-xs sm:text-sm'>{new Date(doc['requestDateTime']).toLocaleDateString()}</td>
                                        <td className='py-4 px-4 sm:px-6 text-xs sm:text-sm'>{new Date(doc['requestDateTime']).toLocaleTimeString()}</td>
                                        <td className='py-4 px-4 sm:px-6 text-xs sm:text-sm'>{doc['number-of-copies']}</td>
                                        <td className='py-4 px-4 sm:px-6 text-xs sm:text-sm'>
                                            {doc['status'] === 'Claimed' && doc['claimedDateTime'] ?
                                                `${new Date(doc['claimedDateTime'].toDate()).toLocaleDateString()} at ${new Date(doc['claimedDateTime'].toDate()).toLocaleTimeString()}`
                                                : '-'
                                            }
                                        </td>
                                        <td className='py-4 px-4 sm:px-6 text-xs sm:text-sm'>
                                            <button
                                                className='text-red-600 hover:text-red-900'
                                                onClick={() => {
                                                    setSelectedDocId(doc.id);
                                                    setShowDeleteConfirmation(true);
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistoryDocuments;
