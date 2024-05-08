import React, { useState } from 'react';

const AnnouncementsList = ({ announcements, handleUpdate, handleDelete }) => {
    const [expandedAnnouncementId, setExpandedAnnouncementId] = useState(null);

    const toggleExpand = (announcementId) => {
        setExpandedAnnouncementId(announcementId === expandedAnnouncementId ? null : announcementId);
    };

    return (
        <div className="overflow-x-auto">
            <h3 className="text-xl font-bold mb-4">Announcements</h3>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {announcements.map((announcement) => (
                            <React.Fragment key={announcement.id}>
                                <tr>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <button className="focus:outline-none" onClick={() => toggleExpand(announcement.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${announcement.id === expandedAnnouncementId ? 'transform rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 0a1 1 0 0 1 .707 1.707l-8.5 8.5a1 1 0 0 1-1.414-1.414L9 1.793 1.707 9.086a1 1 0 0 1-1.414 1.414l-8.5-8.5A1 1 0 0 1 0 0h10z" />
                                                </svg>
                                            </button>
                                            <span className="ml-2">{announcement.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button onClick={() => handleUpdate(announcement.id)} className="text-indigo-600 hover:text-indigo-900 mr-2">
                                            Update
                                        </button>
                                        <button onClick={() => handleDelete(announcement.id)} className="text-red-600 hover:text-red-900">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                {announcement.id === expandedAnnouncementId && (
                                    <tr>
                                        <td colSpan="2" className="px-6 py-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold">Description:</span>
                                                    <p>{announcement.description}</p>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold">Image URL:</span>
                                                    <p>{announcement.imageURL}</p>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold">Read More Link:</span>
                                                    <p>{announcement.readMoreLink}</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AnnouncementsList;
