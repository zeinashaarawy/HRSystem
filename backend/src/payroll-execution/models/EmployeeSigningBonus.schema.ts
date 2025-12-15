
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BonusStatus } from '../enums/payroll-execution-enum';

export type employeeSigningBonusDocument = HydratedDocument<employeeSigningBonus>


@Schema({timestamps: true})
export class employeeSigningBonus {
    // Reference by collection names only to avoid depending on external modules in this standalone backend
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'EmployeeProfile', required: true })
    employeeId: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SigningBonus', required: true })
    signingBonusId: mongoose.Types.ObjectId;
    
    @Prop({required: true})
    givenAmount:number; // for sake of editing signingBonus amount manually given to this employee
    
    @Prop({ type: Date })
    paymentDate?: Date;

    @Prop({ default: BonusStatus.PENDING ,type: String, enum: BonusStatus })
    status: BonusStatus; // pending, paid, approved ,rejected
}

export const employeeSigningBonusSchema = SchemaFactory.createForClass(employeeSigningBonus);