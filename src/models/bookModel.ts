import mongoose, { Schema, model, Document } from 'mongoose';

export interface Books extends Document {
    title: string;
    author: string;
    genre: string;
    price: Number;
    stock: Number;
    description: string;
    publishedDate: Date;
}

const BookSchema: Schema = new Schema<Books>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    description: { type: String },
    publishedDate: { type: Date },
  });
  

export const Book = model<Books>('Book', BookSchema, 'books');