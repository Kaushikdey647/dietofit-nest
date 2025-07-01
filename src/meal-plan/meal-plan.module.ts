import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealPlan } from '../entities/meal-plan.entity';
import { User } from '../entities/user.entity';
import { MealPlanService } from './meal-plan.service';
import { MealPlanController } from './meal-plan.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MealPlan, User])],
  providers: [MealPlanService],
  controllers: [MealPlanController],
  exports: [MealPlanService],
})
export class MealPlanModule {}
