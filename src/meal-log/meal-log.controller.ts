import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { MealLogService } from './meal-log.service';
import { IMealLog } from '../interfaces/meal-log.interface';

@Controller('meal-log')
export class MealLogController {
  constructor(private readonly mealLogService: MealLogService) {}

  @Post(':userId')
  async create(@Param('userId') userId: number, @Body() body: IMealLog) {
    return this.mealLogService.create({ ...body, user: userId });
  }

  @Get(':userId')
  async findByUser(@Param('userId') userId: number) {
    return this.mealLogService.findByUser(userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.mealLogService.remove(id);
  }
}
