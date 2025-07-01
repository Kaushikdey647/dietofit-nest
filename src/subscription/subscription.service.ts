import { Injectable } from '@nestjs/common';
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
    if (!user) throw new Error('User not found');
    const subscription = this.subscriptionRepo.create({ ...sub, user });
    return this.subscriptionRepo.save(subscription);
  }

  async findByUser(userId: number): Promise<Subscription[]> {
    return this.subscriptionRepo.find({ where: { user: { id: userId } }, order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<Subscription | null> {
    return this.subscriptionRepo.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.subscriptionRepo.delete(id);
  }
}
