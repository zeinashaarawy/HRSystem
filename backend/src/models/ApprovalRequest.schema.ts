import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class ApprovalRequest {
  @Prop({ required: true }) entityType: string;
  @Prop({ required: true, type: Types.ObjectId }) entityId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) requestedBy: Types.ObjectId;
  @Prop({ required: true }) approverRole: string;
  @Prop({ default: 'pending', enum: ['pending','approved','rejected','cancelled'] }) status: string;
  @Prop() reason: string;
  @Prop({ type: Date }) decisionAt: Date;
  @Prop({ type: Types.ObjectId, ref: 'User' }) decidedBy: Types.ObjectId;
}
export const ApprovalRequestSchema = SchemaFactory.createForClass(ApprovalRequest);
