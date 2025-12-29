import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

async function seedTerminationData() {
  const app = await NestFactory.create(AppModule);

  const employeeProfileModel = app.get<Model<any>>(getModelToken('EmployeeProfile'));
  const contractModel = app.get<Model<any>>(getModelToken('Contract'));
  const terminationRequestModel = app.get<Model<any>>(getModelToken('TerminationRequest'));
  const offerModel = app.get<Model<any>>(getModelToken('Offer'));
  const applicationModel = app.get<Model<any>>(getModelToken('Application'));
  const candidateModel = app.get<Model<any>>(getModelToken('Candidate'));
  const requisitionModel = app.get<Model<any>>(getModelToken('JobRequisition'));

  try {
    console.log('\n========== SEEDING TEST DATA ==========\n');

    // Clear any existing test data
    console.log('🧹 Cleaning up old test data...');
    const testEmployees = await employeeProfileModel.find({ employeeNumber: /^EMP-TEST-/ }).select('_id');
    await employeeProfileModel.deleteMany({ employeeNumber: /^EMP-TEST-/ });
    await contractModel.deleteMany({ employeeId: { $in: testEmployees.map(e => e._id) } });
    await terminationRequestModel.deleteMany({ employeeId: { $in: testEmployees.map(e => e._id) } });
    console.log('✓ Old test data removed\n');

    console.log('📝 Creating test employees...');
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

    console.log('✓ Employees created:');
    console.log(`  - Employee 1 ID: ${employee1._id.toString()}`);
    console.log(`  - Employee 2 ID: ${employee2._id.toString()}`);
    console.log(`  - Employee 3 ID: ${employee3._id.toString()}\n`);

    console.log('📋 Creating dummy job requisitions...');
    const req1 = await requisitionModel.create({
      title: 'Senior Developer',
      description: 'Senior Software Developer Position',
      status: 'closed',
    });

    const req2 = await requisitionModel.create({
      title: 'Project Manager',
      description: 'Project Manager Position',
      status: 'closed',
    });

    const req3 = await requisitionModel.create({
      title: 'Director',
      description: 'Director Position',
      status: 'closed',
    });

    console.log('✓ Job Requisitions created\n');

    console.log('📋 Creating dummy candidates...');
    const candidate1 = await candidateModel.create({
      candidateNumber: 'CAND-TEST-001',
      firstName: 'Ahmed',
      lastName: 'Masoud',
      nationalId: 'NAT-001-TEST',
      personalEmail: 'ahmed.masoud@example.com',
      mobilePhone: '+1234567890',
      status: 'HIRED',
    });

    const candidate2 = await candidateModel.create({
      candidateNumber: 'CAND-TEST-002',
      firstName: 'John',
      lastName: 'Doe',
      nationalId: 'NAT-002-TEST',
      personalEmail: 'john.doe@example.com',
      mobilePhone: '+1234567891',
      status: 'HIRED',
    });

    const candidate3 = await candidateModel.create({
      candidateNumber: 'CAND-TEST-003',
      firstName: 'Sarah',
      lastName: 'Johnson',
      nationalId: 'NAT-003-TEST',
      personalEmail: 'sarah.johnson@example.com',
      mobilePhone: '+1234567892',
      status: 'HIRED',
    });

    console.log('✓ Candidates created\n');

    console.log('📋 Creating dummy applications...');
    const app1 = await applicationModel.create({
      candidateId: candidate1._id,
      requisitionId: req1._id,
      status: 'accepted',
      currentStage: 'offer_accepted',
    });

    const app2 = await applicationModel.create({
      candidateId: candidate2._id,
      requisitionId: req2._id,
      status: 'accepted',
      currentStage: 'offer_accepted',
    });

    const app3 = await applicationModel.create({
      candidateId: candidate3._id,
      requisitionId: req3._id,
      status: 'accepted',
      currentStage: 'offer_accepted',
    });

    console.log('✓ Applications created\n');

    console.log('📋 Creating dummy offers...');
    const offer1 = await offerModel.create({
      applicationId: app1._id,
      candidateId: candidate1._id,
      grossSalary: 50000,
      role: 'Senior Developer',
      content: 'Job Offer',
      finalStatus: 'accepted',
    });

    const offer2 = await offerModel.create({
      applicationId: app2._id,
      candidateId: candidate2._id,
      grossSalary: 65000,
      role: 'Project Manager',
      content: 'Job Offer',
      finalStatus: 'accepted',
    });

    const offer3 = await offerModel.create({
      applicationId: app3._id,
      candidateId: candidate3._id,
      grossSalary: 75000,
      role: 'Director',
      content: 'Job Offer',
      finalStatus: 'accepted',
    });

    console.log('✓ Offers created\n');

    console.log('📋 Creating contracts with salary data...');
    const contract1 = await contractModel.create({
      offerId: offer1._id,
      grossSalary: 50000,
      acceptanceDate: new Date('2020-01-15'),
      role: 'Senior Developer',
    });

    const contract2 = await contractModel.create({
      offerId: offer2._id,
      grossSalary: 65000,
      acceptanceDate: new Date('2019-06-10'),
      role: 'Project Manager',
    });

    const contract3 = await contractModel.create({
      offerId: offer3._id,
      grossSalary: 75000,
      acceptanceDate: new Date('2018-03-20'),
      role: 'Director',
    });

    console.log('✓ Contracts created:');
    console.log(`  - Contract 1: ${contract1._id.toString()} (Salary: 50,000)`);
    console.log(`  - Contract 2: ${contract2._id.toString()} (Salary: 65,000)`);
    console.log(`  - Contract 3: ${contract3._id.toString()} (Salary: 75,000)\n`);

    console.log('📋 Creating UNAPPROVED termination requests (status: UNDER_REVIEW)...');
    console.log('   (You will approve these to trigger auto-creation of termination benefits)\n');

    const termReq1 = await terminationRequestModel.create({
      employeeId: employee1._id,
      contractId: contract1._id,
      initiator: 'EMPLOYEE',
      reason: 'Resignation - Personal reasons',
      employeeComments: 'Need to relocate to another city',
      status: 'under_review',
      terminationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    });

    const termReq2 = await terminationRequestModel.create({
      employeeId: employee2._id,
      contractId: contract2._id,
      initiator: 'COMPANY',
      reason: 'Performance issues',
      managerComments: 'Consistent performance gaps despite feedback',
      status: 'under_review',
      terminationDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    });

    const termReq3 = await terminationRequestModel.create({
      employeeId: employee3._id,
      contractId: contract3._id,
      initiator: 'EMPLOYEE',
      reason: 'Resignation - Better opportunity',
      employeeComments: 'Accepted position at competitor',
      status: 'under_review',
      terminationDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
    });

    console.log('✓ Termination requests created (UNDER_REVIEW status):');
    console.log(`  - Termination Req 1 ID: ${termReq1._id.toString()}`);
    console.log(`  - Termination Req 2 ID: ${termReq2._id.toString()}`);
    console.log(`  - Termination Req 3 ID: ${termReq3._id.toString()}\n`);

    console.log('========== NEXT STEPS ==========\n');
    console.log('1. Approve the termination requests via your system API/UI');
    console.log('   (When approved, auto-created termination benefit records will be generated)\n');
    console.log('2. Query the API endpoint to see the auto-created benefits:');
    console.log('   GET /api/v1/payroll-execution/termination-benefits/processed\n');
    console.log('3. Test filtering by employee ID or status\n');
    console.log('========== SEEDING COMPLETE ==========\n');

  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

seedTerminationData();
