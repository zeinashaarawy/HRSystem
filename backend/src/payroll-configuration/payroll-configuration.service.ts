import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Optional,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ConfigStatus } from './enums/payroll-configuration-enums';
import { allowance } from './models/allowance.schema';
import { CompanyWideSettings } from './models/CompanyWideSettings.schema';
import { insuranceBrackets } from './models/insuranceBrackets.schema';
import { payGrade } from './models/payGrades.schema';
import { payrollPolicies } from './models/payrollPolicies.schema';
import { payType } from './models/payType.schema';
import { signingBonus } from './models/signingBonus.schema';
import { taxRules } from './models/taxRules.schema';
import { terminationAndResignationBenefits } from './models/terminationAndResignationBenefits';

type SupportedCollection =
  | 'allowance'
  | 'signingBonus'
  | 'taxRules'
  | 'insuranceBrackets'
  | 'payType'
  | 'payrollPolicies'
  | 'terminationAndResignationBenefits'
  | 'CompanyWideSettings'
  | 'payGrade';

const COLLECTION_MODEL_NAMES: Record<SupportedCollection, string> = {
  allowance: allowance.name,
  signingBonus: signingBonus.name,
  taxRules: taxRules.name,
  insuranceBrackets: insuranceBrackets.name,
  payType: payType.name,
  payrollPolicies: payrollPolicies.name,
  terminationAndResignationBenefits: terminationAndResignationBenefits.name,
  CompanyWideSettings: CompanyWideSettings.name,
  payGrade: payGrade.name,
};

@Injectable()
export class PayrollConfigurationService {
  constructor(
    @Optional()
    @InjectConnection()
    private readonly connection?: Connection,
  ) {}

  async editConfiguration(
    collection: string,
    configId: string,
    payload: Record<string, any>,
  ) {
    const model = this.getModel(collection);
    if (!payload || Object.keys(payload).length === 0) {
      throw new BadRequestException('Update payload is required');
    }

    const updatedDoc = await model
      .findByIdAndUpdate(configId, payload, {
        new: true,
      })
      .lean();

    if (!updatedDoc) {
      throw new NotFoundException(
        `Configuration ${configId} not found in ${collection}`,
      );
    }

    return updatedDoc;
  }

  async approveConfiguration(
    collection: string,
    configId: string,
    approverId: string,
  ) {
    if (!approverId) {
      throw new BadRequestException('approverId is required');
    }

    const model = this.getModel(collection);
    const approvedDoc = await model
      .findByIdAndUpdate(
        configId,
        {
          status: ConfigStatus.APPROVED,
          approvedBy: approverId,
          approvedAt: new Date(),
        },
        { new: true },
      )
      .lean();

    if (!approvedDoc) {
      throw new NotFoundException(
        `Configuration ${configId} not found in ${collection}`,
      );
    }

    return approvedDoc;
  }

  async deleteConfiguration(collection: string, configId: string) {
    if (collection === 'insuranceBrackets') {
      throw new ForbiddenException(
        'Insurance configuration cannot be deleted.',
      );
    }

    const model = this.getModel(collection);
    const deletedDoc = await model.findByIdAndDelete(configId).lean();

    if (!deletedDoc) {
      throw new NotFoundException(
        `Configuration ${configId} not found in ${collection}`,
      );
    }

    return deletedDoc;
  }

  private getModel(collection: string): Model<any> {
    if (!this.connection) {
      throw new InternalServerErrorException('Database connection unavailable');
    }

    if (!this.isSupportedCollection(collection)) {
      throw new BadRequestException(
        `Unsupported collection "${collection}".`,
      );
    }

    const modelName = COLLECTION_MODEL_NAMES[collection];
    return this.connection.model(modelName);
  }

  private isSupportedCollection(
    collection: string,
  ): collection is SupportedCollection {
    return collection in COLLECTION_MODEL_NAMES;
  }
}
