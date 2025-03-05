import mongoose, { Schema } from 'mongoose';

export interface Reviews extends Document {
    bookId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    rating: number;
    comment: String;
    date: Date;
}

const ReviewSchema: Schema = new Schema<Reviews>({
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 10 },
    comment: { type: String },
    date: { type: Date, default: Date.now },
});

export const Review = mongoose.model<Reviews>('Review', ReviewSchema);