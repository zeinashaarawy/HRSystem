import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class PayrollPolicy {
  @Prop({ required: true }) policyName: string;
  @Prop({ unique: true }) policyCode: string;
  @Prop({ type: MongooseSchema.Types.Mixed }) value: any;
  @Prop() description: string;
  @Prop({ default: 'pending', enum: ['pending','approved','rejected'] }) status: string;
  @Prop({ type: Types.ObjectId, ref: 'User' }) createdBy: Types.ObjectId;
}
export const PayrollPolicySchema = SchemaFactory.createForClass(PayrollPolicy);
