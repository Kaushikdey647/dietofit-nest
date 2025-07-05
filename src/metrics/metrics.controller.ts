import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Post()
  async addMetric(
    @Body()
    body: {
      userId: number | string;
      age: number;
      weight: number;
      height: number;
    },
  ) {
    await this.metricsService.addMetric(
      body.userId,
      body.age,
      body.weight,
      body.height,
    );
    return { success: true };
  }

  @Get(':userId')
  async getUserMetrics(@Param('userId') userId: string) {
    return this.metricsService.getUserMetrics(userId);
  }
}
