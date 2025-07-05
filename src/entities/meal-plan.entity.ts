import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { MealPlanTable } from './meal-plan-table.entity';
import { User } from './user.entity';

export enum MealType {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
}

@Entity()
export class MealPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MealPlanTable, (table) => table.mealPlans)
  mealPlanTable: MealPlanTable;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'enum', enum: MealType })
  meal: MealType;

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

  @Column('float')
  calories: number;

  @Column('float')
  fats: number;

  @Column('float')
  carbs: number;

  @Column('float')
  fibers: number;

  @Column('float')
  vitamins: number;

  @Column('float')
  protein: number;

  @Column('simple-json')
  items: string[];

  @Column({ type: 'timestamp', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;
}
