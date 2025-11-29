import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaveTypesService } from './leave-types.service';
import { LeaveTypesController } from './leave-types.controller';
import { LeaveType, LeaveTypeSchema } from './schemas/leave-type.schema';
import { LeaveCategoriesController } from './leave-categories.controller';
import { LeaveCategory, LeaveCategorySchema } from './schemas/leave-category.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LeaveType.name, schema: LeaveTypeSchema },
      { name: LeaveCategory.name, schema: LeaveCategorySchema },
    ]),
  ],
  controllers: [LeaveTypesController, LeaveCategoriesController],
  providers: [LeaveTypesService],
  exports: [LeaveTypesService],
})
export class LeaveTypesModule {}