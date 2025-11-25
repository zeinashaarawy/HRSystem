import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class SigningBonus {
  @Prop({ required: true }) name: string;
  @Prop({ required: true, unique: true }) code: string;
  @Prop({ type: String, enum: ['fixed','percentage'], required: true }) type: string;
  @Prop({ type: Number, required: true }) value: number;
  @Prop({ type: Date }) validFrom: Date;
  @Prop({ type: Date }) validTo: Date;
  @Prop({ type: Types.ObjectId, ref: 'PayGrade' }) appliesToPayGrade: Types.ObjectId;
  @Prop({ default: 'pending', enum: ['pending','approved','rejected'] }) status: string;
  @Prop({ type: Types.ObjectId, ref: 'User' }) createdBy: Types.ObjectId;
}
export const SigningBonusSchema = SchemaFactory.createForClass(SigningBonus);
