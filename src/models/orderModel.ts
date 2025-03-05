import mongoose, { Schema } from 'mongoose';

const OrderSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bookIds: [{ type: Schema.Types.ObjectId, ref: 'Book', required: true }],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending' },
});

export const Order = mongoose.model('Order', OrderSchema);