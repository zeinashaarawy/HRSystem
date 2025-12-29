import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

import {
  EmployeeProfile,
  EmployeeProfileDocument,
} from '../models/employee-profile.schema';

import {
  Candidate,
  CandidateDocument,
} from '../models/candidate.schema';

import {
  EmployeeSystemRole,
  EmployeeSystemRoleDocument,
} from '../models/employee-system-role.schema';

import { EmployeeStatus, SystemRole } from '../enums/employee-profile.enums';
import { RegisterDto } from '../dto/register.dto';
import { ADMIN_ROLES } from '../../common/constants/role-groups';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(EmployeeProfile.name)
    private readonly employeeModel: Model<EmployeeProfileDocument>,

    @InjectModel(Candidate.name)
    private readonly candidateModel: Model<CandidateDocument>,

    @InjectModel(EmployeeSystemRole.name)
    private readonly employeeSystemRoleModel: Model<EmployeeSystemRoleDocument>,

    private readonly jwtService: JwtService,
  ) {}

  /* =========================
     LOGIN
  ========================== */
 async login(dto: { employeeNumber: string; password: string }) {
  /* =========================
     1️⃣ TRY EMPLOYEE LOGIN
  ========================== */
  console.log('🔍 Searching for employee with employeeNumber:', dto.employeeNumber);
  // Try exact match first
  let employee = await this.employeeModel.findOne({
    employeeNumber: dto.employeeNumber,
  });
  
  // If not found, try case-insensitive search
  if (!employee) {
    console.log('⚠️ Exact match not found, trying case-insensitive search...');
    employee = await this.employeeModel.findOne({
      employeeNumber: { $regex: new RegExp(`^${dto.employeeNumber}$`, 'i') },
    });
  }
  
  // Also try trimming whitespace
  if (!employee) {
    console.log('⚠️ Case-insensitive not found, trying trimmed search...');
    employee = await this.employeeModel.findOne({
      employeeNumber: dto.employeeNumber.trim(),
    });
  }
  
  console.log('👤 Employee found:', employee ? `YES (ID: ${employee._id})` : 'NO');
  
  // Debug: List all employee numbers in database (first 5)
  if (!employee) {
    const sampleEmployees = await this.employeeModel.find({}).select('employeeNumber').limit(5).lean();
    console.log('📋 Sample employeeNumbers in DB:', sampleEmployees.map(e => e.employeeNumber));
  }

  if (employee) {
    const isMatch = await bcrypt.compare(
      dto.password,
      employee.password as string,
    );

    if (!isMatch)
      throw new UnauthorizedException('Invalid credentials');

    let role: SystemRole;
    const n = dto.employeeNumber.toUpperCase();

    if (n.startsWith('HRADM')) role = SystemRole.HR_ADMIN;
    else if (n.startsWith('HRM') || n.startsWith('HRMAN'))
      role = SystemRole.HR_MANAGER;
    else if (n.startsWith('HRE')) role = SystemRole.HR_EMPLOYEE;
    else if (n.startsWith('DH')) role = SystemRole.DEPARTMENT_HEAD;
    else if (n.startsWith('DEPT')) role = SystemRole.DEPARTMENT_EMPLOYEE;
    else if (n.startsWith('PAYM')) role = SystemRole.PAYROLL_MANAGER;
    else if (n.startsWith('PAYS')) role = SystemRole.PAYROLL_SPECIALIST;
    else if (n.startsWith('SYS')) role = SystemRole.SYSTEM_ADMIN;
    else if (n.startsWith('REC')) role = SystemRole.RECRUITER;
    else if (n.startsWith('FIN')) role = SystemRole.FINANCE_STAFF;
    else role = SystemRole.DEPARTMENT_EMPLOYEE;

    const payload = {
      id: employee._id.toString(),
      username: employee.firstName + ' ' + employee.lastName,
      role,
      type: 'EMPLOYEE',
      userType: 'EMPLOYEE',
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      payload,
      isAdmin: ADMIN_ROLES.includes(role),
      userType: 'EMPLOYEE',
    };
  }

  /* =========================
     2️⃣ TRY CANDIDATE LOGIN
  ========================== */
  console.log('🔍 Searching for candidate with candidateNumber:', dto.employeeNumber);
  const candidate = await this.candidateModel.findOne({
    candidateNumber: dto.employeeNumber,
  });
  console.log('👤 Candidate found:', candidate ? 'YES' : 'NO');

  if (!candidate)
    throw new NotFoundException('User not found');

  const isCandidateMatch = await bcrypt.compare(
    dto.password,
    candidate.password as string,
  );

  if (!isCandidateMatch)
    throw new UnauthorizedException('Invalid credentials');

  const payload = {
    id: candidate._id.toString(),
    username: candidate.firstName + ' ' + candidate.lastName,
    role: SystemRole.JOB_CANDIDATE,
    type: 'CANDIDATE',
    userType: 'CANDIDATE',
  };

  const token = await this.jwtService.signAsync(payload);

  return {
    access_token: token,
    payload,
    isAdmin: false,
    userType: 'CANDIDATE',
  };
}

  /* =========================
     UPDATE ROLES (ADMIN/HR)
  ========================== */
  async updateUserRoles(userId: string, roles: string[]) {
    // Update roles in EmployeeSystemRole collection (correct location)
    return this.employeeSystemRoleModel.findOneAndUpdate(
      { employeeProfileId: new Types.ObjectId(userId) },
      { 
        roles: roles,
        isActive: true,
      },
      { new: true, upsert: true }, // Create if doesn't exist
    );
  }

  /* =========================
     REGISTER (CANDIDATE ONLY)
  ========================== */
  async register(dto: RegisterDto) {
    const employeeExists = await this.employeeModel.findOne({
      employeeNumber: dto.candidateNumber,
    });

    if (employeeExists)
      throw new BadRequestException(
        'This number already belongs to an employee ❌',
      );

    const candidateExists = await this.candidateModel.findOne({
      candidateNumber: dto.candidateNumber,
    });

    if (candidateExists)
      throw new BadRequestException('Candidate number already exists ❌');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const candidate = new this.candidateModel({
      candidateNumber: dto.candidateNumber,
      password: hashedPassword,
      firstName: dto.firstName,
      lastName: dto.lastName,
      nationalId: dto.nationalId,
      resumeUrl: dto.resumeUrl,
      profilePictureUrl: dto.profilePictureUrl, // Store base64 image
      applicationDate: new Date(),
    });

    return candidate.save();
  }

  /* =========================
     DEBUG: GET ALL EMPLOYEE NUMBERS
  ========================== */
  async getAllEmployeeNumbers() {
    const employees = await this.employeeModel.find({}).select('employeeNumber firstName lastName').limit(50).lean();
    const candidates = await this.candidateModel.find({}).select('candidateNumber firstName lastName').limit(50).lean();
    
    return {
      employees: employees.map(e => ({
        employeeNumber: e.employeeNumber,
        name: `${e.firstName} ${e.lastName}`
      })),
      candidates: candidates.map(c => ({
        candidateNumber: c.candidateNumber,
        name: `${c.firstName} ${c.lastName}`
      })),
      totalEmployees: employees.length,
      totalCandidates: candidates.length
    };
  }
}
