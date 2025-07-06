import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MealPlanService } from './meal-plan.service';
import { IMealPlan } from '../interfaces/meal-plan.interface';

@Controller('meal-plan')
export class MealPlanController {
  constructor(private readonly mealPlanService: MealPlanService) {}

  @Post(':userId')
  async create(@Param('userId') userId: number, @Body() body: IMealPlan) {
    try {
      return await this.mealPlanService.create({ ...body, user: userId });
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'message' in e) {
        const err = e as { message: string; status?: number };
        throw new HttpException(
          err.message,
          typeof err.status === 'number' ? err.status : HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException('Unknown error', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':userId')
  async findByUser(@Param('userId') userId: number) {
    try {
      return await this.mealPlanService.findByUser(userId);
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'message' in e) {
        const err = e as { message: string; status?: number };
        throw new HttpException(
          err.message,
          typeof err.status === 'number' ? err.status : HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException('Unknown error', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      return await this.mealPlanService.remove(id);
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'message' in e) {
        const err = e as { message: string; status?: number };
        throw new HttpException(
          err.message,
          typeof err.status === 'number' ? err.status : HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException('Unknown error', HttpStatus.BAD_REQUEST);
    }
  }
}
