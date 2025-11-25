import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class PayrollDispute {
  @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
  employeeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Payslip', required: true })
  payslipId: Types.ObjectId;

  @Prop({
    enum: ['WRONG_HOURS', 'MISSING_BONUS', 'TAX_ISSUE', 'OTHER'],
    default: 'OTHER',
  })
  type: 'WRONG_HOURS' | 'MISSING_BONUS' | 'TAX_ISSUE' | 'OTHER';

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({
    enum: ['OPEN', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'],
    default: 'OPEN',
  })
  status: 'OPEN' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';

  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  handledBy?: Types.ObjectId; 

  @Prop()
  resolutionNotes?: string;
}

export const PayrollDisputeSchema =
  SchemaFactory.createForClass(PayrollDispute);