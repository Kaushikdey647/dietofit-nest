import { IsInt, IsString, IsArray, IsDateString, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class FoodItemDto {
  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  kcal: number;
}

export class CreateMealLogDto {
  @IsInt()
  user: number;

  @IsString()
  mealType: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FoodItemDto)
  foods: FoodItemDto[];

  @IsDateString()
  date: string;
}
