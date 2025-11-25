import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class TaxRule {
  @Prop({ required: true, unique: true }) code: string;
  @Prop({ type: String, enum: ['income-tax','exemption','other'], required: true }) taxType: string;
  @Prop({ type: Number, default: 0 }) bracketMin: number;
  @Prop({ type: Number, default: Infinity }) bracketMax: number;
  @Prop({ type: Number, required: true }) percentage: number;
  @Prop({ type: Number, default: 0 }) exemptionAmount: number;
  @Prop() lawReference: string;
  @Prop({ type: Date, default: Date.now }) effectiveFrom: Date;
  @Prop({ type: Date, default: null }) effectiveTo: Date;
  @Prop({ default: 'pending', enum: ['pending','approved','rejected'] }) status: string;
  @Prop({ type: Types.ObjectId, ref: 'User' }) createdBy: Types.ObjectId;
}
export const TaxRuleSchema = SchemaFactory.createForClass(TaxRule);
