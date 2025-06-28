// src/metrics/mapReduce/reduce.function.ts
export const reduceFunction = function (userId: string, values: any[]) {
  const v = values[0].core;
  const genderFactor = v.gender === 'M' ? 1 : 0;

  const fatPercentage = 1.20 * v.bmi + 0.23 * v.age - 10.8 * genderFactor - 5.4;
  const fatMass = (fatPercentage / 100) * v.weight;
  const leanBodyMass = v.weight - fatMass;
  const muscleMassEstimate = leanBodyMass * 0.5;
  const bodyWater = leanBodyMass * 0.73;
  const boneMass = v.weight * 0.15;
  const visceralFatRating = Math.max(1, Math.floor(fatMass / 4));
  const subcutaneousFat = fatMass * 0.6;

  return {
    userId,
    derived: {
      bmi: v.bmi,
      fatMass,
      leanBodyMass,
      muscleMassEstimate,
      bodyWater,
      boneMass,
      visceralFatRating,
      subcutaneousFat,
    },
  };
};
