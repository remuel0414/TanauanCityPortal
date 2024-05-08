import React, { useState } from 'react';

const FAQ = () => {
  // Sample FAQ data
  const faqData = [
    {
      id: 1,
      question: 'What is the purpose of this portal?',
      answer: 'This portal allows you to book and request various government services and track the progress of your requests.',
    },
    {
      id: 2,
      question: 'How can I request a document?',
      answer: 'To request a document, navigate to the "Request Document" section and follow the instructions provided.',
    },
    {
      id: 3,
      question: 'What services are available?',
      answer: 'We offer a wide range of services such as document processing, permit applications, and other community services.',
    },
    {
      id: 4,
      question: 'How can I update my personal information?',
      answer: 'You can update your personal information by navigating to the "Profile" section and selecting the "Edit Profile" option.',
    },
    // Add more questions and answers as needed
  ];

  // State to track which question is open
  const [openQuestionId, setOpenQuestionId] = useState(null);

  // Function to toggle question visibility
  const toggleQuestion = (id) => {
    setOpenQuestionId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      
      {/* FAQ List */}
      <div className="space-y-6">
        {faqData.map((faq) => (
          <div key={faq.id} className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
            <button
              className="w-full text-left p-4 bg-gray-100 flex justify-between items-center focus:outline-none"
              onClick={() => toggleQuestion(faq.id)}
            >
              <span className="font-semibold text-lg">{faq.question}</span>
              {/* Arrow button for expanding/collapsing */}
              <span
                className={`transform transition-transform duration-300 text-gray-600 ${openQuestionId === faq.id ? 'rotate-180' : ''}`}
              >
                ▼
              </span>
            </button>
            
            {/* Answer */}
            {openQuestionId === faq.id && (
              <div className="p-4 bg-white text-gray-800">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
