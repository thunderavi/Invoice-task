import React, { useState } from "react";
import {
  FaFileInvoice,
  FaBars,
  FaTimes,
  FaCog,
  FaBox,
  FaTachometerAlt,
} from "react-icons/fa"; // Importing icons for the sidebar
import Image from "next/image"; // Importing the Image component from Next.js

const Sidebar = ({ onCreateInvoiceClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for toggling sidebar visibility on mobile

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar visibility
  };

  return (
    <div className="relative">
      {/* Hamburger Menu Icon (Visible only on small screens) */}
      <div className="lg:hidden absolute top-4 left-4">
        <button onClick={toggleSidebar} className="text-white">
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`w-48 bg-gradient-to-r from-white to-blue-50 text-gray-800 flex flex-col h-screen shadow-lg transition-all duration-300 ease-in-out 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 rounded-l-lg`}
      >
        {/* Header Section */}
        <div className="p-6 text-xl font-bold bg-blue-50 text-gray-800 flex items-center justify-between rounded-t-lg">
        <div className="flex items-center space-x-2 pl-4">
  <Image 
    src="/logo.jpg" // Path to the logo icon image
    alt="Finifi Logo"
    width={100} // Increased width
    height={64} // Increased height
    className="object-contain" // Ensures the image is not distorted
  />
</div>

</div>


        {/* Navigation Links */}
        <div className="mt-4 space-y-2 pl-4">
          {/* Added padding-left here */}
          <button
            onClick={onCreateInvoiceClick}
            className="w-full px-4 py-2 text-left bg-blue-500 text-white flex items-center space-x-2 rounded-none shadow-none transform transition-all duration-200 ease-in-out hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 pr-8" // Added pr-8 for more right padding
          >
            <FaFileInvoice />
            <span className="text-sm">Create Invoice</span>
          </button>
          {/* Dashboard Link with left curve */}
          <button
            onClick={() => alert("Dashboard Clicked")}
            className="w-full px-4 py-2 text-left bg-[#1D3557]  rounded-l-2xl text-white flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FaTachometerAlt />
            <span className="text-sm">Dashboard</span>
          </button>
          {/* Vendor Link */}
          <button
            onClick={() => alert("Vendor Clicked")}
            className="w-full px-4 py-2 text-left hover:bg-blue-200 rounded-none flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FaBox />
            <span className="text-sm">Vendor</span>
          </button>
          {/* Settings Link */}
          <button
            onClick={() => alert("Settings Clicked")}
            className="w-full px-4 py-2 text-left hover:bg-blue-200 rounded-none flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FaCog />
            <span className="text-sm">Settings</span>
          </button>
        </div>

        {/* Footer Section */}
        <div className="mt-auto p-4 text-center text-xs text-gray-500">
          <p>© 2025 Finifi. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
