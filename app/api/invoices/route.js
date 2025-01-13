import connectionToDatabase from "@/lib/mongoose";
import Invoice from "@/models/Invoice";
import { NextResponse } from "next/server";

// POST: Create a new invoice
export async function POST(req) {
  try {
    await connectionToDatabase();

    const { vendor_name, invoice_number, status, net_amount, invoice_date, due_date, department, po_number } = await req.json();

    if (!vendor_name || !invoice_number || !status || !net_amount || !invoice_date || !due_date || !department || !po_number) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Validate the status field
    const validStatuses = ['Open', 'Awaiting Approval', 'Paid', 'Rejected'];  // Define the valid statuses
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status provided." }, { status: 400 });
    }

    const newInvoice = new Invoice({
      vendor_name,
      invoice_number,
      status,
      net_amount,
      invoice_date,
      due_date,
      department,
      po_number,
      created_time: new Date(), // Store as Date object
    });

    await newInvoice.save();

    return NextResponse.json({ message: "Invoice created successfully.", invoice: newInvoice }, { status: 201 });
  } catch (err) {
    console.error("Error saving invoice:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}


// GET: Fetch all invoices with filtering and pagination
export async function GET(req) {
  try {
    await connectionToDatabase();

    // Extract pagination parameters from the query string
    const { search, status, vendor_name, invoice_number, page = 1, limit = 10 } = req.nextUrl.searchParams;

    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 20);

    // Calculate the number of invoices to skip
    const skip = (pageNumber - 1) * limitNumber;

    // Build the query object for filtering
    let query = {};

    // Filter based on status, vendor_name, and invoice_number (if provided)
    if (status) query.status = status;
    if (vendor_name) query.vendor_name = { $regex: vendor_name, $options: "i" }; // case-insensitive search
    if (invoice_number) query.invoice_number = invoice_number;

    // If there's a search term, perform a search across relevant fields
    if (search) {
      query = {
        ...query,
        $or: [
          { vendor_name: { $regex: search, $options: "i" } },
          { invoice_number: { $regex: search, $options: "i" } },
        ],
      };
    }

    // Find the invoices with pagination
    const invoices = await Invoice.find(query)
      .skip(skip)
      .limit(limitNumber)
      .sort({ created_time: -1 }); // Optional: sort by creation time

    // Get the total count of invoices matching the query (for pagination)
    const totalInvoices = await Invoice.countDocuments(query);

    // Calculate total pages
    const totalPages = Math.ceil(totalInvoices / limitNumber);

    return NextResponse.json({
      invoices,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalInvoices,
        pageSize: limitNumber,
      },
    });
  } catch (err) {
    console.error("Error fetching invoices:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}


// DELETE: Delete an invoice by ID, vendor_name, or invoice_number
export async function DELETE(req) {
  try {
    await connectionToDatabase();

    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const vendor_name = url.searchParams.get("vendor_name");
    const invoice_number = url.searchParams.get("invoice_number");

    // Check if at least one parameter is provided
    if (!id && !vendor_name && !invoice_number) {
      return NextResponse.json(
        { error: "Please provide 'id', 'vendor_name', or 'invoice_number' to delete." },
        { status: 400 }
      );
    }

    // Build the query based on provided parameters
    const query = {};
    if (id) query._id = id; // Delete by ID
    if (vendor_name) query.vendor_name = { $regex: vendor_name, $options: "i" }; // Delete by vendor name (case-insensitive)
    if (invoice_number) query.invoice_number = invoice_number; // Delete by invoice number

    // Find and delete the matching invoice(s)
    const result = await Invoice.deleteMany(query);

    // Check if any invoices were deleted
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "No matching invoices found to delete." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Invoice(s) deleted successfully.", deletedCount: result.deletedCount },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting invoice:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    // Ensure the database connection is established
    await connectionToDatabase();

    // Parse incoming request JSON
    const { id, invoice_number, vendor_name, status, net_amount, invoice_date, due_date, department, po_number } = await req.json();

    // Ensure at least one identifier (id or invoice_number) is provided
    if (!id && !invoice_number) {
      return NextResponse.json({ error: "Either 'id' or 'invoice_number' is required for updating." }, { status: 400 });
    }

    // Ensure at least one field is being updated
    if (!vendor_name && !status && !net_amount && !invoice_date && !due_date && !department && !po_number) {
      return NextResponse.json({ error: "At least one field must be provided to update the invoice." }, { status: 400 });
    }

    // Find the invoice by ID or invoice_number
    const query = id ? { _id: id } : { invoice_number };
    const existingInvoice = await Invoice.findOne(query);

    // If no invoice found, return an error
    if (!existingInvoice) {
      return NextResponse.json({ error: `Invoice not found using ${id ? "ID" : "invoice_number"}.` }, { status: 404 });
    }

    // Validate status if provided
    const validStatuses = [
      'Open', 
      'Awaiting Approval', 
      'Approved', 
      'Processing', 
      'Paid', 
      'Rejected', 
      'Vendor Not Found', 
      'Duplicate', 
      'Void'
    ];

    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status provided." }, { status: 400 });
    }

    // Validate unique invoice_number if updating (only if it's different)
    if (invoice_number && invoice_number !== existingInvoice.invoice_number) {
      const duplicateInvoice = await Invoice.findOne({ invoice_number });
      if (duplicateInvoice) {
        return NextResponse.json({ error: "Invoice number already exists." }, { status: 400 });
      }
    }

    // Update the invoice fields if provided
    if (vendor_name) existingInvoice.vendor_name = vendor_name;
    if (status) existingInvoice.status = status;
    if (net_amount) existingInvoice.net_amount = net_amount;
    if (invoice_date) existingInvoice.invoice_date = invoice_date;
    if (due_date) existingInvoice.due_date = due_date;
    if (department) existingInvoice.department = department;
    if (po_number) existingInvoice.po_number = po_number;

    // Save the updated invoice
    await existingInvoice.save();

    // Return success response
    return NextResponse.json({ message: "Invoice updated successfully.", invoice: existingInvoice }, { status: 200 });
  } catch (err) {
    console.error("Error updating invoice:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
