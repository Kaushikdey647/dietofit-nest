export interface IChecklist {
  id?: number;
  user: number;
  waterIntake: number;
  exerciseDone: boolean;
  mealFollowed: boolean;
  date: string;
  createdAt?: Date;
}
