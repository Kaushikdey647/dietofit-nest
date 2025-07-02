import { Controller, Post, Get, Param, Body, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ChecklistService } from './checklist.service';
import { IChecklist } from '../interfaces/checklist.interface';

@Controller('checklist')
export class ChecklistController {
  constructor(private readonly checklistService: ChecklistService) {}

  @Post(':userId')
  async create(@Param('userId') userId: number, @Body() body: IChecklist) {
    try {
      return await this.checklistService.create({ ...body, user: userId });
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':userId')
  async findByUser(@Param('userId') userId: number) {
    try {
      return await this.checklistService.findByUser(userId);
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      return await this.checklistService.remove(id);
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.BAD_REQUEST);
    }
  }
}
