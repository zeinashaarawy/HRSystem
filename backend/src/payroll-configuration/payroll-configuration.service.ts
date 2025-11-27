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
    if (collection === 'insuranceBrackets') {
      return this.updateInsuranceBracket(configId, payload);
    }

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
    if (collection === 'insuranceBrackets') {
      return this.approveInsuranceBracket(configId, approverId);
    }

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
      return this.deleteInsuranceBracket(configId);
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

  async rejectInsuranceBracket(configId: string, reviewerId: string) {
    if (!reviewerId) {
      throw new BadRequestException('reviewerId is required');
    }

    const doc = await this.findInsuranceBracketOrThrow(configId);
    if (doc.status === ConfigStatus.REJECTED) {
      throw new BadRequestException('Insurance bracket already rejected.');
    }

    doc.status = ConfigStatus.REJECTED;
    doc.approvedBy = undefined;
    doc.approvedAt = undefined;

    await doc.save();
    return doc.toObject();
  }

  async listInsuranceBrackets(status?: ConfigStatus) {
    const model = this.getModel('insuranceBrackets');
    const filter: Record<string, any> = {};

    if (status) {
      filter.status = status;
    }

    return model.find(filter).sort({ createdAt: -1 }).lean();
  }

  async getInsuranceBracket(configId: string) {
    const doc = await this.getInsuranceBracketLean(configId);
    if (!doc) {
      throw new NotFoundException(
        `Configuration ${configId} not found in insuranceBrackets`,
      );
    }

    return doc;
  }

  async updateInsuranceBracket(
    configId: string,
    payload: Record<string, any>,
  ) {
    if (!payload || Object.keys(payload).length === 0) {
      throw new BadRequestException('Update payload is required');
    }

    const sanitizedPayload = this.ensureEditableInsuranceFields(payload);
    if (Object.keys(sanitizedPayload).length === 0) {
      throw new BadRequestException('No editable fields provided');
    }

    const doc = await this.findInsuranceBracketOrThrow(configId);
    if (doc.status === ConfigStatus.APPROVED) {
      throw new BadRequestException(
        'Approved insurance brackets cannot be edited.',
      );
    }

    doc.set(sanitizedPayload);
    await doc.save();
    return doc.toObject();
  }

  async approveInsuranceBracket(configId: string, approverId: string) {
    if (!approverId) {
      throw new BadRequestException('approverId is required');
    }

    const doc = await this.findInsuranceBracketOrThrow(configId);
    if (doc.status === ConfigStatus.APPROVED) {
      throw new BadRequestException('Insurance bracket already approved.');
    }

    doc.status = ConfigStatus.APPROVED;
    doc.approvedBy = approverId as any;
    doc.approvedAt = new Date();

    await doc.save();
    return doc.toObject();
  }

  async deleteInsuranceBracket(configId: string) {
    const doc = await this.findInsuranceBracketOrThrow(configId);
    if (doc.status === ConfigStatus.APPROVED) {
      throw new ForbiddenException(
        'Approved insurance brackets cannot be deleted.',
      );
    }

    const plainDoc = doc.toObject();
    await doc.deleteOne();
    return plainDoc;
  }

  private async getInsuranceBracketLean(configId: string) {
    const model = this.getModel('insuranceBrackets');
    return model.findById(configId).lean();
  }

  private async findInsuranceBracketOrThrow(configId: string) {
    const model = this.getModel('insuranceBrackets');
    const doc = await model.findById(configId);
    if (!doc) {
      throw new NotFoundException(
        `Configuration ${configId} not found in insuranceBrackets`,
      );
    }

    return doc;
  }

  private ensureEditableInsuranceFields(payload: Record<string, any>) {
    const sanitizedPayload: Record<string, any> = { ...payload };
    ['status', 'approvedBy', 'approvedAt', '_id', 'createdAt', 'updatedAt'].forEach(
      (field) => delete sanitizedPayload[field],
    );
    return sanitizedPayload;
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
