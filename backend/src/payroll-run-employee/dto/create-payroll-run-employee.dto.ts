import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean, IsEnum, IsObject } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePayrollRunEmployeeDto {
  @IsNotEmpty()
  @IsString()
  payrollRunId: string;

  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @IsNotEmpty()
  @IsEnum(['Normal', 'NewHire', 'Resigned', 'Terminated'])
  employeeStatus: string;

  @IsOptional()
  @IsBoolean()
  signingBonusApplied?: boolean;

  @IsOptional()
  @IsNumber()
  signingBonusAmount?: number;

  @IsOptional()
  @IsNumber()
  resignationBenefitAmount?: number;

  @IsOptional()
  @IsNumber()
  terminationBenefitAmount?: number;

  @IsNotEmpty()
  @IsNumber()
  grossSalary: number;

  @IsOptional()
  @IsObject()
  allowances?: any;

  @IsOptional()
  @IsObject()
  taxes?: any;

  @IsOptional()
  @IsObject()
  insurance?: any;

  @IsOptional()
  @IsObject()
  deductions?: any;

  @IsNotEmpty()
  @IsNumber()
  netSalary: number;

  @IsNotEmpty()
  @IsNumber()
  finalSalary: number;

  @IsOptional()
  @IsEnum(['Draft', 'Finalized'])
  calculationStatus?: string;
}

