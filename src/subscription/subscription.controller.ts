import { Controller, Post, Get, Param, Body, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { ISubscription } from '../interfaces/subscription.interface';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post(':userId')
  async create(@Param('userId') userId: number, @Body() body: ISubscription) {
    try {
      return await this.subscriptionService.create({ ...body, user: userId });
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':userId')
  async findByUser(@Param('userId') userId: number) {
    try {
      return await this.subscriptionService.findByUser(userId);
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      return await this.subscriptionService.remove(id);
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.BAD_REQUEST);
    }
  }
}
