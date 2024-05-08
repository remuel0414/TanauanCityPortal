import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase.js';
import { getDocs, collection } from 'firebase/firestore';

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [showAllAnnouncements, setShowAllAnnouncements] = useState(false);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'announcements'));
                const announcementsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAnnouncements(announcementsData);
            } catch (error) {
                console.error('Error fetching announcements:', error);
            }
        };

        fetchAnnouncements();
    }, []);

    const handleShowAllAnnouncements = () => {
        setShowAllAnnouncements(true);
    };

    const handleCloseModal = () => {
        setShowAllAnnouncements(false);
    };

    return (
        <div className="container mx-auto py-10 px-4 lg:px-0">
            {announcements.slice(0, 6).map((announcement, index) => (
                <div key={announcement.id} className="mb-8">
                    <div className={index === 0 || index === 5 ? 'lg:flex lg:justify-between' : ''}>
                        <img
                            src={announcement.imageURL} 
                            alt={announcement.title}
                            className={index === 0 || index === 5 ? 'lg:w-1/2 h-auto lg:h-80 object-cover lg:mb-0 mb-6 shadow-lg transition duration-300 hover:scale-105' : 'w-full object-cover'}
                        />
                        <div className={index === 0 || index === 5 ? 'lg:w-1/2 p-6 bg-orange-300 text-white' : 'p-6 bg-orange-400 text-white'}>
                            <h3 className={index === 0 || index === 5 ? 'text-2xl font-bold mb-2' : 'text-xl font-bold mb-2'}>{announcement.title}</h3>
                            <p className="mb-4">{announcement.description}</p>
                            <a
                                href={announcement.readMoreLink}
                                className="inline-block px-2 py-1 border border-white text-white rounded hover:bg-white hover:text-orange-600 transition duration-300 text-sm"
                            >
                                Read More
                            </a>
                        </div>
                    </div>
                </div>
            ))}

            <div className="flex justify-center"> {/* Centering the button */}
                {announcements.length > 6 && (
                    <button onClick={handleShowAllAnnouncements} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        More Announcements
                    </button>
                )}
            </div>

            {showAllAnnouncements && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 overflow-y-auto bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg max-w-screen-lg w-full h-full overflow-y-auto">
                        <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none">
                            Close
                        </button>
                        <div className="flex flex-wrap justify-center">
                            <div className="mb-8 lg:w-1/2 lg:pr-4 lg:pl-4">
                                <img
                                    src={announcements[0].imageURL} 
                                    alt={announcements[0].title}
                                    className="w-full h-auto object-cover mb-4"
                                />
                                <div className="p-6 bg-orange-300 text-white">
                                    <h3 className="text-xl font-bold mb-2">{announcements[0].title}</h3>
                                    <p className="mb-4">{announcements[0].description}</p>
                                    <a
                                        href={announcements[0].readMoreLink}
                                        className="inline-block px-2 py-1 border border-white text-white rounded hover:bg-white hover:text-orange-600 transition duration-300 text-sm"
                                    >
                                        Read More
                                    </a>
                                </div>
                            </div>
                            {announcements.slice(1).map((announcement, index) => (
                                <div key={announcement.id} className="mb-8 lg:w-1/2 lg:pr-4 lg:pl-4">
                                    <img
                                        src={announcement.imageURL} 
                                        alt={announcement.title}
                                        className="w-full h-auto object-cover mb-4"
                                    />
                                    <div className="p-6 bg-orange-300 text-white">
                                        <h3 className="text-xl font-bold mb-2">{announcement.title}</h3>
                                        <p className="mb-4">{announcement.description}</p>
                                        <a
                                            href={announcement.readMoreLink}
                                            className="inline-block px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-orange-600 transition duration-300 text-sm"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Announcements;
