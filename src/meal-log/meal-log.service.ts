import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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
    if (!user) throw new NotFoundException('User not found');
    try {
      const mealLog = this.mealLogRepo.create({ ...log, user });
      return await this.mealLogRepo.save(mealLog);
    } catch (e) {
      throw new BadRequestException('Failed to create meal log');
    }
  }

  async findByUser(userId: number): Promise<MealLog[]> {
    try {
      return await this.mealLogRepo.find({
        where: { user: { id: userId } },
        order: { timestamp: 'DESC' },
      });
    } catch (e) {
      throw new BadRequestException('Failed to fetch meal logs');
    }
  }

  async findOne(id: number): Promise<MealLog | null> {
    const log = await this.mealLogRepo.findOne({ where: { id } });
    if (!log) throw new NotFoundException('Meal log not found');
    return log;
  }

  async remove(id: number): Promise<void> {
    const result = await this.mealLogRepo.delete(id);
    if (!result.affected) throw new NotFoundException('Meal log not found');
  }
}
