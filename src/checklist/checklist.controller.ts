import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { ChecklistService } from './checklist.service';
import { IChecklist } from '../interfaces/checklist.interface';

@Controller('checklist')
export class ChecklistController {
  constructor(private readonly checklistService: ChecklistService) {}

  @Post(':userId')
  async create(@Param('userId') userId: number, @Body() body: IChecklist) {
    return this.checklistService.create({ ...body, user: userId });
  }

  @Get(':userId')
  async findByUser(@Param('userId') userId: number) {
    return this.checklistService.findByUser(userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.checklistService.remove(id);
  }
}
