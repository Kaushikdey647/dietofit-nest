import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { CreateMetricRecordDto } from '../dtos/create-metric-record.dto';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Post()
  async addMetric(@Body() body: CreateMetricRecordDto) {
    await this.metricsService.addMetric(body);
    return { success: true };
  }

  @Get(':userId')
  async getUserMetrics(@Param('userId') userId: string) {
    return this.metricsService.getUserMetrics(userId);
  }
}
