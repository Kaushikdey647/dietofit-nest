import { IsInt, IsOptional, IsNumber } from 'class-validator';

export class CreateMetricRecordDto {
  @IsInt()
  userId: number;

  @IsNumber()
  weight: number;

  @IsNumber()
  fatMass: number;

  @IsOptional()
  @IsNumber()
  lbm?: number;

  @IsOptional()
  @IsNumber()
  smm?: number;

  @IsOptional()
  @IsNumber()
  waterPercent?: number;

  @IsOptional()
  @IsNumber()
  waistCircumference?: number;

  @IsOptional()
  @IsNumber()
  hipCircumference?: number;

  @IsOptional()
  @IsNumber()
  neckCircumference?: number;

  // If you want to allow height for BMI calculation
  @IsOptional()
  @IsNumber()
  height?: number;
}
