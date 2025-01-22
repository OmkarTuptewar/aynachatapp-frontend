// components/ChatBox.js
import React, { useEffect, useRef } from 'react';

const ChatBox = ({ messages, input, setInput, sendMessage }) => {
  const chatEndRef = useRef(null); // Ref to scroll to the bottom when a new message is sent

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col p-10 bg-slate-100  rounded-3xl h-full">
      {/* Scrollable chat messages with hidden scrollbar */}
      <div className="flex-grow overflow-y-auto mb-4 space-y-4 custom-scroll">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-6 py-3 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'} 
                transition-all duration-300 ease-in-out transform hover:scale-105`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} /> {/* Empty div to scroll to the bottom */}
      </div>

      {/* Send message input area */}
      <div className="flex mt-4 space-x-4">
        <input
          className="flex-grow p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
