import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PayGradeDocument = PayGrade & Document;

@Schema({ timestamps: true })
export class PayGrade {
  @Prop({ required: true }) name: string;
  @Prop({ required: true, unique: true }) code: string;
  @Prop({ required: true, type: Number }) baseSalary: number;
  @Prop({ type: String }) currency: string;
  @Prop({ type: String, enum: ['full-time','part-time','hourly','contract','commission'] })
  contractType: string;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Allowance' }], default: [] })
  allowances: Types.ObjectId[];
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Deduction' }], default: [] })
  deductions: Types.ObjectId[];
  @Prop({ type: Types.ObjectId, ref: 'Department' }) department: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'Position' }) position: Types.ObjectId;
  @Prop({ default: 'pending', enum: ['pending','approved','rejected','archived'] })
  status: string;
  @Prop({ type: Types.ObjectId, ref: 'User' }) createdBy: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'User' }) updatedBy: Types.ObjectId;
  @Prop() notes: string;
}
export const PayGradeSchema = SchemaFactory.createForClass(PayGrade);
