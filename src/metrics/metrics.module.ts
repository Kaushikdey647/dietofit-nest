// src/metrics/metrics.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricRecord } from '../entities/metric-record.entity';
import { MetricsRepository } from '../repositories/metrics.repository';
import { MetricRecordSchema } from '../schemas/metric-record.schema';
import { User } from '../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MetricRecord, User]),
    MongooseModule.forFeature([
      { name: 'MetricRecord', schema: MetricRecordSchema },
    ]),
  ],
  controllers: [MetricsController],
  providers: [MetricsService, MetricsRepository],
})
export class MetricsModule {}
