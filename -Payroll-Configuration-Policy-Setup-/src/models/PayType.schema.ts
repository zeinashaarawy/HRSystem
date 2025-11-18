import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class PayType {
  @Prop({ required: true }) name: string;
  @Prop({ required: true, unique: true }) code: string;
  @Prop({ type: String, enum: ['hourly','daily','weekly','monthly','contract-based'], required: true }) type: string;
  @Prop() description: string;
  @Prop({ default: 'pending', enum: ['pending','approved','rejected'] })
  status: string;
  @Prop({ type: Types.ObjectId, ref: 'User' }) createdBy: Types.ObjectId;
}
export const PayTypeSchema = SchemaFactory.createForClass(PayType);
