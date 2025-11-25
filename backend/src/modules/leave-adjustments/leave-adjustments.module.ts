import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaveAdjustmentsController } from './leave-adjustments.controller';
import { LeaveAdjustmentsService } from './leave-adjustments.service';
import { LeaveAdjustment, LeaveAdjustmentSchema } from './schemas/leave-adjustment.schema';
import { EmployeeLeaveBalanceModule } from '../employee-leave-balance/employee-leave-balance.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LeaveAdjustment.name, schema: LeaveAdjustmentSchema }]),
    forwardRef(() => EmployeeLeaveBalanceModule),
  ],
  controllers: [LeaveAdjustmentsController],
  providers: [LeaveAdjustmentsService],
  exports: [LeaveAdjustmentsService],
})
export class LeaveAdjustmentsModule {}
