// Dashboard.js
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

export default function Dashboard() {
  const [showFillvoice, setShowFillvoice] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [allInvoices, setAllInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedAction, setSelectedAction] = useState("");
  const [updatedInvoice, setUpdatedInvoice] = useState({});
  const [isEditing, setIsEditing] = useState(false); // Track if we are in edit mode
  
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch("/api/invoices");
        const data = await response.json();
        setInvoices(data.invoices);
        setAllInvoices(data.invoices);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching invoices:", error);
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  useEffect(() => {
    if (statusFilter) {
      setInvoices(allInvoices.filter((invoice) => invoice.status === statusFilter));
    } else {
      setInvoices(allInvoices);
    }
  }, [statusFilter, allInvoices]);

  const handleCreateInvoiceClick = () => {
    setShowFillvoice(true);
  };

  const handleCloseFillvoice = () => {
    setShowFillvoice(false);
    window.location.reload(); // Reload the page when the "Close" button is clicked
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const handleActionChange = (e, invoice) => {
    setSelectedInvoice(invoice);
    setSelectedAction(e.target.value);
    if (e.target.value === "Update") {
      setUpdatedInvoice(invoice); // Set the invoice to be updated
      setIsEditing(true); // Enable editing mode
    }
  };

  const handleFieldChange = (field, value) => {
    setUpdatedInvoice((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  
  const handleApplyAction = async () => {
    // Ensure the status field is valid before proceeding (only for "Update")
    if (selectedAction === "Update" && (!updatedInvoice.status || !['Open', 'Awaiting Approval', 'Paid', 'Rejected'].includes(updatedInvoice.status))) {
      alert("Please select a valid status.");
      return;
    }
  
    if (selectedAction === "Update" && updatedInvoice) {
      try {
        const updatedData = { ...updatedInvoice, id: selectedInvoice._id };
  
        const response = await fetch(`/api/invoices?id=${selectedInvoice._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });
  
        const result = await response.json();
        console.log(result);  // Debug the response from the server
        if (result.message === "Invoice updated successfully.") {
          setInvoices(
            invoices.map((invoice) =>
              invoice._id === selectedInvoice._id ? { ...invoice, ...updatedInvoice } : invoice
            )
          );
          alert("Invoice updated successfully.");
          setIsEditing(false); // Exit edit mode
        } else {
          alert("Error updating invoice.");
        }
      } catch (error) {
        console.error("Error updating invoice:", error);
        alert("Error updating invoice.");
      }
    } else if (selectedAction === "Delete" && selectedInvoice) {
      try {
        const response = await fetch(`/api/invoices?id=${selectedInvoice._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const result = await response.json();
        console.log(result);  // Debug the response from the server
        if (result.message === "Invoice deleted successfully.") {
          setInvoices(invoices.filter((invoice) => invoice._id !== selectedInvoice._id));
          alert("Invoice deleted successfully.");
        } else {
          alert("Error deleting invoice.");
        }
      } catch (error) {
        console.error("Error deleting invoice:", error);
        alert("Error deleting invoice.");
      }
    }
  };
  
  
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onCreateInvoiceClick={handleCreateInvoiceClick} />
      <MainContent
        showFillvoice={showFillvoice}
        handleCloseFillvoice={handleCloseFillvoice}
        invoices={invoices}
        loading={loading}
        statusFilter={statusFilter}
        handleStatusFilterChange={handleStatusFilterChange}
        selectedInvoice={selectedInvoice}
        selectedAction={selectedAction}
        handleActionChange={handleActionChange}
        handleApplyAction={handleApplyAction}
        isEditing={isEditing}
        updatedInvoice={updatedInvoice}
        handleFieldChange={handleFieldChange}
      />
    </div>
  );
}
