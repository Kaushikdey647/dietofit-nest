export interface IMealPlan {
  id?: number;
  user: number;
  plan: Array<{ day: string; mealType: string; foods: Array<{ name: string; quantity: number; kcal: number }> }>;
  startDate: string;
  endDate: string;
  createdAt?: Date;
}
