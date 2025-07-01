import { IsInt, IsArray, IsString, IsDateString, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class PlanFoodItemDto {
  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  kcal: number;
}

class PlanEntryDto {
  @IsString()
  day: string;

  @IsString()
  mealType: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlanFoodItemDto)
  foods: PlanFoodItemDto[];
}

export class CreateMealPlanDto {
  @IsInt()
  user: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlanEntryDto)
  plan: PlanEntryDto[];

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
