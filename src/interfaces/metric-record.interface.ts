// Interface for MetricRecord (Postgres)
export interface IMetricRecord {
  id: number;
  user: number; // user id
  age: number;
  weight: number;
  height: number;
  fatMass?: number;
  lbm?: number;
  smm?: number;
  waterPercent?: number;
  timestamp: Date;
}

// Interface for MetricRecord (Mongo)
export interface IMetricRecordMongo {
  _id: string;
  user: string; // user _id
  age: number;
  weight: number;
  height: number;
  fatMass?: number;
  lbm?: number;
  smm?: number;
  waterPercent?: number;
  timestamp: Date;
}
