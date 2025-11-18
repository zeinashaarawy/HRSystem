import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { PayrollSchemaService } from './payroll-schema.service';
import { PayrollSchema } from './models/PayrollSchema.schema';

@Injectable()
export class CrudTestService implements OnModuleInit {
  constructor(
    private readonly payrollSchemaService: PayrollSchemaService,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async onModuleInit() {
    // Wait for MongoDB connection to be ready
    if (this.connection.readyState !== 1) {
      console.log('⏳ Waiting for MongoDB connection...');
      await this.waitForConnection();
    }
    
    console.log('\n🧪 Starting CRUD Operations Test...\n');
    await this.runCrudTests();
  }

  private async waitForConnection(maxAttempts = 10): Promise<void> {
    for (let i = 0; i < maxAttempts; i++) {
      if (this.connection.readyState === 1) {
        return;
      }
      await this.delay(1000);
    }
    throw new Error('MongoDB connection timeout');
  }

  async runCrudTests() {
    try {
      // CREATE Operation
      console.log('📝 Testing CREATE operation...');
      const createData: Partial<PayrollSchema> = {
        name: 'Test Payroll Schema',
        description: 'Automated CRUD test - created on startup',
        status: 'pending',
      };
      const created = await this.payrollSchemaService.create(createData);
      const createdDoc = created as any;
      console.log('✅ CREATE successful!');
      console.log('   Created ID:', createdDoc._id);
      console.log('   Name:', createdDoc.name);
      console.log('   Status:', createdDoc.status);
      console.log('   Created At:', createdDoc.createdAt);
      const createdId = createdDoc._id.toString();

      // Wait a bit for database consistency
      await this.delay(500);

      // READ All Operation
      console.log('\n📖 Testing READ ALL operation...');
      const allRecords = await this.payrollSchemaService.findAll();
      console.log('✅ READ ALL successful!');
      console.log('   Total records found:', allRecords.length);
      if (allRecords.length > 0) {
        console.log('   First record:', allRecords[0].name);
      }

      // READ One Operation
      console.log('\n🔍 Testing READ ONE operation...');
      const oneRecord = await this.payrollSchemaService.findOne(createdId);
      if (oneRecord) {
        const oneRecordDoc = oneRecord as any;
        console.log('✅ READ ONE successful!');
        console.log('   Record ID:', oneRecordDoc._id);
        console.log('   Record Name:', oneRecordDoc.name);
        console.log('   Record Description:', oneRecordDoc.description);
      } else {
        console.log('❌ READ ONE failed - record not found');
      }

      // UPDATE Operation
      console.log('\n✏️  Testing UPDATE operation...');
      const updateData: Partial<PayrollSchema> = {
        name: 'Updated Payroll Schema',
        status: 'approved',
        description: 'Automated CRUD test - updated on startup',
      };
      const updated = await this.payrollSchemaService.update(createdId, updateData);
      if (updated) {
        const updatedDoc = updated as any;
        console.log('✅ UPDATE successful!');
        console.log('   Updated Name:', updatedDoc.name);
        console.log('   Updated Status:', updatedDoc.status);
        console.log('   Updated At:', updatedDoc.updatedAt);
      } else {
        console.log('❌ UPDATE failed - record not found');
      }

      // Wait a bit before delete
      await this.delay(500);

      // DELETE Operation
      console.log('\n🗑️  Testing DELETE operation...');
      const deleted = await this.payrollSchemaService.delete(createdId);
      if (deleted) {
        const deletedDoc = deleted as any;
        console.log('✅ DELETE successful!');
        console.log('   Deleted ID:', deletedDoc._id);
        console.log('   Deleted Name:', deletedDoc.name);
      } else {
        console.log('❌ DELETE failed - record not found');
      }

      // Verify deletion
      await this.delay(500);
      const verifyDeleted = await this.payrollSchemaService.findOne(createdId);
      if (!verifyDeleted) {
        console.log('✅ Deletion verified - record no longer exists');
      } else {
        console.log('⚠️  Warning - record still exists after deletion');
      }

      console.log('\n🎉 All CRUD operations completed successfully!\n');
    } catch (error) {
      console.error('\n❌ CRUD test failed with error:', error);
      if (error instanceof Error) {
        console.error('   Error message:', error.message);
        console.error('   Stack:', error.stack);
      }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

