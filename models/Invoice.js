import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
  vendor_name: { type: String, required: true },
  invoice_number: { type: String, required: true, unique: true },
  status: { type: String, required: true, enum: ['Open', 'Awaiting Approval', 'Paid', 'Rejected'] },
  net_amount: { type: Number, required: true },
  invoice_date: { type: Date, required: true },
  due_date: { type: Date, required: true },
  department: { type: String, required: true },
  po_number: { type: String, required: true },
  created_time: { type: Date, default: Date.now },
});

export default mongoose.models.Invoice || mongoose.model('Invoice', InvoiceSchema);
