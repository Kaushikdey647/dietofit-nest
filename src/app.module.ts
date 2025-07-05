import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule, InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MetricsModule } from './metrics/metrics.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// ...existing code...
import { MealLogModule } from './meal-log/meal-log.module';
import { MealPlanModule } from './meal-plan/meal-plan.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { typeOrmConfig } from './config/typeorm.config';
import { mongooseConfig } from './config/mongoose.config';
import * as mongoose from 'mongoose';
import { HealthzModule } from './healthz/healthz.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MongooseModule.forRoot(
      mongooseConfig.uri || 'mongodb://localhost:27017/fitdb',
    ),
    MetricsModule,
    MealLogModule,
    MealPlanModule,
    SubscriptionModule,
    HealthzModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async onModuleInit() {
    // Check PostgreSQL connection
    try {
      await this.dataSource.query('SELECT 1');
      this.logger.log('PostgreSQL connection established.');
    } catch (err) {
      this.logger.error('Failed to connect to PostgreSQL:', err);
    }
    // Check MongoDB connection
    try {
      await mongoose.connect(
        mongooseConfig.uri || 'mongodb://localhost:27017/fitdb',
      );
      this.logger.log('MongoDB connection established.');
      await mongoose.disconnect();
    } catch (err) {
      this.logger.error('Failed to connect to MongoDB:', err);
    }
  }
}
