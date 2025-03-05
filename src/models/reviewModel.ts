import mongoose, { Schema } from 'mongoose';

const ReviewSchema: Schema = new Schema({
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    date: { type: Date, default: Date.now },
});

export const Review = mongoose.model('Review', ReviewSchema);