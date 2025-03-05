import mongoose, { Schema } from 'mongoose';
export interface Users extends Document {
    _id: mongoose.Types.ObjectId;
    first_name: string;
    last_name: string;
    phone: Number;
    email: string;
    password: string;
    adress: string;
    ZIP: number;
}

const UserSchema: Schema = new Schema<Users>({
    _id: { type: Schema.Types.ObjectId, auto:true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    adress: { type: String },
    ZIP: { type: Number },
  });

export const User = mongoose.model<Users>('User', UserSchema, 'users');