import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { MetricRecord } from '../entities/metric-record.entity';
import { MealLog } from '../entities/meal-log.entity';
import { MealPlan } from '../entities/meal-plan.entity';
import { Subscription } from '../entities/subscription.entity';
import { MealPlanTable } from 'src/entities/meal-plan-table.entity';
import 'dotenv/config';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URI,
  entities: [User, MetricRecord, MealLog, MealPlan, MealPlanTable, Subscription],
  synchronize: true, // Set to false in production!
  ssl: { rejectUnauthorized: false },
};
