import React, { useState, useEffect } from 'react';
import { FaBars, FaHome, FaFileAlt, FaUser } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase.js'; // Import Firebase authentication instance

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track authentication status
    const [activeButton, setActiveButton] = useState('Home'); // State to track active navigation button
    const [showNavDropdown, setShowNavDropdown] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in on component mount
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setIsLoggedIn(true); // Set state to true if user is logged in
            } else {
                setIsLoggedIn(false); // Set state to false if user is not logged in
            }
        });
        return () => unsubscribe(); // Cleanup function
    }, []);

    const toggleNavDropdown = () => {
        setShowNavDropdown(!showNavDropdown);
    };

    const toggleProfileDropdown = () => {
        setShowProfileDropdown(!showProfileDropdown);
    };

    const handleLogout = () => {
        auth.signOut().then(() => {
            setIsLoggedIn(false); // Update authentication status on logout
            navigate('/'); // Redirect to login/signup page
        }).catch(error => {
            console.error('Logout error:', error);
        });
    };

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName); // Update active button state
        setShowNavDropdown(false); // Close nav dropdown when a button is clicked
    };

    return (
        <nav className="fixed top-0 w-full bg-gray-100 shadow z-50 h-20" style={{ backgroundColor: "#f1f5f9" }}>
            <div className="container mx-auto flex justify-between items-center py-4 px-10 relative">
                {/* Left part of navbar */}
                <div className="flex items-center">
                    <img
                        src="src/assets/logo.png"
                        alt="Logo"
                        className="h-14 w-auto mr-3"
                    />
                    <span className="text-lg font-semibold text-gray-800">Tanauan City Portal</span>
                    {/* Profile icon on small screens */}
                    {isLoggedIn && (
                        <div className="lg:hidden ml-4">
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer" onClick={toggleProfileDropdown}>
                                <img src="src/assets/profile.png" alt="Profile" className="w-10 h-10 rounded-full" />
                            </div>
                            {showProfileDropdown && (
                                <div className="absolute top-full right-0 bg-white shadow-md w-full py-2 rounded-md">
                                    <button className="block px-4 py-2" onClick={handleLogout}>Log Out</button>
                                    {auth.currentUser && auth.currentUser.email === "lumbangremuel@gmail.com" && (
                                        <Link
                                            to="/admin"
                                            className="block px-4 py-2"
                                            onClick={() => handleButtonClick('Admin Dashboard')}
                                        >
                                            Admin Dashboard
                                        </Link>
                                    )}
                                    <Link
                                        to="/profile-settings"
                                        className="block px-4 py-2"
                                        onClick={() => handleButtonClick('Profile Settings')}
                                    >
                                        Profile Settings
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right part of navbar */}
                {isLoggedIn ? ( // Render different content based on authentication status
                    <div className="hidden lg:flex items-center space-x-4">
                        <Link
                            to="/homepage"
                            className={`flex items-center px-4 py-2 hover:bg-gray-100 transition duration-300 ${activeButton === 'Home' ? 'border-b-2 border-orange-500' : ''}`}
                            onClick={() => handleButtonClick('Home')}
                        >
                            <FaHome className="mr-2" />
                            Home
                        </Link>
                        <Link
                            to="/request"
                            className={`flex items-center px-4 py-2 hover:bg-gray-100 transition duration-300 ${activeButton === 'Request Document' ? 'border-b-2 border-orange-500' : ''}`}
                            onClick={() => handleButtonClick('Request Document')}
                        >
                            <FaFileAlt className="mr-2" />
                            Request Document
                        </Link>
                        <Link
                            to="/track"
                            className={`flex items-center px-4 py-2 hover:bg-gray-100 transition duration-300 ${activeButton === 'Track Document' ? 'border-b-2 border-orange-500' : ''}`}
                            onClick={() => handleButtonClick('Track Document')}
                        >
                            <FaFileAlt className="mr-2" />
                            Track Document
                        </Link>
                        {/* Profile icon on larger screens */}
                        <div className="lg:flex items-center ml-4">
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer" onClick={toggleProfileDropdown}>
                                <img src="src/assets/profile.png" alt="Profile" className="w-10 h-10 rounded-full" />
                            </div>
                            {showProfileDropdown && (
                                <div className="absolute top-full right-0 bg-white shadow-md w-full py-2 rounded-md">
                                    <button className="block px-4 py-2" onClick={handleLogout}>Log Out</button>
                                    {auth.currentUser && auth.currentUser.email === "lumbangremuel@gmail.com" && (
                                        <Link
                                            to="/admin"
                                            className="block px-4 py-2"
                                            onClick={() => handleButtonClick('Admin Dashboard')}
                                        >
                                            Homepage Dashboard
                                        </Link>
                                    )}
                                    <Link
                                        to="/profile-settings"
                                        className="block px-4 py-2"
                                        onClick={() => handleButtonClick('Profile Settings')}
                                    >
                                        Change Password
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="hidden lg:flex items-center space-x-4">
                        {/* Render nothing if not logged in */}
                    </div>
                )}

                {/* Hamburger menu on small screens */}
                <div className="lg:hidden">
                    <button className="flex items-center text-sm font-medium focus:outline-none" onClick={toggleNavDropdown}>
                        <FaBars className="text-xl" />
                    </button>
                </div>
            </div>

            {/* Nav dropdown for small screens */}
            {showNavDropdown && (
                <div className="lg:hidden absolute top-full right-0 bg-white shadow-md w-full py-2 rounded-md">
                    <Link
                        to="/homepage"
                        className={`block px-4 py-2 ${activeButton === 'Home' ? 'bg-gray-200' : ''}`}
                        onClick={() => handleButtonClick('Home')}
                    >
                        Home
                    </Link>
                    <Link
                        to="/request"
                        className={`block px-4 py-2 ${activeButton === 'Request Document' ? 'bg-gray-200' : ''}`}
                        onClick={() => handleButtonClick('Request Document')}
                    >
                        Request Document
                    </Link>
                    <Link
                        to="/track"
                        className={`block px-4 py-2 ${activeButton === 'Track Document' ? 'bg-gray-200' : ''}`}
                        onClick={() => handleButtonClick('Track Document')}
                    >
                        Track Document
                    </Link>
                    {auth.currentUser && auth.currentUser.email === "lumbangremuel@gmail.com" && (
                        <Link
                            to="/admin"
                            className={`block px-4 py-2 ${activeButton === 'Admin Dashboard' ? 'bg-gray-200' : ''}`}
                            onClick={() => handleButtonClick('Admin Dashboard')}
                        >
                            Admin Dashboard
                        </Link>
                    )}
                    <Link
                        to="/profile-settings"
                        className={`block px-4 py-2 ${activeButton === 'Profile Settings' ? 'bg-gray-200' : ''}`}
                        onClick={() => handleButtonClick('Profile Settings')}
                    >
                        Change Password
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
