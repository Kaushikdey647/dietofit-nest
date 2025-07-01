import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricsModule } from './metrics/metrics.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { MetricRecord } from './entities/metric-record.entity';
import { MealLog } from './entities/meal-log.entity';
import { MealPlan } from './entities/meal-plan.entity';
import { Checklist } from './entities/checklist.entity';
import { Subscription } from './entities/subscription.entity';
import { MealLogModule } from './meal-log/meal-log.module';
import { MealPlanModule } from './meal-plan/meal-plan.module';
import { ChecklistModule } from './checklist/checklist.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: +(process.env.POSTGRES_PORT || 5432),
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DB || 'fitdb',
      entities: [User, MetricRecord, MealLog, MealPlan, Checklist, Subscription],
      synchronize: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/fitdb'),
    MetricsModule,
    MealLogModule,
    MealPlanModule,
    ChecklistModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

