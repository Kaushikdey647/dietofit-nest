import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { ISubscription } from '../interfaces/subscription.interface';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post(':userId')
  async create(@Param('userId') userId: number, @Body() body: ISubscription) {
    return this.subscriptionService.create({ ...body, user: userId });
  }

  @Get(':userId')
  async findByUser(@Param('userId') userId: number) {
    return this.subscriptionService.findByUser(userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.subscriptionService.remove(id);
  }
}
