import { useState } from "react";
import axios from 'axios';

export default function Fillvoice() {
  const [vendorName, setVendorName] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [status, setStatus] = useState('');
  const [netAmount, setNetAmount] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [department, setDepartment] = useState('');
  const [poNumber, setPoNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [invoices, setInvoices] = useState([]); // Store multiple invoices

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const invoiceData = {
        vendor_name: vendorName,
        invoice_number: invoiceNumber,
        status,
        net_amount: netAmount,
        invoice_date: invoiceDate,
        due_date: dueDate,
        department,
        po_number: poNumber,
      };
      // Send each invoice data to the server
      const response = await axios.post('/api/invoices', invoiceData);
      console.log(response);
      setSuccessMessage('Invoice successfully added!'); // Set success message
      setInvoices([...invoices, invoiceData]); // Add the invoice to the list of invoices
      clearForm(); // Clear the form for new input
    } catch (err) {
      console.log(err);
    }
  };

  const clearForm = () => {
    setVendorName('');
    setInvoiceNumber('');
    setStatus('');
    setNetAmount('');
    setInvoiceDate('');
    setDueDate('');
    setDepartment('');
    setPoNumber('');
  };

  const handleClose = () => {
    // Handle the close action, e.g., save or finalize invoices
    console.log('Finalizing the invoices:', invoices);
    setInvoices([]); // Optionally clear the invoices list after closing
  };

  return (
    <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Create Invoice</h1>
      </div>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 p-4 mb-4 rounded">
          {successMessage}
        </div>
      )}

      <form className="space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Vendor Name</label>
          <input
            type="text"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            placeholder="Enter vendor name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Invoice Number</label>
          <input
            type="text"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            placeholder="Enter invoice number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select status</option>
            <option value="Open">Open</option>
            <option value="Awaiting Approval">Awaiting Approval</option>
            <option value="Approved">Approved</option>
            <option value="Processing">Processing</option>
            <option value="Paid">Paid</option>
            <option value="Rejected">Rejected</option>
            <option value="Vendor Not Found">Vendor Not Found</option>
            <option value="Duplicate">Duplicate</option>
            <option value="Void">Void</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Net Amount</label>
          <input
            type="number"
            value={netAmount}
            onChange={(e) => setNetAmount(e.target.value)}
            placeholder="Enter net amount"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Invoice Date</label>
          <input
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Enter department"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">PO Number</label>
          <input
            type="text"
            value={poNumber}
            onChange={(e) => setPoNumber(e.target.value)}
            placeholder="Enter PO number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="col-span-2 flex justify-between">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-medium text-sm rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Invoice
          </button>
          {/* <button
            type="button"
            onClick={handleClose}
            className="w-full py-2 px-4 bg-red-500 text-white font-medium text-sm rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Close and Save
          </button> */}
        </div>
      </form>
    </div>
  );
}
