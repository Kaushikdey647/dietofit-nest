import { IsInt, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateSubscriptionDto {
  @IsInt()
  user: number;

  @IsString()
  planType: string;

  @IsString()
  status: string;

  @IsOptional()
  @IsDateString()
  trialEnd?: string;

  @IsOptional()
  @IsDateString()
  renewalDate?: string;
}
