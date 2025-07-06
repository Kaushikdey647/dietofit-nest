import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MetricsModule } from './metrics/metrics.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MealLogModule } from './meal-log/meal-log.module';
import { MealPlanModule } from './meal-plan/meal-plan.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { typeOrmConfig } from './config/typeorm.config';
import { mongooseConfig } from './config/mongoose.config';
import { HealthzModule } from './healthz/healthz.module';
import { AuthModule } from './auth.module';
import { SuccessStoryModule } from './success-story.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MongooseModule.forRoot(mongooseConfig.uri, {
      retryAttempts: 5,
      retryDelay: 3000,
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: require('./schemas/user.schema').UserSchema },
    ]),
    MetricsModule,
    MealLogModule,
    MealPlanModule,
    SubscriptionModule,
    HealthzModule,
    AuthModule,
    SuccessStoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    try {
      await this.dataSource.query('SELECT 1');
      this.logger.log('PostgreSQL connection established.');
    } catch (err) {
      this.logger.error('Failed to connect to PostgreSQL:', err);
    }

    this.logger.log('MongoDB connection handled by MongooseModule.forRoot.');
  }
}

