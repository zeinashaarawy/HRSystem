import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class PayrollSchema {
  @Prop({ required: true }) name: string;
  @Prop() description: string;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'TaxRule' }], default: [] }) taxRules: Types.ObjectId[];
  @Prop({ type: [{ type: Types.ObjectId, ref: 'InsuranceBracket' }], default: [] }) insuranceBrackets: Types.ObjectId[];
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Allowance' }], default: [] }) allowances: Types.ObjectId[];
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Deduction' }], default: [] }) deductions: Types.ObjectId[];
  @Prop({ default: 'pending', enum: ['pending','approved','rejected'] }) status: string;
  @Prop({ type: Types.ObjectId, ref: 'User' }) createdBy: Types.ObjectId;
}
export const PayrollSchemaSchema = SchemaFactory.createForClass(PayrollSchema);
