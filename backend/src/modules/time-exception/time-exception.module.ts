import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeException, TimeExceptionSchema } from './time-exception.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TimeException.name, schema: TimeExceptionSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class TimeExceptionModule {}

