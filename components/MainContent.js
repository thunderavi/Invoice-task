// MainContent.js
import React, { useState } from "react";
import Fillvoice from "./fillvoice";

const MainContent = ({
  showFillvoice,
  handleCloseFillvoice,
  invoices,
  loading,
  statusFilter,
  handleStatusFilterChange,
  selectedInvoice,
  selectedAction,
  handleActionChange,
  handleApplyAction,
  isEditing,
  updatedInvoice,
  handleFieldChange,
}) => {
  const [searchType, setSearchType] = useState("vendor_name");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInvoices = Array.isArray(invoices)
    ? invoices.filter((invoice) => {
        if (searchType === "vendor_name") {
          return invoice.vendor_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        } else if (searchType === "invoice_number") {
          return invoice.invoice_number
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        }
        return true;
      })
    : []; // Default to an empty array if invoices is not an array

  // Function to get the correct class for status coloring
  const getStatusClass = (status) => {
    switch (status) {
      case "Open":
        return "bg-green-200 border border-green-500 text-green-500 font-bold px-4 py-2 w-full text-center";
      case "Awaiting Approval":
        return "bg-yellow-200 border border-yellow-500 text-yellow-500 font-bold px-4 py-2 w-full text-center";
      case "Approved":
        return "bg-indigo-200 border border-indigo-500 text-indigo-500 font-bold px-4 py-2 w-full text-center";
      case "Processing":
        return "bg-orange-200 border border-orange-500 text-orange-500 font-bold px-4 py-2 w-full text-center";
      case "Paid":
        return "bg-teal-200 border border-teal-500 text-teal-500 font-bold px-4 py-2 w-full text-center";
      case "Rejected":
        return "bg-red-200 border border-red-500 text-red-500 font-bold px-4 py-2 w-full text-center";
      case "Vendor Not Found":
        return "bg-purple-200 border border-purple-500 text-purple-500 font-bold px-4 py-2 w-full text-center";
      case "Duplicate":
        return "bg-pink-200 border border-pink-500 text-pink-500 font-bold px-4 py-2 w-full text-center";
      case "Void":
        return "bg-gray-200 border border-gray-500 text-gray-500 font-bold px-4 py-2 w-full text-center";
      default:
        return "bg-white text-gray-600 px-4 py-2 w-full text-center";
    }
  };
  

  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-auto">
      {showFillvoice && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
            <Fillvoice />
            <button
              onClick={handleCloseFillvoice}
              className="absolute top-2 right-2 text-red-500 text-lg font-bold"
            >
              X
            </button>
          </div>
        </div>
      )}

     <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8"> {/* Reduced py-6 to py-4 */}
  <div className="flex justify-between items-center">
    <h1 className="text-2xl font-bold tracking-tight text-left"> {/* Reduced text size */}
      Manage Invoices
    </h1>

    <div className="flex items-center space-x-4">
      {/* Bell Icon */}
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-900" 
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405a2 2 0 00-.395-2.52l.857-1.707A6.99 6.99 0 0012 4a6.99 6.99 0 00-7.056 7.368l.857 1.707a2 2 0 00-.395 2.52L4 17h5m1 0v3a2 2 0 004 0v-3m-2 0H8"
          />
        </svg>
      </div>
      {/* Random Person Circle */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white"> {/* Circle size remains the same */}
          <span className="text-xs">RP</span>
        </div>
        <div className="text-xs"> {/* Reduced text size */}
          <p className="font-semibold">John Doe</p>
          <p className="text-gray-500">johndoe@gmail.com</p>
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Grey Line */}
      <hr className="border-t border-gray-300 my-4" />
      {!showFillvoice && (
        <>
          {/* Filter Buttons */}
          <div className="flex items-center mb-6 space-x-4 flex-wrap relative">
            {[
              "",
              "Open",
              "Awaiting Approval",
              "Approved",
              "Processing",
              "Paid",
              "Rejected",
              "Vendor Not Found",
              "Duplicate",
              "Void",
            ].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusFilterChange(status)}
                className={`px-4 py-2 relative text-gray-700 focus:outline-none transition-all duration-300 ${
                  statusFilter === status
                    ? "text-blue-700 font-semibold"
                    : "hover:text-blue-700"
                }`}
              >
                {status || "All Statuses"}
                {statusFilter === status && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-700 rounded-md"></span>
                )}
              </button>
            ))}
          </div>

          {/* Grey Line */}
          <hr className="border-t border-gray-300 my-4" />

          {/* Search Box in a Toolbar */}
          <div className="flex justify-center items-center mb-6 w-full">
            <div className="flex items-center space-x-2 bg-white rounded-lg p-2 w-auto shadow-md">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="px-2 py-1 rounded-l-lg text-sm focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="vendor_name">Vendor Name</option>
                <option value="invoice_number">Invoice Number</option>
              </select>
              <input
                type="text"
                placeholder={`Search by ${
                  searchType === "vendor_name"
                    ? "Vendor Name"
                    : "Invoice Number"
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-2 py-1 w-80 text-sm rounded-r-lg focus:outline-none focus:ring focus:ring-blue-200"
              />
              <button
                onClick={() => {
                  if (searchQuery) {
                    setSearchQuery("");
                  } else {
                    // Implement search functionality
                    console.log("Search clicked");
                  }
                }}
                className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm shadow"
              >
                {searchQuery ? "Clear" : "Search"}
              </button>
            </div>
          </div>
          {/* Grey Line */}
          <hr className="border-t border-gray-300 my-4" />

          {/* Dashboard content */}
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow rounded overflow-hidden">
                <thead className="bg-blue-50 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="text-left p-4 whitespace-nowrap">
                      Vendor Name
                    </th>
                    <th className="text-left p-4 whitespace-nowrap">
                      Invoice Number
                    </th>
                    <th className="text-left p-4 whitespace-nowrap">Status</th>
                    <th className="text-right p-4 whitespace-nowrap">
                      Net Amount
                    </th>
                    <th className="text-left p-4 whitespace-nowrap">
                      Invoice Date
                    </th>
                    <th className="text-left p-4 whitespace-nowrap">
                      Due Date
                    </th>
                    <th className="text-left p-4 whitespace-nowrap">
                      Department
                    </th>
                    <th className="text-left p-4 whitespace-nowrap">
                      PO Number
                    </th>
                    <th className="text-right p-4 whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                {filteredInvoices.map((invoice) => (
  <React.Fragment key={invoice._id}>
    <tr className="border-t border-gray-200 hover:bg-gray-100">
      <td className="p-2 text-xs text-center whitespace-nowrap">{invoice.vendor_name}</td>
      <td className="p-2 text-xs text-center whitespace-nowrap">{invoice.invoice_number}</td>
      <td className="p-2 text-xs text-center whitespace-nowrap">
        <button
          className={`px-4 py-2 rounded-md focus:outline-none ${getStatusClass(invoice.status)}`}
        >
          {invoice.status}
        </button>
      </td>
      <td className="p-2 text-xs text-center whitespace-nowrap">{`$${invoice.net_amount}`}</td>
      <td className="p-2 text-xs text-center whitespace-nowrap">{invoice.invoice_date}</td>
      <td className="p-2 text-xs text-center whitespace-nowrap">{invoice.due_date}</td>
      <td className="p-2 text-xs text-center whitespace-nowrap">{invoice.department}</td>
      <td className="p-2 text-xs text-center whitespace-nowrap">{invoice.po_number}</td>
      <td className="p-2 text-xs text-center whitespace-nowrap">
        <select
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          value={selectedInvoice?._id === invoice._id ? selectedAction : ""}
          onChange={(e) => handleActionChange(e, invoice)}
        >
          <option value="">Action</option>
          <option value="Update">Update</option>
          <option value="Delete">Delete</option>
        </select>
        <button
          onClick={handleApplyAction}
          className="ml-2 px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
        >
          Apply
        </button>
      </td>
    </tr>
  

                      {/* Conditionally render the update form for the selected invoice */}
                      {isEditing && selectedInvoice?._id === invoice._id && (
  <tr className="border-t border-gray-200">
    <td colSpan={9} className="p-4">
      <div className="flex space-x-4 items-start">
        <div className="w-full">
          <form>
            <div className="grid grid-cols-4 gap-4">
              {Object.keys(updatedInvoice).map(
                (key) =>
                  key !== "_id" && (
                    <div key={key} className="mb-4 text-sm">
                      <label
                        htmlFor={key}
                        className="block text-gray-700 font-medium mb-1 text-xs"
                      >
                        {key.replace("_", " ").toUpperCase()}
                      </label>
                      {key === "status" ? (
                        // Dropdown for 'status'
                        <select
                          id={key}
                          value={updatedInvoice[key] || ""}
                          onChange={(e) =>
                            handleFieldChange(key, e.target.value)
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring focus:ring-blue-200"
                        >
                          <option value="">Select Status</option>
                          <option value="Open">Open</option>
                          <option value="Awaiting Approval">Awaiting Approval</option>
                          <option value="Approved">Approved</option>
                          <option value="Processing">Processing</option>
                          <option value="Paid">Paid</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      ) : (
                        // For other fields, keep as text input
                        <input
                          id={key}
                          type="text"
                          value={updatedInvoice[key] || ""}
                          onChange={(e) =>
                            handleFieldChange(key, e.target.value)
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring focus:ring-blue-200"
                        />
                      )}
                    </div>
                  )
              )}
            </div>
          </form>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleApplyAction}
            className="px-4 py-2 bg-blue-600 text-white rounded shadow text-xs"
          >
            Save Changes
          </button>
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
          )}
        </>
      )}
    </div>
  );
};

export default MainContent;
