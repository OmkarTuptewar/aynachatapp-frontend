// components/ChatSessions.js
import React, { useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi'; // Trash icon
import { HiUserCircle } from 'react-icons/hi'; // User icon for sessions

const ChatSessions = ({ onCreateSession, sessions, onSelectSession, onDeleteSession }) => {
  const [sessionName, setSessionName] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State to control modal visibility

  const handleCreateSession = () => {
    if (sessionName.trim()) {
      onCreateSession(sessionName);
      setSessionName('');
      setIsOpen(false); // Close modal after creating session
    }
  };

  const openModal = () => setIsOpen(true); // Open modal
  const closeModal = () => setIsOpen(false); // Close modal

  return (
    <div className="flex flex-col p-4 space-y-4 rounded-3xl ">
      {/* Heading with the +CreateSession button */}
      <div className="flex items-center justify-between mb-4 ">
        <h2 className="text-2xl font-semibold text-gray-900">Chat Sessions</h2>
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          + Create Session
        </button>
      </div>

      {/* Sessions list */}
      <div className="space-y-3">
        {sessions.length > 0 ? (
          sessions.map((session, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between cursor-pointer bg-gray-100 p-4 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-200 ease-in-out"
              onClick={() => onSelectSession(session.name)} // Make the whole div clickable
            >
              <div className="flex items-center space-x-4">
                <HiUserCircle className="text-gray-500 text-3xl" /> {/* User icon */}
                <div className="font-bold text-gray-800">{session.name}</div> {/* Session name */}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering session select on delete click
                  onDeleteSession(session.name); // Call delete function
                }}
                className="text-red-500 hover:text-red-700"
              >
                <HiOutlineTrash className="text-lg" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No active sessions</p>
        )}
      </div>

      {/* Simple Modal for creating a session */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-semibold mb-4">Create a New Session</h3>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter session name"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSession}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Create Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSessions;
