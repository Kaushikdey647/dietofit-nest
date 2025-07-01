export interface IMealLog {
  id?: number;
  user: number;
  mealType: string;
  foods: Array<{ name: string; quantity: number; kcal: number }>;
  date: string;
  createdAt?: Date;
}
