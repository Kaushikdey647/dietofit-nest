// src/metrics/mapReduce/mapreduce.interface.ts
export interface DerivedMetrics {
  userId: string;
  derived: {
    bmi: number;
    fatMass: number;
    leanBodyMass: number;
    muscleMassEstimate: number;
    bodyWater: number;
    boneMass: number;
    visceralFatRating: number;
    subcutaneousFat: number;
  };
}
