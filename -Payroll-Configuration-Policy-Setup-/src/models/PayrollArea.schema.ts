import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class PayrollArea {
  @Prop({ required: true }) name: string;
  @Prop() description: string;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Department' }], default: [] })
  departments: Types.ObjectId[];
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Employee' }], default: [] })
  employees: Types.ObjectId[];
  @Prop({ type: Types.ObjectId, ref: 'PayrollSchema' }) payrollSchema: Types.ObjectId;
  @Prop({ type: String, enum: ['monthly','weekly','bi-weekly','daily'], default: 'monthly' }) payCycle: string;
  @Prop({ type: Types.ObjectId, ref: 'User' }) createdBy: Types.ObjectId;
  @Prop({ default: 'pending', enum: ['pending','approved','rejected'] }) status: string;
  @Prop({ default: true }) isActive: boolean;
}
export const PayrollAreaSchema = SchemaFactory.createForClass(PayrollArea);
