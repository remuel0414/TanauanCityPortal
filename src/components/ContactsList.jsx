import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase.js';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const ContactsList = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'contacts'));
                const contactsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setContacts(contactsData);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        fetchContacts();
    }, []);

    const handleDeleteContact = async (contactId) => {
        try {
            await deleteDoc(doc(firestore, 'contacts', contactId));
            setContacts(contacts.filter(contact => contact.id !== contactId));
            console.log('Contact deleted successfully!');
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Messages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contacts.map(contact => (
                    <div key={contact.id} className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-2">{contact.fullName}</h3>
                        <p className="text-gray-600 mb-2">{contact.email}</p>
                        <p className="text-gray-600 mb-4">{contact.message}</p>
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                            onClick={() => handleDeleteContact(contact.id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactsList;
