import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { auth, firestore, storage } from '../../firebase.js'; // Import getDoc from firestore
import { sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, where, getDoc, updateDoc, doc} from 'firebase/firestore';
 // Import necessary firestore functions
 import { getDocs, query} from 'firebase/firestore';
const ProfileSettings = () => {
    const [user, setUser] = useState(null);
    const [passwordChangeSent, setPasswordChangeSent] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePictureURL, setProfilePictureURL] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = auth.currentUser;
                if (currentUser) {
                    setUser(currentUser);
                    if (currentUser.photoURL) {
                        setProfilePictureURL(currentUser.photoURL);
                    }
                } else {
                    console.error('User not logged in');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleProfilePictureUpload = async (e) => {
        const file = e.target.files[0];
        try {
            if (!user) {
                console.error('User not logged in');
                return;
            }
    
            const userQuery = query(collection(firestore, 'userInfo'), where('uid', '==', user.uid));
            const userDocsSnap = await getDocs(userQuery);
    
            if (!userDocsSnap.empty) {
                // Assuming there's only one document per user UID, otherwise handle multiple documents here
                const userDocRef = userDocsSnap.docs[0].ref;
    
                const storageRef = ref(storage, `profilePictures/${user.uid}/${file.name}`);
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);
                setProfilePictureURL(downloadURL);
    
                await updateDoc(userDocRef, {
                    photoURL: downloadURL
                });
    
                console.log('Profile picture uploaded and URL updated successfully');
            } else {
                console.error('User document not found:', user.uid);
            }
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    };

    const handleChangePassword = async () => {
        try {
            await sendPasswordResetEmail(auth, user.email);
            setPasswordChangeSent(true);
        } catch (error) {
            console.error('Error sending password reset email:', error);
        }
    };

    return (
        <div className="relative min-h-screen">
            <div className="relative z-10 flex flex-col justify-center items-center pt-20 pb-8">
                <div className="max-w-md bg-white rounded-lg shadow-lg p-8 w-full">
                    <h1 className='text-3xl font-bold text-gray-800 mb-8'>Profile Settings</h1>
                    <div className='flex flex-col space-y-4'>
                        <div className='flex space-x-4 items-center'>
                            <FaEnvelope className='w-6 h-6 text-gray-500' />
                            <p className="text-lg">{user && user.email}</p>
                        </div>
                        <div className='flex space-x-4 items-center'>
                            <FaLock className='w-6 h-6 text-gray-500' />
                            <p className="text-lg">********</p>
                            {passwordChangeSent && <p className="text-green-500">Successfully sent password reset email. Please check your email.</p>}
                            <button className="text-blue-500" onClick={handleChangePassword}>Change Password</button>
                        </div>
                        <div className="flex flex-col space-y-4 items-center">
                            <label htmlFor="profilePictureInput" className="text-gray-500">Profile Picture</label>
                            <input type="file" id="profilePictureInput" accept="image/*" onChange={handleProfilePictureUpload} />
                            {profilePictureURL && <img src={profilePictureURL} alt="Profile" className="w-20 h-20 rounded-full" />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
