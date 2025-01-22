// components/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { HiOutlineLogout } from "react-icons/hi"; // Removing unnecessary icons
import userimage from "../Assets/userimage.png"
const Navbar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate("/login"); // Navigate to the login page after logging out
  };

  // Default user icon
  const defaultUserIcon =userimage

  return (
    <div className="  p-4 bg-gray-700">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        {/* Left section: Logo/Name */}
        <div className="text-2xl font-semibold text-gray-800 flex items-center space-x-2">
          <span className="text-blue-600">Chat</span>
          <span className="text-white">Application</span>
        </div>

        {/* Right section: User details & logout button */}
        {user ? (
          <div className="flex items-center space-x-6">
            {/* User Avatar */}
            <img
              src={user.avatar || defaultUserIcon} // Use the user's avatar or the default one
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold text-gray-800">{user.name}</span>
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 ease-in-out"
            >
              <HiOutlineLogout className="mr-2" />
              Log Out
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
