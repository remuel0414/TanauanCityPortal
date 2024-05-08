import React, { useState, useEffect } from 'react';
import AnnouncementForm from './AnnouncementForm';
import PictureForm from './PictureForm';
import AnnouncementsList from './AnnouncementsList';
import PicturesList from './PicturesList';
import ContactsList from './ContactsList';
import { firestore } from '../firebase.js';
import { getDocs, collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating unique IDs

const AdminDash = () => {
    const [activeTab, setActiveTab] = useState('announcements');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [announcementImageURL, setAnnouncementImageURL] = useState('');
    const [readMoreLink, setReadMoreLink] = useState('');
    const [pictures, setPictures] = useState([]);
    const [pictureImageURL, setPictureImageURL] = useState('');
    const [announcements, setAnnouncements] = useState([]);

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

        const fetchPictures = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'pictures'));
                const picturesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPictures(picturesData);
            } catch (error) {
                console.error('Error fetching pictures:', error);
            }
        };

        fetchAnnouncements();
        fetchPictures();
    }, []);

    const handleSubmitAnnouncement = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(firestore, 'announcements'), {
                title,
                description,
                imageURL: announcementImageURL,
                readMoreLink,
            });

            setTitle('');
            setDescription('');
            setAnnouncementImageURL('');
            setReadMoreLink('');

            console.log('Announcement added successfully!');
        } catch (error) {
            console.error('Error adding announcement:', error);
        }
    };

    const handleUpdateAnnouncement = async (announcementId) => {
        try {
            await updateDoc(doc(firestore, 'announcements', announcementId), {
                title,
                description,
                imageURL: announcementImageURL,
                readMoreLink,
            });

            console.log('Announcement updated successfully!');
        } catch (error) {
            console.error('Error updating announcement:', error);
        }
    };

    const handleDeleteAnnouncement = async (announcementId) => {
        try {
            await deleteDoc(doc(firestore, 'announcements', announcementId));

            console.log('Announcement deleted successfully!');
        } catch (error) {
            console.error('Error deleting announcement:', error);
        }
    };

    const handleAddPicture = async (e) => {
        e.preventDefault();
        
        try {
            await addDoc(collection(firestore, 'pictures'), {
                imageURL: pictureImageURL,
            });
            console.log('Picture added successfully!');
            setPictureImageURL('');
        } catch (error) {
            console.error('Error adding picture:', error);
        }
    };

    const handleDeletePicture = async (pictureId) => {
        try {
            console.log('Deleting picture document with ID:', pictureId);
            await deleteDoc(doc(firestore, 'pictures', pictureId));
    
            console.log('Picture document deleted successfully from Firestore!');
        } catch (error) {
            console.error('Error deleting picture document:', error);
        }
    };

    return (
        <div className="container mx-auto py-10 px-4 lg:px-0">
            <h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>

            {/* Tabs */}
            <div className="flex mb-8">
                <button
                    className={`px-6 py-2 mr-4 rounded-md focus:outline-none ${activeTab === 'announcements' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setActiveTab('announcements')}
                >
                    Announcements
                </button>
                <button
                    className={`px-6 py-2 mr-4 rounded-md focus:outline-none ${activeTab === 'pictures' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setActiveTab('pictures')}
                >
                    Pictures
                </button>
                <button
                    className={`px-6 py-2 rounded-md focus:outline-none ${activeTab === 'contacts' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setActiveTab('contacts')}
                >
                    Messages
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'announcements' && (
                <>
                    <AnnouncementForm
                        title={title}
                        setTitle={setTitle}
                        description={description}
                        setDescription={setDescription}
                        announcementImageURL={announcementImageURL}
                        setAnnouncementImageURL={setAnnouncementImageURL}
                        readMoreLink={readMoreLink}
                        setReadMoreLink={setReadMoreLink}
                        handleSubmit={handleSubmitAnnouncement}
                    />

                    <AnnouncementsList
                        announcements={announcements}
                        handleUpdate={handleUpdateAnnouncement}
                        handleDelete={handleDeleteAnnouncement}
                    />
                </>
            )}

            {activeTab === 'pictures' && (
                <>
                    <PictureForm
                        pictureImageURL={pictureImageURL}
                        setPictureImageURL={setPictureImageURL}
                        handleAddPicture={handleAddPicture}
                    />

                    <PicturesList
                        pictures={pictures}
                        handleDeletePicture={handleDeletePicture}
                    />
                </>
            )}

            {activeTab === 'contacts' && <ContactsList />}
        </div>
    );
};

export default AdminDash;
