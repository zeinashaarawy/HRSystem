import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { payrollRuns } from './payrollRuns.schema';
import { PaySlipPaymentStatus } from '../enums/payroll-execution-enum';

export type PayslipDocument = HydratedDocument<paySlip>;

// Simplified payslip document that does not depend on other subsystems' schemas.
// We keep the structure flexible using Mixed types so this standalone module can run independently.
@Schema({ timestamps: true })
export class paySlip {
  // Reference Employee by collection name string instead of importing the full employee-profile schema
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'EmployeeProfile' })
  employeeId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.ObjectId, ref: payrollRuns.name, required: true })
  payrollRunId: mongoose.Types.ObjectId;

  // Earnings and deductions are stored as arbitrary JSON blobs for now
  @Prop({ type: mongoose.Schema.Types.Mixed })
  earningsDetails: Record<string, any>;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  deductionsDetails: Record<string, any>;

  @Prop({ required: true })
  totalGrossSalary: number;

  @Prop({ required: true })
  totaDeductions?: number;

  @Prop({ required: true })
  netPay: number;

  @Prop({
    type: String,
    enum: PaySlipPaymentStatus,
    default: PaySlipPaymentStatus.PENDING,
  })
  paymentStatus: PaySlipPaymentStatus; // in case we have bank integration in future
}

export const paySlipSchema = SchemaFactory.createForClass(paySlip);