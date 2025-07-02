import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { MetricRecord } from '../entities/metric-record.entity';
import { MealLog } from '../entities/meal-log.entity';
import { MealPlan } from '../entities/meal-plan.entity';
import { Checklist } from '../entities/checklist.entity';
import { Subscription } from '../entities/subscription.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: +(process.env.POSTGRES_PORT || 5432),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'fitdb',
  entities: [User, MetricRecord, MealLog, MealPlan, Checklist, Subscription],
  synchronize: true, // Set to false in production!
};
