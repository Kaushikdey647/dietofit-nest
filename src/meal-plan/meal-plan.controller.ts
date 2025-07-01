import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { MealPlanService } from './meal-plan.service';
import { IMealPlan } from '../interfaces/meal-plan.interface';

@Controller('meal-plan')
export class MealPlanController {
  constructor(private readonly mealPlanService: MealPlanService) {}

  @Post(':userId')
  async create(@Param('userId') userId: number, @Body() body: IMealPlan) {
    return this.mealPlanService.create({ ...body, user: userId });
  }

  @Get(':userId')
  async findByUser(@Param('userId') userId: number) {
    return this.mealPlanService.findByUser(userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.mealPlanService.remove(id);
  }
}
