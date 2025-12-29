import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

async function seedSimpleData() {
  const app = await NestFactory.create(AppModule);

  const employeeProfileModel = app.get<Model<any>>(getModelToken('EmployeeProfile'));
  const contractModel = app.get<Model<any>>(getModelToken('Contract'));
  const terminationRequestModel = app.get<Model<any>>(getModelToken('TerminationRequest'));

  try {
    console.log('\n========== SIMPLE SEEDING FOR PAYROLL TESTING ==========\n');

    // Create dummy offer ID (we'll just use a valid MongoDB ObjectId)
    const dummyOfferId = new Types.ObjectId();

    console.log('🧹 Cleaning up old test data...');
    const testEmployees = await employeeProfileModel.find({ employeeNumber: /^EMP-TEST-/ }).select('_id');
    await employeeProfileModel.deleteMany({ employeeNumber: /^EMP-TEST-/ });
    await contractModel.deleteMany({ employeeId: { $in: testEmployees.map(e => e._id) } });
    await terminationRequestModel.deleteMany({ employeeId: { $in: testEmployees.map(e => e._id) } });
    console.log('✓ Old test data removed\n');

    console.log('📝 Creating test employees with contracts...');
    
    // Employee 1
    const employee1 = await employeeProfileModel.create({
      employeeNumber: 'EMP-TEST-001',
      firstName: 'Ahmed',
      lastName: 'Masoud',
      fullName: 'Ahmed Masoud',
      personalEmail: 'ahmed.masoud@example.com',
      workEmail: 'ahmed.masoud@company.com',
      mobilePhone: '+1234567890',
      nationalId: 'NAT-001-TEST',
      status: 'ACTIVE',
      dateOfHire: new Date('2020-01-15'),
      address: {
        streetAddress: '123 Main St',
        city: 'Cairo',
        country: 'Egypt',
      },
    });

    // Employee 1 Contract
    const contract1 = await contractModel.create({
      offerId: dummyOfferId,
      grossSalary: 50000,
      acceptanceDate: new Date('2020-01-15'),
      role: 'Senior Developer',
    });

    // Employee 2
    const employee2 = await employeeProfileModel.create({
      employeeNumber: 'EMP-TEST-002',
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      personalEmail: 'john.doe@example.com',
      workEmail: 'john.doe@company.com',
      mobilePhone: '+1234567891',
      nationalId: 'NAT-002-TEST',
      status: 'ACTIVE',
      dateOfHire: new Date('2019-06-10'),
      address: {
        streetAddress: '456 Oak Ave',
        city: 'Giza',
        country: 'Egypt',
      },
    });

    // Employee 2 Contract
    const contract2 = await contractModel.create({
      offerId: dummyOfferId,
      grossSalary: 65000,
      acceptanceDate: new Date('2019-06-10'),
      role: 'Project Manager',
    });

    // Employee 3
    const employee3 = await employeeProfileModel.create({
      employeeNumber: 'EMP-TEST-003',
      firstName: 'Sarah',
      lastName: 'Johnson',
      fullName: 'Sarah Johnson',
      personalEmail: 'sarah.johnson@example.com',
      workEmail: 'sarah.johnson@company.com',
      mobilePhone: '+1234567892',
      nationalId: 'NAT-003-TEST',
      status: 'ACTIVE',
      dateOfHire: new Date('2018-03-20'),
      address: {
        streetAddress: '789 Elm St',
        city: 'Alexandria',
        country: 'Egypt',
      },
    });

    // Employee 3 Contract
    const contract3 = await contractModel.create({
      offerId: dummyOfferId,
      grossSalary: 75000,
      acceptanceDate: new Date('2018-03-20'),
      role: 'Director',
    });

    console.log('✓ Employees and contracts created:');
    console.log(`  Employee 1: ${employee1._id.toString()} (Salary: 50,000)`);
    console.log(`  Employee 2: ${employee2._id.toString()} (Salary: 65,000)`);
    console.log(`  Employee 3: ${employee3._id.toString()} (Salary: 75,000)\n`);

    console.log('📋 Creating UNDER_REVIEW termination requests...');
    
    const termReq1 = await terminationRequestModel.create({
      employeeId: employee1._id,
      contractId: contract1._id,
      initiator: 'employee',
      reason: 'Resignation - Personal reasons',
      employeeComments: 'Need to relocate to another city',
      status: 'under_review',
      terminationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    const termReq2 = await terminationRequestModel.create({
      employeeId: employee2._id,
      contractId: contract2._id,
      initiator: 'manager',
      reason: 'Performance issues',
      employeeComments: 'Consistent performance gaps despite feedback',
      status: 'under_review',
      terminationDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    });

    const termReq3 = await terminationRequestModel.create({
      employeeId: employee3._id,
      contractId: contract3._id,
      initiator: 'employee',
      reason: 'Resignation - Better opportunity',
      employeeComments: 'Accepted position at competitor',
      status: 'under_review',
      terminationDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    });

    console.log('✓ Termination requests created (UNDER_REVIEW status):\n');

    console.log('========== SEEDING COMPLETE ==========\n');
    console.log('Next steps:');
    console.log('1. Test payroll calculation - employees with contracts should now be processed');
    console.log('2. Approve termination requests to trigger auto-creation of termination benefits');
    console.log('3. Query termination-benefits/processed endpoint to view auto-created benefits\n');

  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

seedSimpleData();
