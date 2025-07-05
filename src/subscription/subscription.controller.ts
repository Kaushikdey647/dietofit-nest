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
import { SubscriptionService } from './subscription.service';
import { ISubscription } from '../interfaces/subscription.interface';

interface ServiceError {
  message: string;
  status?: number;
}

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  private handleError(e: unknown): never {
    if (typeof e === 'object' && e !== null && 'message' in e) {
      const err = e as ServiceError;
      const status =
        typeof err.status === 'number' ? err.status : HttpStatus.BAD_REQUEST;
      throw new HttpException(err.message, status);
    }
    throw new HttpException(
      'Unexpected error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Post(':userId')
  async create(
    @Param('userId') userId: number,
    @Body() body: ISubscription,
  ): Promise<any> {
    try {
      return await this.subscriptionService.create({ ...body, user: userId });
    } catch (e) {
      this.handleError(e);
    }
  }

  @Get(':userId')
  async findByUser(@Param('userId') userId: number): Promise<any> {
    try {
      return await this.subscriptionService.findByUser(userId);
    } catch (e) {
      this.handleError(e);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    try {
      return await this.subscriptionService.remove(id);
    } catch (e) {
      this.handleError(e);
    }
  }
}
