// pages/ChatPage.js
import React, { useState, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Navbar from "../components/Navbar";
import ChatSessions from "../components/ChatSessions";
import ChatBox from "../components/ChatBox";
import { useUser } from "../context/UserContext";


const client = new W3CWebSocket(process.env.REACT_APP_WEBSOCKET_URL);





const ChatPage = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [activeSession, setActiveSession] = useState(null);
  const [sessions, setSessions] = useState([]); // Sessions state to hold active sessions

  // Retrieve sessions and their messages from localStorage on component mount
  useEffect(() => {
    const storedSessions = JSON.parse(localStorage.getItem("sessions"));
    // console.log("WebSocket URL:", process.env.REACT_APP_WEBSOCKET_URL);
    if (storedSessions) {
      setSessions(storedSessions); // Load sessions from localStorage
    }
  }, []);

  // Update localStorage whenever sessions or messages change
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem("sessions", JSON.stringify(sessions)); // Save sessions to localStorage
    }
  }, [sessions]);

  useEffect(() => {
    if (activeSession) {
      const session = sessions.find((session) => session.name === activeSession);
      setMessages(session ? session.messages : []);
      
      // WebSocket communication for chat
      client.onmessage = (message) => {
        const receivedMessage = { sender: "server", text: message.data };
        
        // Update the localMessages with received message
        const updatedMessages = [...messages, receivedMessage];
        setMessages(updatedMessages);

        // Update the session's messages in localStorage
        const updatedSessions = sessions.map((session) =>
          session.name === activeSession
            ? { ...session, messages: updatedMessages }
            : session
        );
        setSessions(updatedSessions);
        localStorage.setItem("sessions", JSON.stringify(updatedSessions));
      };
    }
  }, [activeSession, sessions, messages]);

  const sendMessage = () => {
    if (input.trim() && activeSession) {
      if (client.readyState === WebSocket.OPEN) {
        const updatedMessages = [...messages, { sender: "user", text: input }];
        setMessages(updatedMessages);
  
        // Update localStorage with new messages
        const updatedSessions = sessions.map((session) =>
          session.name === activeSession
            ? { ...session, messages: updatedMessages }
            : session
        );
        setSessions(updatedSessions);
  
        // Send message via WebSocket
        client.send(input);
        setInput(""); // Clear input
      } else {
        console.error("WebSocket is not open. Unable to send message.");
      }
    }
  };
  

  const createSession = (name) => {
    // Check if the session already exists
    const sessionExists = sessions.some((session) => session.name === name);
    if (sessionExists) {
      alert("Session already exists!");
      return;
    }

    // Create a new session with empty messages
    const newSession = { name, messages: [] };
    const updatedSessions = [...sessions, newSession];

    setSessions(updatedSessions);
    setActiveSession(name);

    // Update localStorage with the new session
    localStorage.setItem("sessions", JSON.stringify(updatedSessions));
  };

  // Select a session and load its messages
  const selectSession = (sessionName) => {
    setActiveSession(sessionName); // Set the active session
    const session = sessions.find((s) => s.name === sessionName);
    setMessages(session ? session.messages : []); // Load messages for the selected session
  };

  // Delete a session and its associated messages
  const deleteSession = (sessionName) => {
    // Remove the session from the sessions array
    const updatedSessions = sessions.filter((session) => session.name !== sessionName);
    setSessions(updatedSessions);

    // If the deleted session was active, set activeSession to null
    if (activeSession === sessionName) {
      setActiveSession(null);
      setMessages([]);
    }

    // Update localStorage to remove the deleted session
    localStorage.setItem("sessions", JSON.stringify(updatedSessions));
  };

  return (
    <div className="h-screen flex flex-col bg-slate-600">
      <Navbar />
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        <div className="w-full md:w-1/4 bg-slate-300 md:h-full">
          <ChatSessions
            onCreateSession={createSession}
            sessions={sessions}
            onSelectSession={selectSession}
            onDeleteSession={deleteSession} // Pass the delete function to ChatSessions
          />
        </div>
        <div className="flex flex-col flex-grow p-4 rounded-lg border-r">
          {activeSession ? (
            <ChatBox
              messages={messages}
              input={input}
              setInput={setInput}
              sendMessage={sendMessage}
            />
          ) : (
            <div className="flex items-center justify-center flex-grow text-gray-500">
              <p>Select a session to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
