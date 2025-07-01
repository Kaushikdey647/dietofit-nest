import { IsInt, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class CreateChecklistDto {
  @IsInt()
  user: number;

  @IsNumber()
  waterIntake: number;

  @IsBoolean()
  exerciseDone: boolean;

  @IsBoolean()
  mealFollowed: boolean;

  @IsDateString()
  date: string;
}
