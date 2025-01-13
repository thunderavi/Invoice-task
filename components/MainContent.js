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

  const filteredInvoices = invoices.filter((invoice) => {
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
  });

  // Function to get the correct class for status coloring
  const getStatusClass = (status) => {
    switch (status) {
      case "Open":
        return "bg-green-500 text-white";
      case "Awaiting Approval":
        return "bg-yellow-500 text-white";
      case "Approved":
        return "bg-indigo-500 text-white";
      case "Processing":
        return "bg-orange-500 text-white";
      case "Paid":
        return "bg-teal-500 text-white";
      case "Rejected":
        return "bg-red-500 text-white";
      case "Vendor Not Found":
        return "bg-purple-500 text-white";
      case "Duplicate":
        return "bg-pink-500 text-white";
      case "Void":
        return "bg-gray-500 text-white";
      default:
        return "bg-white text-gray-600";
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

      {!showFillvoice && (
        <>
          {/* Search Box */}
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Manage Invoices
            </h1>
          </div>
          <div className="flex items-center mb-6 space-x-4">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="vendor_name">Search by Vendor Name</option>
              <option value="invoice_number">Search by Invoice Number</option>
            </select>
            <input
              type="text"
              placeholder={`Search by ${
                searchType === "vendor_name" ? "Vendor Name" : "Invoice Number"
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 w-full"
            />
            <button
              onClick={() => setSearchQuery("")}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
            >
              Clear
            </button>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center mb-6 space-x-4 flex-wrap">
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
                className={`px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 transition-all duration-300 ${
                  statusFilter === status
                    ? "bg-blue-500 text-white"
                    : status === "Open"
                    ? "bg-green-500 text-white"
                    : status === "Awaiting Approval"
                    ? "bg-yellow-500 text-white"
                    : status === "Approved"
                    ? "bg-indigo-500 text-white"
                    : status === "Processing"
                    ? "bg-orange-500 text-white"
                    : status === "Paid"
                    ? "bg-teal-500 text-white"
                    : status === "Rejected"
                    ? "bg-red-500 text-white"
                    : status === "Vendor Not Found"
                    ? "bg-purple-500 text-white"
                    : status === "Duplicate"
                    ? "bg-pink-500 text-white"
                    : status === "Void"
                    ? "bg-gray-500 text-white"
                    : "bg-white text-gray-600"
                }`}
              >
                {status || "All Statuses"}
              </button>
            ))}
          </div>

          {/* Dashboard content */}
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow rounded overflow-hidden">
                <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
                  <tr>
                    <th className="text-left p-4">Vendor Name</th>
                    <th className="text-left p-4">Invoice Number</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-right p-4">Net Amount</th>
                    <th className="text-left p-4">Invoice Date</th>
                    <th className="text-left p-4">Due Date</th>
                    <th className="text-left p-4">Department</th>
                    <th className="text-left p-4">PO Number</th>
                    <th className="text-right p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((invoice) => (
                    <React.Fragment key={invoice._id}>
                      <tr className="border-t border-gray-200 hover:bg-gray-100">
                        <td className="p-4">{invoice.vendor_name}</td>
                        <td className="p-4">{invoice.invoice_number}</td>
                        <td className="p-4 text-center">
                          <button
                            className={`px-4 py-2 rounded-md focus:outline-none ${getStatusClass(
                              invoice.status
                            )}`}
                          >
                            {invoice.status}
                          </button>
                        </td>
                        <td className="p-4 text-right">{`$${invoice.net_amount}`}</td>
                        <td className="p-4">{invoice.invoice_date}</td>
                        <td className="p-4">{invoice.due_date}</td>
                        <td className="p-4">{invoice.department}</td>
                        <td className="p-4">{invoice.po_number}</td>
                        <td className="p-4 text-right">
                          <select
                            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            value={
                              selectedInvoice?._id === invoice._id
                                ? selectedAction
                                : ""
                            }
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
                              <div className="w-1/2">
                                <form>
                                  <div className="grid grid-cols-3 gap-4">
                                    {Object.keys(updatedInvoice).map(
                                      (key) =>
                                        key !== "_id" && (
                                          <div key={key} className="mb-4">
                                            <label
                                              htmlFor={key}
                                              className="block text-gray-700 text-sm font-medium mb-1"
                                            >
                                              {key
                                                .replace("_", " ")
                                                .toUpperCase()}
                                            </label>
                                            {key === "status" ? (
                                              // Dropdown for 'status'
                                              <select
                                                id={key}
                                                value={
                                                  updatedInvoice[key] || ""
                                                }
                                                onChange={(e) =>
                                                  handleFieldChange(
                                                    key,
                                                    e.target.value
                                                  )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 text-sm"
                                              >
                                                <option value="">
                                                  Select Status
                                                </option>
                                                <option value="Open">
                                                  Open
                                                </option>
                                                <option value="Awaiting Approval">
                                                  Awaiting Approval
                                                </option>
                                                <option value="Approved">
                                                  Approved
                                                </option>
                                                <option value="Processing">
                                                  Processing
                                                </option>
                                                <option value="Paid">
                                                  Paid
                                                </option>
                                                <option value="Rejected">
                                                  Rejected
                                                </option>
                                              
                                              </select>
                                            ) : (
                                              // For other fields, keep as text input
                                              <input
                                                id={key}
                                                type="text"
                                                value={
                                                  updatedInvoice[key] || ""
                                                }
                                                onChange={(e) =>
                                                  handleFieldChange(
                                                    key,
                                                    e.target.value
                                                  )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 text-sm"
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
                                  className="px-4 py-2 bg-blue-600 text-white rounded shadow"
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
