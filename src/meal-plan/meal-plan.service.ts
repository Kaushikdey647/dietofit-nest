import { Injectable } from '@nestjs/common';
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
    if (!user) throw new Error('User not found');
    const mealPlan = this.mealPlanRepo.create({ ...plan, user });
    return this.mealPlanRepo.save(mealPlan);
  }

  async findByUser(userId: number): Promise<MealPlan[]> {
    return this.mealPlanRepo.find({ where: { user: { id: userId } }, order: { startDate: 'DESC' } });
  }

  async findOne(id: number): Promise<MealPlan | null> {
    return this.mealPlanRepo.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.mealPlanRepo.delete(id);
  }
}
