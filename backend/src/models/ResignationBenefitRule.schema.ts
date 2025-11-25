import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class ResignationBenefitRule {
  @Prop({ required: true }) name: string;
  @Prop() contractType: string;
  @Prop({ type: Number, default: 0 }) yearsOfServiceMin: number;
  @Prop({ type: Number, default: 999 }) yearsOfServiceMax: number;
  @Prop({ required: true }) formula: string;
  @Prop({ default: 'pending', enum: ['pending','approved','rejected'] }) status: string;
  @Prop({ type: Types.ObjectId, ref: 'User' }) createdBy: Types.ObjectId;
}
export const ResignationBenefitRuleSchema = SchemaFactory.createForClass(ResignationBenefitRule);
