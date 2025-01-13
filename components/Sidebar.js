import React, { useState } from "react";
import { FaUser, FaFileInvoice, FaCog } from "react-icons/fa"; // Importing icons for the sidebar
import AdminForm from './AdminForm'; // Import AdminForm here

const Sidebar = ({ onCreateInvoiceClick }) => {
  const [showAdminForm, setShowAdminForm] = useState(false); // State to control the display of AdminForm
  const [profileName, setProfileName] = useState("Avi Ranjan"); // State to store the username
  const [profileRole, setProfileRole] = useState("Admin"); // State to store the profile role
  const [savedData, setSavedData] = useState(null); // State to store saved form data

  const handleProfileClick = () => {
    setShowAdminForm(!showAdminForm); // Toggle the visibility of the AdminForm
  };

  const handleSave = (username, role) => {
    setProfileName(username); // Update profile name with the new username
    setProfileRole(role); // Update the profile role with the new role
    setShowAdminForm(false); // Close the form after saving
  };

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-screen shadow-lg">
      {/* Header Section */}
      <div className="p-6 text-3xl font-bold border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FaFileInvoice className="text-blue-500" />
          <span>Finifi</span>
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-4 flex items-center space-x-3 border-b border-gray-700 cursor-pointer">
        <FaUser className="text-xl" />
        <div>
          <span className="font-semibold">{profileName}</span>
          <p className="text-sm text-gray-400">{profileRole}</p> {/* Display role */}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="mt-4 space-y-2 px-4">
        <button
          onClick={onCreateInvoiceClick}
          className="w-full px-4 py-2 text-left bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center space-x-2"
        >
          <FaFileInvoice />
          <span>Create Invoice</span>
        </button>
        {/* Button to Edit Profile */}
        <button
          onClick={handleProfileClick}
          className="w-full px-4 py-2 text-left hover:bg-gray-700 rounded-lg flex items-center space-x-2"
        >
          <FaUser />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Conditional Rendering of AdminForm Below the "Edit Profile" Button */}
      {showAdminForm && (
        <div className="p-4 bg-gray-800 border-t border-gray-700">
          <AdminForm savedData={savedData} setSavedData={setSavedData} onSave={handleSave} />
        </div>
      )}

      {/* Footer Section */}
      <div className="mt-auto p-4 text-center text-sm text-gray-400 border-t border-gray-700">
        <p>© 2025 Finifi. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Sidebar;
