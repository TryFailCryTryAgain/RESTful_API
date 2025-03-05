import mongoose, { Schema } from 'mongoose';

export interface Orders extends Document {
  userId: mongoose.Types.ObjectId;
  bookIds: mongoose.Types.ObjectId[];
  totalAmount: number;
  orderDate: Date;
  status: string;
}

const OrderSchema: Schema = new Schema<Orders>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bookIds: [{ type: Schema.Types.ObjectId, ref: 'Book', required: true }],
  totalAmount: { type: Number },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending' },
});

export const Order = mongoose.model<Orders>('Order', OrderSchema);