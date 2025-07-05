import { Module } from '@nestjs/common';
import { HealthzController } from './healthz.controller';
import { HealthzService } from './healthz.service';
import { TypeOrmDriver } from '../drivers/typeorm.driver';
import { MongooseDriver } from '../drivers/mongoose.driver';
import { DataSource } from 'typeorm';
import 'dotenv/config';

@Module({
  controllers: [HealthzController],
  providers: [
    {
      provide: 'DATABASE_DRIVERS',
      useFactory: (dataSource: DataSource) => [
        new TypeOrmDriver(dataSource),
        new MongooseDriver(
          process.env.MONGO_URI || 'mongodb://localhost:27017/fitdb',
        ),
      ],
      inject: [DataSource],
    },
    {
      provide: HealthzService,
      useFactory: (drivers) => new HealthzService(drivers),
      inject: ['DATABASE_DRIVERS'],
    },
  ],
  exports: [HealthzService],
})
export class HealthzModule {}
