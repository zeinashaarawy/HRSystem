import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class TerminationBenefitProcessing extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
  employeeId: Types.ObjectId;

  @Prop({ required: true }) amount: number;

  @Prop({
    enum: ['Pending','Approved','Rejected','ManualOverride'],
    default: 'Pending'
  })
  status: string;

  @Prop() overrideReason?: string;
  @Prop({ type: Types.ObjectId, ref: 'User' }) reviewedBy?: Types.ObjectId;
}
export const TerminationBenefitProcessingSchema =
  SchemaFactory.createForClass(TerminationBenefitProcessing);
