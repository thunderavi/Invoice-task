// components/AdminForm.js
import { useState } from 'react';

const AdminForm = ({ savedData, setSavedData, onSave }) => {
  const [username, setUsername] = useState(savedData ? savedData.username : '');
  const [role, setRole] = useState(savedData ? savedData.role : 'Admin'); // Add role state

  const handleSave = () => {
    const data = { username, role }; // Include role in the saved data
    setSavedData(data); // Save the data to the parent component
    onSave(username, role); // Trigger the onSave callback to update the profile name and role in the sidebar
  };

  return (
    <div className="text-white">
      <h2 className="text-xl mb-4">Edit Profile</h2>
      <div className="mb-4">
        <label htmlFor="username" className="block mb-2">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* Dropdown for selecting role */}
      <div className="mb-4">
        <label htmlFor="role" className="block mb-2">Role:</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
      </div>
      
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
};

export default AdminForm;
