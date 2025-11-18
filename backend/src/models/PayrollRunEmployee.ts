import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class PayrollRunEmployee extends Document {
  @Prop({ type: Types.ObjectId, ref: 'PayrollRun', required: true })
  payrollRunId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
  employeeId: Types.ObjectId;

  // A: FETCHING EMPLOYEES + HR EVENTS
  @Prop({ enum: ['Normal','NewHire','Resigned','Terminated'], required: true })
  employeeStatus: string;

  @Prop({ default: false }) signingBonusApplied: boolean;
  @Prop() signingBonusAmount?: number;

  @Prop() resignationBenefitAmount?: number;
  @Prop() terminationBenefitAmount?: number;

  // B: SALARY BREAKDOWN
  @Prop({ required: true }) grossSalary: number;

  @Prop({ type: Object }) allowances: any;  // { housing: 1000, transport: 700 }
  @Prop({ type: Object }) taxes: any;       // { incomeTax: 500 }
  @Prop({ type: Object }) insurance: any;   // { social: 320, health: 100 }
  @Prop({ type: Object }) deductions: any;  // penalties, unpaid leave, etc.

  @Prop({ required: true }) netSalary: number;      // gross - taxes - insurance
  @Prop({ required: true }) finalSalary: number;    // net - penalties (if any)

  // C: DRAFT STATUS
  @Prop({
    enum: ['Draft','Finalized'],
    default: 'Draft'
  })
  calculationStatus: string;
}
export const PayrollRunEmployeeSchema =
  SchemaFactory.createForClass(PayrollRunEmployee);
