import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PayrollRunEmployeeService } from './payroll-run-employee.service';
import { CreatePayrollRunEmployeeDto } from './dto/create-payroll-run-employee.dto';
import { UpdatePayrollRunEmployeeDto } from './dto/update-payroll-run-employee.dto';

@Injectable()
export class PayrollRunEmployeeCrudTestService implements OnApplicationBootstrap {
  private readonly logger = new Logger(PayrollRunEmployeeCrudTestService.name);

  constructor(
    private readonly payrollRunEmployeeService: PayrollRunEmployeeService,
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    // Check if CRUD tests should run (default: true for development)
    const runCrudTests = this.configService.get<string>('RUN_CRUD_TESTS', 'true') === 'true';
    
    if (!runCrudTests) {
      this.logger.log('CRUD tests are disabled (set RUN_CRUD_TESTS=false to disable)');
      return;
    }

    // Wait a bit for MongoDB connection to be fully established
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    this.logger.log('=========================================');
    this.logger.log('Starting CRUD Operations Test');
    this.logger.log('=========================================');

    try {
      await this.runCrudTests();
    } catch (error) {
      this.logger.error('CRUD Test failed:', error);
    }
  }

  private async runCrudTests() {
    const testPayrollRunId = '507f1f77bcf86cd799439011';
    const testEmployeeId = '507f1f77bcf86cd799439012';
    let createdId: string;

    // 1. CREATE - Create a new PayrollRunEmployee
    this.logger.log('1. CREATE - Creating a new PayrollRunEmployee...');
    try {
      const createDto: CreatePayrollRunEmployeeDto = {
        payrollRunId: testPayrollRunId,
        employeeId: testEmployeeId,
        employeeStatus: 'Normal',
        signingBonusApplied: false,
        grossSalary: 5000,
        allowances: {
          housing: 1000,
          transport: 700,
        },
        taxes: {
          incomeTax: 500,
        },
        insurance: {
          social: 320,
          health: 100,
        },
        deductions: {},
        netSalary: 4080,
        finalSalary: 4080,
        calculationStatus: 'Draft',
      };

      const created = await this.payrollRunEmployeeService.create(createDto);
      createdId = created._id.toString();
      this.logger.log(`✓ Created successfully! ID: ${createdId}`);
      this.logger.log(`  Employee Status: ${created.employeeStatus}`);
      this.logger.log(`  Gross Salary: ${created.grossSalary}`);
      this.logger.log(`  Calculation Status: ${created.calculationStatus}`);
    } catch (error) {
      this.logger.error(`✗ Create failed: ${error instanceof Error ? error.message : String(error)}`);
      return;
    }

    // 2. READ - Get all PayrollRunEmployees
    this.logger.log('2. READ - Getting all PayrollRunEmployees...');
    try {
      const all = await this.payrollRunEmployeeService.findAll();
      this.logger.log(`✓ Retrieved ${all.length} record(s)`);
    } catch (error) {
      this.logger.error(`✗ Read all failed: ${error instanceof Error ? error.message : String(error)}`);
    }

    // 3. READ - Get by ID
    this.logger.log('3. READ - Getting PayrollRunEmployee by ID...');
    try {
      const single = await this.payrollRunEmployeeService.findOne(createdId);
      this.logger.log('✓ Retrieved by ID successfully!');
      this.logger.log(`  Employee Status: ${single.employeeStatus}`);
      this.logger.log(`  Gross Salary: ${single.grossSalary}`);
      this.logger.log(`  Calculation Status: ${single.calculationStatus}`);
    } catch (error) {
      this.logger.error(`✗ Read by ID failed: ${error instanceof Error ? error.message : String(error)}`);
    }

    // 4. READ - Get by PayrollRun ID
    this.logger.log('4. READ - Getting PayrollRunEmployees by PayrollRun ID...');
    try {
      const byPayrollRun = await this.payrollRunEmployeeService.findByPayrollRunId(
        testPayrollRunId,
      );
      this.logger.log(
        `✓ Retrieved ${byPayrollRun.length} record(s) for PayrollRun ID`,
      );
    } catch (error) {
      this.logger.error(`✗ Read by PayrollRun ID failed: ${error instanceof Error ? error.message : String(error)}`);
    }

    // 5. READ - Get by Employee ID
    this.logger.log('5. READ - Getting PayrollRunEmployees by Employee ID...');
    try {
      const byEmployee = await this.payrollRunEmployeeService.findByEmployeeId(
        testEmployeeId,
      );
      this.logger.log(
        `✓ Retrieved ${byEmployee.length} record(s) for Employee ID`,
      );
    } catch (error) {
      this.logger.error(`✗ Read by Employee ID failed: ${error instanceof Error ? error.message : String(error)}`);
    }

    // 6. UPDATE - Update the PayrollRunEmployee
    this.logger.log('6. UPDATE - Updating PayrollRunEmployee...');
    try {
      const updateDto: UpdatePayrollRunEmployeeDto = {
        calculationStatus: 'Finalized',
        grossSalary: 5500,
        netSalary: 4480,
        finalSalary: 4480,
      };

      const updated = await this.payrollRunEmployeeService.update(
        createdId,
        updateDto,
      );
      this.logger.log('✓ Updated successfully!');
      this.logger.log(`  New Calculation Status: ${updated.calculationStatus}`);
      this.logger.log(`  New Gross Salary: ${updated.grossSalary}`);
    } catch (error) {
      this.logger.error(`✗ Update failed: ${error instanceof Error ? error.message : String(error)}`);
    }

    // 7. DELETE - Delete the PayrollRunEmployee
    this.logger.log('7. DELETE - Deleting PayrollRunEmployee...');
    try {
      await this.payrollRunEmployeeService.remove(createdId);
      this.logger.log('✓ Deleted successfully!');
    } catch (error) {
      this.logger.error(`✗ Delete failed: ${error instanceof Error ? error.message : String(error)}`);
    }

    // 8. VERIFY - Verify deletion
    this.logger.log('8. VERIFY - Verifying deletion...');
    try {
      await this.payrollRunEmployeeService.findOne(createdId);
      this.logger.error('✗ Record still exists (should have been deleted)');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes('not found')) {
        this.logger.log('✓ Record successfully deleted (404 expected)');
      } else {
        this.logger.error(`✗ Verification failed: ${errorMessage}`);
      }
    }

    this.logger.log('=========================================');
    this.logger.log('All CRUD operations completed!');
    this.logger.log('=========================================');
  }
}

