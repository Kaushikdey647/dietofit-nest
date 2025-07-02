import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../entities/subscription.entity';
import { ISubscription } from '../interfaces/subscription.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepo: Repository<Subscription>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(sub: ISubscription): Promise<Subscription> {
    const user = await this.userRepo.findOne({ where: { id: sub.user } });
    if (!user) throw new NotFoundException('User not found');
    try {
      const subscription = this.subscriptionRepo.create({ ...sub, user });
      return await this.subscriptionRepo.save(subscription);
    } catch (e) {
      throw new BadRequestException('Failed to create subscription');
    }
  }

  async findByUser(userId: number): Promise<Subscription[]> {
    try {
      return await this.subscriptionRepo.find({ where: { user: { id: userId } }, order: { createdAt: 'DESC' } });
    } catch (e) {
      throw new BadRequestException('Failed to fetch subscriptions');
    }
  }

  async findOne(id: number): Promise<Subscription | null> {
    const sub = await this.subscriptionRepo.findOne({ where: { id } });
    if (!sub) throw new NotFoundException('Subscription not found');
    return sub;
  }

  async remove(id: number): Promise<void> {
    const result = await this.subscriptionRepo.delete(id);
    if (!result.affected) throw new NotFoundException('Subscription not found');
  }
}
