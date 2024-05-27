import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { auth, firestore, storage } from '../../firebase.js';
import { sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, where, getDoc, updateDoc, doc } from 'firebase/firestore';
import { getDocs, query } from 'firebase/firestore';

const ProfileSettings = () => {
    const [user, setUser] = useState(null);
    const [passwordChangeSent, setPasswordChangeSent] = useState(false);
    const [profilePictureURL, setProfilePictureURL] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [editingInfo, setEditingInfo] = useState(false);
    const [updatedInfo, setUpdatedInfo] = useState({
        fullName: '',
        address: '',
        phoneNumber: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = auth.currentUser;
                if (currentUser) {
                    setUser(currentUser);
                    const userQuery = query(collection(firestore, 'userInfo'), where('uid', '==', currentUser.uid));
                    const userDocsSnap = await getDocs(userQuery);
                    if (!userDocsSnap.empty) {
                        const userInfoData = userDocsSnap.docs[0].data();
                        setUserInfo(userInfoData);
                        if (currentUser.photoURL) {
                            setProfilePictureURL(currentUser.photoURL);
                        }
                        setUpdatedInfo(userInfoData);
                    } else {
                        console.error('User document not found:', currentUser.uid);
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

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
                const userDocRef = userDocsSnap.docs[0].ref;
                const storageRef = ref(storage, `profilePictures/${user.uid}/${file.name}`);
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);
                setProfilePictureURL(downloadURL);
                await updateDoc(userDocRef, { photoURL: downloadURL });
                console.log('Profile picture uploaded and URL updated successfully');
                
                // Reload the page
                window.location.reload();
            } else {
                console.error('User document not found:', user.uid);
            }
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    };
    
    const handleEditSave = async () => {
        try {
            const userQuery = query(collection(firestore, 'userInfo'), where('uid', '==', user.uid));
            const userDocsSnap = await getDocs(userQuery);

            if (!userDocsSnap.empty) {
                const userDocRef = userDocsSnap.docs[0].ref;
                await updateDoc(userDocRef, updatedInfo);
                console.log('User info updated successfully');
                setEditingInfo(false);
                window.location.reload();
            } else {
                console.error('User document not found:', user.uid);
            }
            
        } catch (error) {
            console.error('Error updating user info:', error);
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
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-md bg-white rounded-lg shadow-lg p-8 w-full">
                <h1 className='text-3xl font-bold text-gray-800 mb-8 text-center'>Profile Settings</h1>
                <div className='space-y-4'>
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
                    {userInfo && !editingInfo && (
                        <div className='space-y-4'>
                            <div className='flex space-x-4 items-center'>
                                <FaEdit className='w-6 h-6 text-gray-500' />
                                <p className="text-lg">Full Name: {userInfo.fullName}</p>
                            </div>
                            <div className='flex space-x-4 items-center'>
                                <FaEdit className='w-6 h-6 text-gray-500' />
                                <p className="text-lg">Address: {userInfo.address}</p>
                            </div>
                            <div className='flex space-x-4 items-center'>
                                <FaEdit className='w-6 h-6 text-gray-500' />
                                <p className="text-lg">Phone Number: {userInfo.phoneNumber}</p>
                            </div>
                            <button className="text-white bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2" onClick={() => setEditingInfo(true)}>Edit Info</button>
                        </div>
                    )}
                    {editingInfo && (
                        <div className='space-y-4'>
                            <div className='flex space-x-4 items-center'>
                                <FaEdit className='w-6 h-6 text-gray-500' />
                                <input type="text" name="fullName" value={updatedInfo.fullName} onChange={handleInputChange} placeholder="Full Name" className="border rounded-md px-2 py-1 w-full" />
                            </div>
                            <div className='flex space-x-4 items-center'>
                                <FaEdit className='w-6 h-6 text-gray-500' />
                                <input type="text" name="address" value={updatedInfo.address} onChange={handleInputChange} placeholder="Address" className="border rounded-md px-2 py-1 w-full" />
                            </div>
                            <div className='flex space-x-4 items-center'>
                                <FaEdit className='w-6 h-6 text-gray-500' />
                                <input type="text" name="phoneNumber" value={updatedInfo.phoneNumber} onChange={handleInputChange} placeholder="Phone Number" className="border rounded-md px-2 py-1 w-full" />
                            </div>
                            <div className="flex space-x-4">
                                <button className="text-white bg-green-500 hover:bg-green-600 rounded-md px-4 py-2" onClick={handleEditSave}><FaSave className="mr-2" />Save</button>
                                <button className="text-white bg-red-500 hover:bg-red-600 rounded-md px-4 py-2" onClick={() => setEditingInfo(false)}><FaTimes className="mr-2" />Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
