// src/metrics/metrics.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { mapFunction } from './mapReduce/map.function';
import { reduceFunction } from './mapReduce/reduce.function';

@Injectable()
export class MetricsService {
  constructor(
    @InjectModel('UserMetrics') private readonly metricsModel: Model<any>,
  ) {}

  async runMapReduce(): Promise<any> {
    return this.metricsModel.mapReduce({
      map: mapFunction,
      reduce: reduceFunction,
      out: { inline: 1 }, // or { replace: 'derived_metrics' }
    });
  }
}
