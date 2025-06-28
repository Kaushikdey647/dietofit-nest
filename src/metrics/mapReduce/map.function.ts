// src/metrics/mapReduce/map.function.ts
export const mapFunction = function () {
  const bmi = this.weight / Math.pow(this.height / 100, 2);
  emit(this.userId, {
    core: {
      age: this.age,
      weight: this.weight,
      height: this.height,
      gender: this.gender,
      inches: this.inches,
      bmi: bmi,
    },
  });
};
