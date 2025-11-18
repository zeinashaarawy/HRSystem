import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class SystemSetting {
  @Prop({ required: true }) key: string;
  @Prop() label: string;
  @Prop({ type: MongooseSchema.Types.Mixed }) value: any;
  @Prop({ type: Types.ObjectId, ref: 'User' }) createdBy: Types.ObjectId;
  @Prop({ default: 'pending', enum: ['pending','approved','rejected'] }) status: string;
}
export const SystemSettingSchema = SchemaFactory.createForClass(SystemSetting);
