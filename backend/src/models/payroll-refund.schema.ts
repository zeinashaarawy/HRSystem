import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class PayrollRefund {
  @Prop({ type: Types.ObjectId, ref: 'PayrollDispute', required: true })
  disputeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
  employeeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Payslip', required: true })
  payslipId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ enum: ['REFUND', 'DEDUCTION'], required: true })
  direction: 'REFUND' | 'DEDUCTION';

  @Prop({
    enum: ['PENDING_FINANCE', 'COMPLETED', 'CANCELLED'],
    default: 'PENDING_FINANCE',
  })
  status: 'PENDING_FINANCE' | 'COMPLETED' | 'CANCELLED';

  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  processedBy?: Types.ObjectId; 

  @Prop()
  processedAt?: Date;
}

export const PayrollRefundSchema =
  SchemaFactory.createForClass(PayrollRefund);