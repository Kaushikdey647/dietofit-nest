import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

export interface UserDocument {
  _id: string;
  email: string;
  name: string;
}
