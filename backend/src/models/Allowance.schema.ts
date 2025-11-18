import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Allowance {
  @Prop({ required: true }) name: string;
  @Prop({ required: true, unique: true }) code: string;
  @Prop({ enum: ['fixed','percentage','tiered'], required: true }) type: string;
  @Prop({ type: Number }) value: number;
  @Prop({ type: String, enum: ['transportation','housing','meals','other'], default: 'other' }) 
  allowanceType: string;
  @Prop() description: string;
  @Prop({ type: [{ type: String }], default: [] }) appliesToContractTypes: string[];
  @Prop({ default: 'pending', enum: ['pending','approved','rejected'] }) status: string;
  @Prop({ type: Types.ObjectId, ref: 'User' }) createdBy: Types.ObjectId;
}
export const AllowanceSchema = SchemaFactory.createForClass(Allowance);

