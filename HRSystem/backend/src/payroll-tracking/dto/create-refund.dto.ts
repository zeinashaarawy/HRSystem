import { IsMongoId, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class RefundDetailsDto {
  @IsString()
  description: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  amount: number;
}

export class CreateRefundDto {
  @IsOptional()
  @IsOptional()
  @IsString()
  claimId?: string;

  @IsOptional()
  @IsString()
  disputeId?: string;

  @IsMongoId()
  employeeId: string;

  @IsOptional()
  @IsMongoId()
  financeStaffId?: string;

  @ValidateNested()
  @Type(() => RefundDetailsDto)
  refundDetails: RefundDetailsDto;
}