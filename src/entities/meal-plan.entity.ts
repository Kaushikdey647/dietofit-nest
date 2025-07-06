import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  // OneToMany, // Removed unused import
} from 'typeorm';
import { MealPlanTable } from './meal-plan-table.entity';
import { User } from './user.entity';
import { FoodItem } from './food-item.entity';

export enum MealType {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
}

//TODO: Put away weekday and time of meal so that we dont have querying issues
//TODO: HOW WILL YOU QUERY FOR MEALS EACH DAY?
//TODO: We make a food entity(pandit)
@Entity()
export class MealPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => MealPlanTable, (table) => table.mealPlans)
  mealPlanTable: MealPlanTable;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'enum', enum: MealType })
  mealType: MealType;

  @Column({
    type: 'enum',
    enum: [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ],
  })
  weekday: string;

  @ManyToMany(() => FoodItem, { cascade: true })
  foodItems: FoodItem[];

  @Column('float')
  calories: number;

  @Column({ type: 'timestamp', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;
}
