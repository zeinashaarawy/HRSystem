import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EmployeeProfile, EmployeeProfileDocument } from '../employee-profile/models/employee-profile.schema';
import { payrollRuns } from './models/payrollRuns.schema';
import { employeePayrollDetails } from './models/employeePayrollDetails.schema';
import { employeeSigningBonus } from './models/EmployeeSigningBonus.schema';
import { EmployeeTerminationResignation } from './models/EmployeeTerminationResignation.schema';
import { PayRollStatus, PayRollPaymentStatus, BankStatus, BonusStatus, BenefitStatus } from './enums/payroll-execution-enum';
import { EmployeeStatus, ContractType, WorkType, Gender, MaritalStatus } from '../employee-profile/enums/employee-profile.enums';

async function seedPayrollTestData() {
  console.log('🌱 Starting Payroll Execution Test Data Seeding...\n');

  const app = await NestFactory.createApplicationContext(AppModule);
  
  // Get models - using the exact names from module registration
  const employeeModel = app.get<Model<EmployeeProfile>>(getModelToken('EmployeeProfile'));
  const payrollRunModel = app.get<Model<any>>(getModelToken(payrollRuns.name));
  const employeePayrollDetailsModel = app.get<Model<any>>(getModelToken(employeePayrollDetails.name));
  const employeeSigningBonusModel = app.get<Model<any>>(getModelToken(employeeSigningBonus.name));
  const terminationResignationModel = app.get<Model<any>>(getModelToken(EmployeeTerminationResignation.name));

  try {
    // Clear existing test data (optional - comment out if you want to keep existing data)
    console.log('🧹 Cleaning existing test data...');
    await employeeSigningBonusModel.deleteMany({});
    await employeePayrollDetailsModel.deleteMany({});
    await payrollRunModel.deleteMany({ runId: { $regex: /^PR-TEST-/ } });
    await terminationResignationModel.deleteMany({});
    console.log('✅ Cleanup complete\n');

    // 1. Create Employee Profiles
    console.log('👥 Creating employee profiles...');
    const employees: EmployeeProfileDocument[] = [];
    
    const employeeData = [
      {
        employeeNumber: 'EMP001',
        firstName: 'John',
        lastName: 'Doe',
        fullName: 'John Doe',
        nationalId: 'NID001',
        dateOfHire: new Date('2024-01-15'),
        workEmail: 'john.doe@company.com',
        mobilePhone: '+1234567890',
        status: EmployeeStatus.ACTIVE,
        contractType: ContractType.FULL_TIME_CONTRACT,
        workType: WorkType.FULL_TIME,
        gender: Gender.MALE,
        dateOfBirth: new Date('1990-05-15'),
      },
      {
        employeeNumber: 'EMP002',
        firstName: 'Jane',
        lastName: 'Smith',
        fullName: 'Jane Smith',
        nationalId: 'NID002',
        dateOfHire: new Date('2024-02-01'),
        workEmail: 'jane.smith@company.com',
        mobilePhone: '+1234567891',
        status: EmployeeStatus.ACTIVE,
        contractType: ContractType.FULL_TIME_CONTRACT,
        workType: WorkType.FULL_TIME,
        gender: Gender.FEMALE,
        dateOfBirth: new Date('1992-08-20'),
      },
      {
        employeeNumber: 'EMP003',
        firstName: 'Mike',
        lastName: 'Johnson',
        fullName: 'Mike Johnson',
        nationalId: 'NID003',
        dateOfHire: new Date('2023-11-10'),
        workEmail: 'mike.johnson@company.com',
        mobilePhone: '+1234567892',
        status: EmployeeStatus.ACTIVE,
        contractType: ContractType.FULL_TIME_CONTRACT,
        workType: WorkType.FULL_TIME,
        gender: Gender.MALE,
        dateOfBirth: new Date('1988-03-25'),
      },
      {
        employeeNumber: 'EMP004',
        firstName: 'Sarah',
        lastName: 'Williams',
        fullName: 'Sarah Williams',
        nationalId: 'NID004',
        dateOfHire: new Date('2024-03-01'),
        workEmail: 'sarah.williams@company.com',
        mobilePhone: '+1234567893',
        status: EmployeeStatus.ACTIVE,
        contractType: ContractType.PART_TIME_CONTRACT,
        workType: WorkType.PART_TIME,
        gender: Gender.FEMALE,
        dateOfBirth: new Date('1995-12-10'),
      },
      {
        employeeNumber: 'EMP005',
        firstName: 'David',
        lastName: 'Brown',
        fullName: 'David Brown',
        nationalId: 'NID005',
        dateOfHire: new Date('2023-06-15'),
        workEmail: 'david.brown@company.com',
        mobilePhone: '+1234567894',
        status: EmployeeStatus.ACTIVE,
        contractType: ContractType.FULL_TIME_CONTRACT,
        workType: WorkType.FULL_TIME,
        gender: Gender.MALE,
        dateOfBirth: new Date('1985-07-30'),
      },
      // Payroll Specialist
      {
        employeeNumber: 'EMP006',
        firstName: 'Payroll',
        lastName: 'Specialist',
        fullName: 'Payroll Specialist',
        nationalId: 'NID006',
        dateOfHire: new Date('2023-01-01'),
        workEmail: 'payroll.specialist@company.com',
        mobilePhone: '+1234567895',
        status: EmployeeStatus.ACTIVE,
        contractType: ContractType.FULL_TIME_CONTRACT,
        workType: WorkType.FULL_TIME,
        gender: Gender.FEMALE,
        dateOfBirth: new Date('1990-01-01'),
      },
      // Payroll Manager
      {
        employeeNumber: 'EMP007',
        firstName: 'Payroll',
        lastName: 'Manager',
        fullName: 'Payroll Manager',
        nationalId: 'NID007',
        dateOfHire: new Date('2022-01-01'),
        workEmail: 'payroll.manager@company.com',
        mobilePhone: '+1234567896',
        status: EmployeeStatus.ACTIVE,
        contractType: ContractType.FULL_TIME_CONTRACT,
        workType: WorkType.FULL_TIME,
        gender: Gender.MALE,
        dateOfBirth: new Date('1985-01-01'),
      },
      // Finance Staff
      {
        employeeNumber: 'EMP008',
        firstName: 'Finance',
        lastName: 'Staff',
        fullName: 'Finance Staff',
        nationalId: 'NID008',
        dateOfHire: new Date('2022-06-01'),
        workEmail: 'finance.staff@company.com',
        mobilePhone: '+1234567897',
        status: EmployeeStatus.ACTIVE,
        contractType: ContractType.FULL_TIME_CONTRACT,
        workType: WorkType.FULL_TIME,
        gender: Gender.FEMALE,
        dateOfBirth: new Date('1988-01-01'),
      },
    ];

    for (const empData of employeeData) {
      const existing = await employeeModel.findOne({ employeeNumber: empData.employeeNumber });
      if (!existing) {
        const emp = await employeeModel.create(empData);
        employees.push(emp);
        console.log(`  ✅ Created: ${emp.fullName} (${emp.employeeNumber})`);
      } else {
        employees.push(existing);
        console.log(`  ℹ️  Exists: ${existing.fullName} (${existing.employeeNumber})`);
      }
    }
    console.log(`✅ Created ${employees.length} employees\n`);

    // Get specific employees for roles
    const payrollSpecialist = employees.find(e => e.employeeNumber === 'EMP006');
    const payrollManager = employees.find(e => e.employeeNumber === 'EMP007');
    const financeStaff = employees.find(e => e.employeeNumber === 'EMP008');
    const regularEmployees = employees.filter(e => !['EMP006', 'EMP007', 'EMP008'].includes(e.employeeNumber));

    // Validate required employees exist
    if (!payrollSpecialist) {
      throw new Error('Payroll Specialist (EMP006) not found');
    }
    if (!payrollManager) {
      throw new Error('Payroll Manager (EMP007) not found');
    }
    if (!financeStaff) {
      throw new Error('Finance Staff (EMP008) not found');
    }

    // 2. Create Payroll Runs
    console.log('📊 Creating payroll runs...');
    const payrollRunsData: any[] = [];
    
    const currentDate = new Date();
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0); // Last day of last month
    const thisMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // Last day of this month

    const runs = [
      {
        runId: 'PR-TEST-2025-001',
        payrollPeriod: lastMonth,
        status: PayRollStatus.DRAFT,
        entity: 'Main Office',
        employees: regularEmployees.length,
        exceptions: 0,
        totalnetpay: 50000,
        payrollSpecialistId: payrollSpecialist._id,
        paymentStatus: PayRollPaymentStatus.PENDING,
      },
      {
        runId: 'PR-TEST-2025-002',
        payrollPeriod: thisMonth,
        status: PayRollStatus.UNDER_REVIEW,
        entity: 'Main Office',
        employees: regularEmployees.length,
        exceptions: 1,
        totalnetpay: 52000,
        payrollSpecialistId: payrollSpecialist._id,
        payrollManagerId: payrollManager._id,
        paymentStatus: PayRollPaymentStatus.PENDING,
        managerApprovalDate: new Date(),
      },
      {
        runId: 'PR-TEST-2025-003',
        payrollPeriod: new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0),
        status: PayRollStatus.PENDING_FINANCE_APPROVAL,
        entity: 'Main Office',
        employees: regularEmployees.length,
        exceptions: 0,
        totalnetpay: 51000,
        payrollSpecialistId: payrollSpecialist._id,
        payrollManagerId: payrollManager._id,
        financeStaffId: financeStaff._id,
        paymentStatus: PayRollPaymentStatus.PENDING,
        managerApprovalDate: new Date(),
      },
    ];

    for (const runData of runs) {
      const existing = await payrollRunModel.findOne({ runId: runData.runId });
      if (!existing) {
        const run = await payrollRunModel.create(runData);
        payrollRunsData.push(run);
        console.log(`  ✅ Created: ${run.runId} - ${run.status}`);
      } else {
        payrollRunsData.push(existing);
        console.log(`  ℹ️  Exists: ${existing.runId}`);
      }
    }
    console.log(`✅ Created ${payrollRunsData.length} payroll runs\n`);

    // 3. Create Employee Payroll Details
    console.log('💰 Creating employee payroll details...');
    const payrollDetails: any[] = [];
    
    if (payrollRunsData.length === 0) {
      throw new Error('No payroll runs created');
    }

    for (let i = 0; i < regularEmployees.length; i++) {
      const employee = regularEmployees[i];
      const payrollRun = payrollRunsData[0]; // Use first payroll run
      
      if (!payrollRun) {
        throw new Error('First payroll run not found');
      }
      
      const baseSalary = [5000, 6000, 7000, 4500, 8000][i] || 5500;
      const allowances = baseSalary * 0.1;
      const deductions = baseSalary * 0.15;
      const netSalary = baseSalary + allowances - deductions;
      const netPay = netSalary;

      const detail = {
        employeeId: employee._id,
        baseSalary,
        allowances,
        deductions,
        netSalary,
        netPay,
        bankStatus: i === 0 ? BankStatus.MISSING : BankStatus.VALID, // First employee has missing bank
        exceptions: i === 0 ? 'Missing bank account details' : undefined,
        payrollRunId: payrollRun._id,
      };

      const existing = await employeePayrollDetailsModel.findOne({
        employeeId: employee._id,
        payrollRunId: payrollRun._id,
      });

      if (!existing) {
        const created = await employeePayrollDetailsModel.create(detail);
        payrollDetails.push(created);
        console.log(`  ✅ Created payroll details for ${employee.fullName}`);
      } else {
        payrollDetails.push(existing);
        console.log(`  ℹ️  Exists for ${employee.fullName}`);
      }
    }
    console.log(`✅ Created ${payrollDetails.length} payroll details\n`);

    // 4. Create Signing Bonuses
    console.log('🎁 Creating signing bonuses...');
    // Note: You'll need to create signing bonus configuration first
    // For now, we'll create employee signing bonus records with mock signingBonusId
    const mockSigningBonusId = new Types.ObjectId();
    
    if (regularEmployees.length < 3) {
      throw new Error('Not enough regular employees for signing bonuses');
    }
    
    const signingBonuses = [
      {
        employeeId: regularEmployees[0]._id,
        signingBonusId: mockSigningBonusId,
        givenAmount: 5000, // $5,000 signing bonus
        status: BonusStatus.PENDING,
        paymentDate: null,
      },
      {
        employeeId: regularEmployees[1]._id,
        signingBonusId: mockSigningBonusId,
        givenAmount: 7500, // $7,500 signing bonus
        status: BonusStatus.APPROVED,
        paymentDate: new Date('2025-02-15'),
      },
      {
        employeeId: regularEmployees[2]._id,
        signingBonusId: mockSigningBonusId,
        givenAmount: 3000, // $3,000 signing bonus
        status: BonusStatus.REJECTED,
        paymentDate: null,
      },
    ];

    for (const bonusData of signingBonuses) {
      const existing = await employeeSigningBonusModel.findOne({
        employeeId: bonusData.employeeId,
        signingBonusId: bonusData.signingBonusId,
      });

      if (!existing) {
        const bonus = await employeeSigningBonusModel.create(bonusData);
        console.log(`  ✅ Created signing bonus for employee ${bonusData.employeeId} - Status: ${bonus.status}`);
      } else {
        console.log(`  ℹ️  Exists for employee ${bonusData.employeeId}`);
      }
    }
    console.log(`✅ Created signing bonuses\n`);

    // 5. Create Termination Benefits (for terminated employees)
    console.log('🚪 Creating termination benefits...');
    // Note: This requires termination records and benefit configurations to be created first
    // For testing, we'll create records with mock IDs
    const mockBenefitId = new Types.ObjectId();
    const mockTerminationId = new Types.ObjectId();
    
    if (regularEmployees.length < 5) {
      throw new Error('Not enough regular employees for termination benefits');
    }
    
    const terminationBenefits = [
      {
        employeeId: regularEmployees[3]._id,
        benefitId: mockBenefitId,
        terminationId: mockTerminationId,
        givenAmount: 10000, // $10,000 termination benefit
        status: BenefitStatus.PENDING,
      },
      {
        employeeId: regularEmployees[4]._id,
        benefitId: mockBenefitId,
        terminationId: mockTerminationId,
        givenAmount: 15000, // $15,000 termination benefit
        status: BenefitStatus.APPROVED,
      },
    ];

    for (const benefitData of terminationBenefits) {
      const existing = await terminationResignationModel.findOne({
        employeeId: benefitData.employeeId,
        benefitId: benefitData.benefitId,
        terminationId: benefitData.terminationId,
      });

      if (!existing) {
        const benefit = await terminationResignationModel.create(benefitData);
        console.log(`  ✅ Created termination benefit for employee ${benefitData.employeeId} - Status: ${benefit.status} - Amount: $${benefit.givenAmount}`);
      } else {
        console.log(`  ℹ️  Exists for employee ${benefitData.employeeId}`);
      }
    }
    console.log(`✅ Created ${terminationBenefits.length} termination benefits\n`);

    // Summary
    console.log('========================================');
    console.log('✅ SEEDING COMPLETE!');
    console.log('========================================');
    console.log(`📊 Summary:`);
    console.log(`   - Employees: ${employees.length}`);
    console.log(`   - Payroll Runs: ${payrollRunsData.length}`);
    console.log(`   - Payroll Details: ${payrollDetails.length}`);
    console.log(`   - Signing Bonuses: ${signingBonuses.length}`);
    console.log(`   - Termination Benefits: ${terminationBenefits.length}`);
    console.log('');
    console.log('🔑 Important IDs for Testing:');
    console.log(`   - Payroll Specialist ID: ${payrollSpecialist._id}`);
    console.log(`   - Payroll Manager ID: ${payrollManager._id}`);
    console.log(`   - Finance Staff ID: ${financeStaff._id}`);
    if (payrollRunsData[0]) {
      console.log(`   - Payroll Run ID (DRAFT): ${payrollRunsData[0]._id}`);
    }
    if (payrollRunsData[1]) {
      console.log(`   - Payroll Run ID (UNDER_REVIEW): ${payrollRunsData[1]._id}`);
    }
    console.log(`   - Employee IDs: ${regularEmployees.map(e => e._id).join(', ')}`);
    console.log('');
    console.log('🧪 You can now test the API endpoints with Postman!');
    console.log('========================================\n');

  } catch (error) {
    console.error('❌ Error seeding data:', error);
    throw error;
  } finally {
    await app.close();
  }
}

// Run the seed
seedPayrollTestData()
  .then(() => {
    console.log('✅ Seed script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seed script failed:', error);
    process.exit(1);
  });

