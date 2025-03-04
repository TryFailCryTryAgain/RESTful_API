import mongoose, { Schema, Document } from 'mongoose';

// Define the Book schema
const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String },
  publishedDate: { type: Date },
});

// Define the User schema
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
});

// Define the Order schema
const OrderSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bookIds: [{ type: Schema.Types.ObjectId, ref: 'Book', required: true }],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending' },
});

// Define the Review schema
const ReviewSchema: Schema = new Schema({
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  date: { type: Date, default: Date.now },
});

// Create models from the schemas
export const Book = mongoose.model('Book', BookSchema);
export const User = mongoose.model('User', UserSchema);
export const Order = mongoose.model('Order', OrderSchema);
export const Review = mongoose.model('Review', ReviewSchema);