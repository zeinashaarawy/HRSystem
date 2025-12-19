import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { CandidateModule } from '../../candidate/candidate.module';
import { RolesGuard } from '../../common/guards/roles.guard';

import { EmployeeProfileController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  EmployeeProfile,
  EmployeeProfileSchema,
} from '../models/employee-profile.schema';
import {
  EmployeeSystemRole,
  EmployeeSystemRoleSchema,
} from '../models/employee-system-role.schema';

@Module({
  imports: [
    // Register Employee schema for Auth login
    MongooseModule.forFeature([
      { name: EmployeeProfile.name, schema: EmployeeProfileSchema },
      { name: EmployeeSystemRole.name, schema: EmployeeSystemRoleSchema },
    ]),

    CandidateModule,

    // Register JWT (global so JwtService can be injected in guards across modules)
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'super-secret-key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [EmployeeProfileController],
  providers: [AuthService, RolesGuard],
  exports: [AuthService],
})
export class AuthModule {}
