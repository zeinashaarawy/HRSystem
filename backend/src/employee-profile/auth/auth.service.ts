import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmployeeProfile, EmployeeProfileDocument } from '../models/employee-profile.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EmployeeStatus, SystemRole } from '../enums/employee-profile.enums';
import { RegisterDto } from '../dto/register.dto';
import { ADMIN_ROLES } from '../../common/constants/role-groups';
@Injectable()
export class AuthService {
    employeeSystemRoleModel: any;
  constructor(
    @InjectModel(EmployeeProfile.name)
    private readonly employeeModel: Model<EmployeeProfileDocument>,
    private readonly jwtService: JwtService,
  ) {}

 async login(dto: { employeeNumber: string; password: string }) {
  // Trim whitespace from input
  const normalizedEmployeeNumber = dto.employeeNumber.trim();
  
  // Debug: Check total employees and collection info
  const totalEmployees = await this.employeeModel.countDocuments({});
  console.log(`Total employees in collection: ${totalEmployees}`);
  
  // Try exact match first
  let employee = await this.employeeModel.findOne({
    employeeNumber: normalizedEmployeeNumber,
  });
  
  // If not found, try case-insensitive search
  if (!employee) {
    employee = await this.employeeModel.findOne({
      employeeNumber: { $regex: new RegExp(`^${normalizedEmployeeNumber.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') },
    });
  }
  
  if (!employee) {
    // Debug: Check what employee numbers exist (first 10) and their structure
    const sampleEmployees = await this.employeeModel.find({}).select('employeeNumber password firstName lastName').limit(10).lean();
    console.log(`Login failed for employeeNumber: "${normalizedEmployeeNumber}"`);
    console.log(`Sample employees in DB:`, sampleEmployees.map(e => ({
      employeeNumber: e.employeeNumber,
      hasPassword: !!e.password,
      firstName: e.firstName,
      lastName: e.lastName
    })));
    
    // Also try to find by any variation
    const allEmployees = await this.employeeModel.find({}).select('employeeNumber').lean();
    const matchingEmployees = allEmployees.filter(e => 
      e.employeeNumber && 
      (e.employeeNumber.toLowerCase() === normalizedEmployeeNumber.toLowerCase() ||
       e.employeeNumber.includes(normalizedEmployeeNumber) ||
       normalizedEmployeeNumber.includes(e.employeeNumber))
    );
    
    if (matchingEmployees.length > 0) {
      console.log(`Found similar employee numbers:`, matchingEmployees.map(e => e.employeeNumber));
    }
    
    throw new NotFoundException(`Employee not found with employee number: ${normalizedEmployeeNumber}`);
  }
  
  // Debug: Check if employee has password field
  if (!employee.password) {
    console.log(`Employee found but has no password field. Employee:`, {
      id: employee._id,
      employeeNumber: employee.employeeNumber,
      firstName: employee.firstName,
      lastName: employee.lastName,
      hasPassword: !!employee.password
    });
    throw new UnauthorizedException("Employee account not properly set up - missing password");
  }

  const isMatch = await bcrypt.compare(dto.password, employee.password as string);
  if (!isMatch) throw new UnauthorizedException("Invalid credentials");

  let role: SystemRole;
  const n = dto.employeeNumber.toUpperCase();

  if (n.startsWith("HRADM")) role = SystemRole.HR_ADMIN;
  else if (n.startsWith("HRM") || n.startsWith("HRMAN")) role = SystemRole.HR_MANAGER;
  else if (n.startsWith("HRE")) role = SystemRole.HR_EMPLOYEE;
  else if (n.startsWith("DH")) role = SystemRole.DEPARTMENT_HEAD;
  else if (n.startsWith("DEPT")) role = SystemRole.DEPARTMENT_EMPLOYEE;
  else if (n.startsWith("PAYM")) role = SystemRole.PAYROLL_MANAGER;
  else if (n.startsWith("PAYS")) role = SystemRole.PAYROLL_SPECIALIST;
  else if (n.startsWith("SYS")) role = SystemRole.SYSTEM_ADMIN;
  else if (n.startsWith("REC")) role = SystemRole.RECRUITER;
  else if (n.startsWith("FIN")) role = SystemRole.FINANCE_STAFF;
  else role = SystemRole.DEPARTMENT_EMPLOYEE;

  const payload = {
    id: employee._id.toString(),
    username: employee.firstName + " " + employee.lastName,
    role,
  };

  const token = await this.jwtService.signAsync(payload);

  return {
    access_token: token,
    payload,
    isAdmin: ADMIN_ROLES.includes(role), // ✅ IMPORTANT
  };
}

  
async register(dto: RegisterDto) {

  const exists = await this.employeeModel.findOne({
    employeeNumber: dto.employeeNumber,
  });
  if (exists)
    throw new BadRequestException("Employee number already exists ❌");

  const hashedPassword = await bcrypt.hash(dto.password, 10);

  const newEmployee = new this.employeeModel({
    employeeNumber: dto.employeeNumber,
    password: hashedPassword,
    firstName: dto.firstName,
    lastName: dto.lastName,
    nationalId: dto.nationalId,
    dateOfHire: new Date(dto.dateOfHire),
    address: dto.address,
    systemRole: dto.role,        // ✅ correct
    status: EmployeeStatus.ACTIVE,
  });

  return newEmployee.save();
}
 async updateUserRoles(userId: string, roles: string[]) {
  return this.employeeModel.findByIdAndUpdate(
    userId,
    {
      $set: {
        systemRoles: roles, // ✅ MUST match schema
      },
    },
    { new: true }
  );
}

}
