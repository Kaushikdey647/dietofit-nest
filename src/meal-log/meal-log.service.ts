import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MealLog } from '../entities/meal-log.entity';
import { IMealLog } from '../interfaces/meal-log.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class MealLogService {
  constructor(
    @InjectRepository(MealLog)
    private readonly mealLogRepo: Repository<MealLog>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(log: IMealLog): Promise<MealLog> {
    const user = await this.userRepo.findOne({ where: { id: log.user } });
    if (!user) throw new Error('User not found');
    const mealLog = this.mealLogRepo.create({ ...log, user });
    return this.mealLogRepo.save(mealLog);
  }

  async findByUser(userId: number): Promise<MealLog[]> {
    return this.mealLogRepo.find({ where: { user: { id: userId } }, order: { date: 'DESC' } });
  }

  async findOne(id: number): Promise<MealLog | null> {
    return this.mealLogRepo.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.mealLogRepo.delete(id);
  }
}
