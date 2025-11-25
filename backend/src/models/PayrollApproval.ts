import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class PayrollApproval extends Document {
  @Prop({ type: Types.ObjectId, ref: 'PayrollRun', required: true })
  payrollRunId: Types.ObjectId;

  @Prop({
    enum: ['PayrollSpecialist','PayrollManager','FinanceStaff'],
    required: true
  })
  role: string;

  @Prop({
    enum: ['Pending','Approved','Rejected'],
    default: 'Pending'
  })
  status: string;

  @Prop() reason?: string;

  @Prop({ type: Types.ObjectId, ref: 'User' }) decidedBy?: Types.ObjectId;
  @Prop({ type: Date }) decidedAt?: Date;
}
export const PayrollApprovalSchema =
  SchemaFactory.createForClass(PayrollApproval);
