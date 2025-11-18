import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LeaveAdjustmentDocument = LeaveAdjustment & Document;

@Schema({ timestamps: true })
export class LeaveAdjustment {
  @Prop({ type: Types.ObjectId, required: true })
  employeeId: Types.ObjectId;

  @Prop({ required: true })
  leaveTypeCode: string;

  @Prop({ type: Number, required: true })
  days: number; // positive or negative

  @Prop({ type: String })
  reason?: string;

  @Prop({ type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' })
  status: 'pending' | 'approved' | 'rejected';

  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  approverId?: Types.ObjectId;

  @Prop({ type: Array, default: [] })
  auditTrail: Array<any>;
}

export const LeaveAdjustmentSchema = SchemaFactory.createForClass(LeaveAdjustment);
