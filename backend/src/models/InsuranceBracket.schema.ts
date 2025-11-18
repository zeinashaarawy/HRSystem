import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class InsuranceBracket {
  @Prop({ required: true }) name: string;
  @Prop({ required: true, unique: true }) code: string;
  @Prop({ type: String, enum: ['health','social','other'], required: true }) insuranceType: string;
  @Prop({ type: Number, required: true }) employeePercentage: number;
  @Prop({ type: Number, required: true }) employerPercentage: number;
  @Prop({ type: Number, default: 0 }) minSalary: number;
  @Prop({ type: Number, default: Infinity }) maxSalary: number;
  @Prop({ type: Date, default: Date.now }) effectiveFrom: Date;
  @Prop({ type: Date, default: null }) effectiveTo: Date;
  @Prop({ default: 'pending', enum: ['pending','approved','rejected'] }) status: string;
  @Prop({ type: Types.ObjectId, ref: 'User' }) createdBy: Types.ObjectId;
}
export const InsuranceBracketSchema = SchemaFactory.createForClass(InsuranceBracket);
