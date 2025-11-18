import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class CollectionsInitService implements OnModuleInit {
  private readonly logger = new Logger(CollectionsInitService.name);

  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit(): Promise<void> {
    // Ensure the most critical collections are created so that the
    // application can start without runtime collection-creation races.
    const requiredCollections = [
      'payrollruns',
      'payrollrunemployees',
      'payrollapprovals',
      'payslips',
      'payrollexceptions',
    ];

    for (const collectionName of requiredCollections) {
      try {
        const exists = await this.connection.db
          .listCollections({ name: collectionName })
          .hasNext();

        if (!exists) {
          await this.connection.createCollection(collectionName);
          this.logger.log(`Created collection '${collectionName}'.`);
        }
      } catch (error) {
        this.logger.error(
          `Failed to ensure collection '${collectionName}': ${error?.message}`,
        );
      }
    }
  }
}

