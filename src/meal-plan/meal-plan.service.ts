import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MealPlan } from '../entities/meal-plan.entity';
import { IMealPlan } from '../interfaces/meal-plan.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class MealPlanService {
  constructor(
    @InjectRepository(MealPlan)
    private readonly mealPlanRepo: Repository<MealPlan>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(plan: IMealPlan): Promise<MealPlan> {
    const user = await this.userRepo.findOne({ where: { id: plan.user } });
    if (!user) throw new NotFoundException('User not found');
    try {
      const mealPlan = this.mealPlanRepo.create({ ...plan, user });
      return await this.mealPlanRepo.save(mealPlan);
    } catch (e) {
      throw new BadRequestException('Failed to create meal plan');
    }
  }

  async findByUser(userId: number): Promise<MealPlan[]> {
    try {
      return await this.mealPlanRepo.find({
        where: { user: { id: userId } },
        order: { startDate: 'DESC' },
      });
    } catch (e) {
      throw new BadRequestException('Failed to fetch meal plans');
    }
  }

  async findOne(id: number): Promise<MealPlan | null> {
    const plan = await this.mealPlanRepo.findOne({ where: { id } });
    if (!plan) throw new NotFoundException('Meal plan not found');
    return plan;
  }

  async remove(id: number): Promise<void> {
    const result = await this.mealPlanRepo.delete(id);
    if (!result.affected) throw new NotFoundException('Meal plan not found');
  }
}
