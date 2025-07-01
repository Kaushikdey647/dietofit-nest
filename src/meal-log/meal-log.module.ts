import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealLog } from '../entities/meal-log.entity';
import { User } from '../entities/user.entity';
import { MealLogService } from './meal-log.service';
import { MealLogController } from './meal-log.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MealLog, User])],
  providers: [MealLogService],
  controllers: [MealLogController],
  exports: [MealLogService],
})
export class MealLogModule {}
