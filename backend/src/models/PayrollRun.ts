import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class PayrollRun extends Document {
  @Prop({ required: true }) period: string; // "2025-03" or "2025-W12"
  
  @Prop({
    enum: [
      'PreRun', 
      'Initiated',
      'DraftGenerated', 
      'UnderReview',
      'PendingManagerApproval',
      'PendingFinanceApproval',
      'Locked',
      'Unfrozen',
      'Executed'
    ],
    default: 'PreRun'
  })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User' }) initiatedBy: Types.ObjectId;
  @Prop({ type: Date }) initiatedAt?: Date;

  @Prop({ type: Date }) managerApprovedAt?: Date;
  @Prop({ type: Types.ObjectId, ref: 'User' }) managerApprovedBy?: Types.ObjectId;

  @Prop({ type: Date }) financeApprovedAt?: Date;
  @Prop({ type: Types.ObjectId, ref: 'User' }) financeApprovedBy?: Types.ObjectId;

  @Prop({ default: false }) isFrozen: boolean;
  @Prop() unfreezeReason?: string;
}
export const PayrollRunSchema = SchemaFactory.createForClass(PayrollRun);
