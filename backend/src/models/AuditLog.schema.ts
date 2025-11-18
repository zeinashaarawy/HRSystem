import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class AuditLog {
  @Prop({ required: true }) entityType: string;
  @Prop({ required: true, type: Types.ObjectId }) entityId: Types.ObjectId;
  @Prop({ required: true }) action: string;
  @Prop({ type: Types.ObjectId, ref: 'User' }) changedBy: Types.ObjectId;
  @Prop({ type: MongooseSchema.Types.Mixed }) changes: any;
  @Prop({ type: Date, default: Date.now }) timestamp: Date;
}
export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
