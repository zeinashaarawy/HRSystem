import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Deduction {
  @Prop({ required: true }) name: string;
  @Prop({ required: true, unique: true }) code: string;
  @Prop({ enum: ['fixed','percentage','tiered'], required: true }) type: string;
  @Prop({ type: Number }) value: number;
  @Prop() calculationMethod: string;
  @Prop({ type: [{ type: String }], default: [] }) appliesToContractTypes: string[];
  @Prop({ default: 'pending', enum: ['pending','approved','rejected'] }) status: string;
  @Prop({ type: Types.ObjectId, ref: 'User' }) createdBy: Types.ObjectId;
}
export const DeductionSchema = SchemaFactory.createForClass(Deduction);
