// src/metrics/metrics.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MetricsService } from './metrics.service';
import { Schema } from 'mongoose';
import { MetricsController } from './metrics.controller';

// Basic schema for demonstration
const UserMetricsSchema = new Schema({
  userId: String,
  age: Number,
  weight: Number,
  height: Number,
  inches: Number,
  gender: String,
});

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserMetrics', schema: UserMetricsSchema },
    ]),
  ],
  controllers: [MetricsController],
  providers: [MetricsService],
})
export class MetricsModule {}
