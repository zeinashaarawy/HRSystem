
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BenefitStatus } from '../enums/payroll-execution-enum';

export type EmployeeTerminationResignationDocument = HydratedDocument<EmployeeTerminationResignation>

@Schema({ timestamps: true })
export class EmployeeTerminationResignation {
    // Reference by collection names to avoid depending on external modules
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'EmployeeProfile', required: true })
    employeeId: mongoose.Types.ObjectId;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'terminationAndResignationBenefits', required: true })
    benefitId: mongoose.Types.ObjectId;

    @Prop({ required: true })
    givenAmount: number; // for sake of editing Benefits amount manually given to this employee

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'TerminationRequest', required: true })
    terminationId: mongoose.Types.ObjectId;
    @Prop({ default: BenefitStatus.PENDING, type: String, enum: BenefitStatus })
    status: BenefitStatus; // pending, paid, approved ,rejected

}

export const EmployeeTerminationResignationSchema = SchemaFactory.createForClass(EmployeeTerminationResignation);