import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class PayrollException extends Document {
  @Prop({ type: Types.ObjectId, ref: 'PayrollRun', required: true })
  payrollRunId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'PayrollRunEmployee', required: true })
  employeeRecordId: Types.ObjectId;

  @Prop({
    enum: [
      'MissingBankAccount',
      'NegativeNetPay',
      'SuddenSalarySpike',
      'Other'
    ],
    required: true
  })
  type: string;

  @Prop() message: string;

  @Prop({
    enum: ['Detected','Resolved'],
    default: 'Detected'
  })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User' }) resolvedBy?: Types.ObjectId;
  @Prop({ type: Date }) resolvedAt?: Date;
}
export const PayrollExceptionSchema =
  SchemaFactory.createForClass(PayrollException);
