import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LeaveRequestDocument = LeaveRequest & Document;

@Schema({ timestamps: true })
export class LeaveRequest {
  @Prop({ type: Types.ObjectId, required: true })
  employeeId: Types.ObjectId;

  @Prop({ required: true })
  leaveTypeCode: string; // e.g. ANNUAL, SICK

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: true })
  endDate: Date;

  @Prop({ type: String })
  justification?: string;

  @Prop({ type: String })
  documentUrl?: string;

  @Prop({ type: String, enum: ['pending', 'approved', 'rejected', 'cancelled'], default: 'pending' })
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';

  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  managerId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  hrAdminId?: Types.ObjectId;

  @Prop({ type: Array, default: [] })
  auditTrail: Array<any>;
}

export const LeaveRequestSchema = SchemaFactory.createForClass(LeaveRequest);
