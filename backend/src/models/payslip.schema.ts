import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Payslip {
  @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
  employeeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'PayrollRecord' })
  payrollRecordId: Types.ObjectId;

  @Prop({ required: true })
  periodStart: Date;

  @Prop({ required: true })
  periodEnd: Date;

  @Prop({ required: true })
  grossSalary: number;

  @Prop({ required: true })
  netSalary: number;

  @Prop({ default: 0 })
  totalAllowances: number;

  @Prop({ default: 0 })
  totalDeductions: number;

  @Prop({ default: 0 })
  totalTax: number;

  @Prop({ default: 0 })
  totalInsurance: number;

  @Prop({
    enum: ['GENERATED', 'PUBLISHED', 'LOCKED'],
    default: 'GENERATED',
  })
  status: 'GENERATED' | 'PUBLISHED' | 'LOCKED';

  @Prop()
  viewedAt?: Date;

  @Prop({ default: 0 })
  downloadCount: number;
}

export const PayslipSchema = SchemaFactory.createForClass(Payslip);