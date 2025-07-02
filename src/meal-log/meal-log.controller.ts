import { Controller, Post, Get, Param, Body, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { MealLogService } from './meal-log.service';
import { IMealLog } from '../interfaces/meal-log.interface';

@Controller('meal-log')
export class MealLogController {
  constructor(private readonly mealLogService: MealLogService) {}

  @Post(':userId')
  async create(@Param('userId') userId: number, @Body() body: IMealLog) {
    try {
      return await this.mealLogService.create({ ...body, user: userId });
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':userId')
  async findByUser(@Param('userId') userId: number) {
    try {
      return await this.mealLogService.findByUser(userId);
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      return await this.mealLogService.remove(id);
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.BAD_REQUEST);
    }
  }
}
