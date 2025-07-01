import { Schema, Types } from 'mongoose';

export const MetricRecordSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  age: Number,
  weight: Number,
  height: Number,
  fatMass: Number,
  lbm: Number,
  smm: Number,
  waterPercent: Number,
  timestamp: { type: Date, default: Date.now },
});

export interface MetricRecordDocument {
  _id: string;
  user: string;
  age: number;
  weight: number;
  height: number;
  fatMass?: number;
  lbm?: number;
  smm?: number;
  waterPercent?: number;
  timestamp: Date;
}
