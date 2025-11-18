import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EmployeeLeaveBalanceDocument = EmployeeLeaveBalance & Document;

@Schema({ timestamps: true })
export class EmployeeLeaveBalance {
  @Prop({ type: Types.ObjectId, required: true, unique: true })
  employeeId: Types.ObjectId;

  // map of leaveTypeCode -> number
  @Prop({ type: Map, of: Number, default: {} })
  balances: Map<string, number>;

  @Prop({ type: Map, of: Number, default: {} })
  pending: Map<string, number>;

  @Prop({ type: Map, of: Number, default: {} })
  accrued: Map<string, number>;

  @Prop({ type: Array, default: [] })
  auditTrail: Array<any>;
}

export const EmployeeLeaveBalanceSchema =
  SchemaFactory.createForClass(EmployeeLeaveBalance);
