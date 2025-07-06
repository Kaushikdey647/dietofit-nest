import { Controller, Get, Post, Body } from '@nestjs/common';
import { SuccessStoryService } from './success-story.service';

@Controller('success-stories')
export class SuccessStoryController {
  constructor(private readonly storyService: SuccessStoryService) {}

  @Get()
  async getAll() {
    return this.storyService.findAll();
  }

  @Post()
  async create(@Body() body: { name: string; age: number; gender: string; achievement: string; image: string }) {
    return this.storyService.create(body);
  }
}
