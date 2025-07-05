import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { MealPlan } from './meal-plan.entity';

@Entity()
export class MealPlanTable {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => MealPlan, (mealPlan) => mealPlan.mealPlanTable, {
    cascade: true,
  })
  mealPlans: MealPlan[];
}
