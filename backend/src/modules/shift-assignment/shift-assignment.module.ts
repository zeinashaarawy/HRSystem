import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShiftAssignment, ShiftAssignmentSchema } from './shift-assignment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShiftAssignment.name, schema: ShiftAssignmentSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class ShiftAssignmentModule {}

