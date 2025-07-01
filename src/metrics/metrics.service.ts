// src/metrics/metrics.service.ts
import { Injectable } from '@nestjs/common';
import { MetricsRepository } from '../repositories/metrics.repository';
import { IMetricRecord } from '../interfaces/metric-record.interface';

@Injectable()
export class MetricsService {
  constructor(private readonly metricsRepo: MetricsRepository) {}

  async addMetric(
    userId: number | string,
    age: number,
    weight: number,
    height: number,
  ): Promise<void> {
    // Derived metrics
    const fatMass = weight * 0.2; // Example
    const lbm = weight - fatMass;
    const smm = lbm * 0.5;
    const waterPercent = 60;
    const record: Partial<IMetricRecord> = {
      user: userId as any,
      age,
      weight,
      height,
      fatMass,
      lbm,
      smm,
      waterPercent,
      timestamp: new Date(),
    };
    await this.metricsRepo.create(record);
  }

  async getUserMetrics(userId: number | string) {
    return this.metricsRepo.findAll(userId);
  }
}
