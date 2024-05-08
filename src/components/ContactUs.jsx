import React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase'; // Adjust the path as per your project structure

const ContactUs = () => {
  // Sample emergency hotlines data
  const hotlines = [
    {
      id: 1,
      description: 'Fire Department',
      number: '123-4567',
    },
    {
      id: 2,
      description: 'Police Department',
      number: '234-5678',
    },
    {
      id: 3,
      description: 'Hospital',
      number: '345-6789',
    },
    {
      id: 4,
      description: 'Disaster Management',
      number: '456-7890',
    },
    {
      id: 5,
      description: 'Electricity Emergency',
      number: '567-8901',
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fullName = e.target.fullName.value;
      const email = e.target.email.value;
      const message = e.target.message.value;

      // Store the form data in Firestore
      await addDoc(collection(firestore, 'contacts'), {
        fullName,
        email,
        message,
      });

      // Optionally, you can reset the form fields after submission
      e.target.reset();

      console.log('Form data submitted successfully!');
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <div className="container mx-auto py-10 grid lg:grid-cols-2 gap-10">
      {/* Contact Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        
        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Full Name Input */}
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-lg font-semibold mb-2">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          
          {/* Email Address Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-semibold mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          
          {/* Concerns/Message Input */}
          <div className="mb-6">
            <label htmlFor="message" className="block text-lg font-semibold mb-2">Concerns/Message</label>
            <textarea
              id="message"
              name="message"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              rows={5}
              required
            />
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold p-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
      
      {/* Emergency Hotlines */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Emergency Hotlines</h2>
        
        {/* Hotline List */}
        <ul className="space-y-4">
          {hotlines.map((hotline) => (
            <li key={hotline.id} className="flex justify-between items-center">
              <span className="font-semibold">{hotline.description}</span>
              <span className="text-blue-600">{hotline.number}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContactUs;
