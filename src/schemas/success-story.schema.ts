import { Schema, Document } from 'mongoose';

export const SuccessStorySchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  achievement: { type: String, required: true },
  image: { type: String, required: true },
});

export interface SuccessStory {
  name: string;
  age: number;
  gender: string;
  achievement: string;
  image: string;
}

export type SuccessStoryDocument = SuccessStory & Document;