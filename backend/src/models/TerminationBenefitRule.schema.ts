import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class TerminationBenefitRule {
  @Prop({ required: true }) name: string;
  @Prop() condition: string;
  @Prop({ required: true }) formula: string;
  @Prop({ default: 'pending', enum: ['pending','approved','rejected'] }) status: string;
  @Prop({ type: Types.ObjectId, ref: 'User' }) createdBy: Types.ObjectId;
}
export const TerminationBenefitRuleSchema = SchemaFactory.createForClass(TerminationBenefitRule);
