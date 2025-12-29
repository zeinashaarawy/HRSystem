import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';


export type penaltyDocument = HydratedDocument<penalty>

@Schema()
class penalty {
    @Prop({ required: true })
    reason: string
    @Prop({ required: true })
    amount: number
    
}
const penaltySchema = SchemaFactory.createForClass(penalty)

export type employeePenaltiesDocument = HydratedDocument<employeePenalties>

@Schema({ timestamps: true })
export class employeePenalties {
    // Reference Employee by collection name string to avoid depending on the full employee-profile module
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'EmployeeProfile'})
    employeeId: mongoose.Types.ObjectId;
    @Prop({ type: [penaltySchema] })
    penalties?: penalty[]
}
export const employeePenaltiesSchema = SchemaFactory.createForClass(employeePenalties);
