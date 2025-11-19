import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class SigningBonusProcessing extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
  employeeId: Types.ObjectId;

  @Prop({ required: true }) amount: number;

  @Prop({
    enum: ['Pending','Approved','Rejected','ManualOverride'],
    default: 'Pending'
  })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User' }) reviewedBy?: Types.ObjectId;
  @Prop() overrideReason?: string;
}
export const SigningBonusProcessingSchema =
  SchemaFactory.createForClass(SigningBonusProcessing);
