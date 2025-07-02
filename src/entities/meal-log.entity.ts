import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { MealPlan } from './meal-plan.entity';

@Entity()
export class MealLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => MealPlan)
  mealPlan: MealPlan;

  @CreateDateColumn()
  timestamp: Date;
}
