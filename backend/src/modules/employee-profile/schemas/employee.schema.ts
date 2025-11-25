import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Department } from '../../organization-structure/schemas/department.schema';
import { Position } from '../../organization-structure/schemas/position.schema';

export type EmploymentStatus = 'ACTIVE' | 'INACTIVE' | 'TERMINATED';

@Schema({ timestamps: true })
export class Employee extends Document {
  @Prop({ required: true, unique: true })
  employeeCode: string; // e.g. "EMP-0001"

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: String })
  phone?: string;

  @Prop({ type: String })
  nationalId?: string;

  @Prop({ type: Date })
  dateOfBirth?: Date;

  @Prop({ type: Date, required: true })
  hireDate: Date;

  @Prop({ type: String, enum: ['ACTIVE', 'INACTIVE', 'TERMINATED'], default: 'ACTIVE' })
  status: EmploymentStatus;

  @Prop({ type: Types.ObjectId, ref: Department.name })
  department?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Position.name })
  position?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Employee', default: null })
  manager?: Types.ObjectId;

  @Prop({ type: String })
  profilePictureUrl?: string;

  @Prop({ type: String })
  addressLine1?: string;

  @Prop({ type: String })
  addressLine2?: string;

  @Prop({ type: String })
  city?: string;

  @Prop({ type: String })
  country?: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
