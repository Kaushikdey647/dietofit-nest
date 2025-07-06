// src/metrics/metrics.service.ts
import { Injectable } from '@nestjs/common';
import { MetricsRepository } from '../repositories/metrics.repository';
import { IMetricRecord } from '../interfaces/metric-record.interface';
import { MetricRecord } from '../entities/metric-record.entity';

@Injectable()
export class MetricsService {
  constructor(private readonly metricsRepo: MetricsRepository) {}

  async addMetric(
    body: Partial<IMetricRecord & { [key: string]: any }>,
  ): Promise<void> {
    // Convert DTO/body to a MetricRecord instance for type safety
    const record = Object.assign(new MetricRecord(), body);
    MetricRecord.buildAll(record);
    await this.metricsRepo.create(record);
  }

  async getUserMetrics(userId: number | string) {
    return this.metricsRepo.findAll(userId);
  }
}
