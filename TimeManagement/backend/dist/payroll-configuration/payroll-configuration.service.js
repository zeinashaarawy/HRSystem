"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollConfigurationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const payroll_configuration_enums_1 = require("./enums/payroll-configuration-enums");
const allowance_schema_1 = require("./models/allowance.schema");
const CompanyWideSettings_schema_1 = require("./models/CompanyWideSettings.schema");
const insuranceBrackets_schema_1 = require("./models/insuranceBrackets.schema");
const payGrades_schema_1 = require("./models/payGrades.schema");
const payrollPolicies_schema_1 = require("./models/payrollPolicies.schema");
const payType_schema_1 = require("./models/payType.schema");
const signingBonus_schema_1 = require("./models/signingBonus.schema");
const taxRules_schema_1 = require("./models/taxRules.schema");
const terminationAndResignationBenefits_1 = require("./models/terminationAndResignationBenefits");
const COLLECTION_MODEL_NAMES = {
    allowance: allowance_schema_1.allowance.name,
    signingBonus: signingBonus_schema_1.signingBonus.name,
    taxRules: taxRules_schema_1.taxRules.name,
    insuranceBrackets: insuranceBrackets_schema_1.insuranceBrackets.name,
    payType: payType_schema_1.payType.name,
    payrollPolicies: payrollPolicies_schema_1.payrollPolicies.name,
    terminationAndResignationBenefits: terminationAndResignationBenefits_1.terminationAndResignationBenefits.name,
    CompanyWideSettings: CompanyWideSettings_schema_1.CompanyWideSettings.name,
    payGrade: payGrades_schema_1.payGrade.name,
};
let PayrollConfigurationService = class PayrollConfigurationService {
    connection;
    constructor(connection) {
        this.connection = connection;
    }
    async editConfiguration(collection, configId, payload) {
        if (collection === 'insuranceBrackets') {
            return this.updateInsuranceBracket(configId, payload);
        }
        const model = this.getModel(collection);
        if (!payload || Object.keys(payload).length === 0) {
            throw new common_1.BadRequestException('Update payload is required');
        }
        const existingDoc = (await model.findById(configId).lean());
        if (!existingDoc) {
            throw new common_1.NotFoundException(`Configuration ${configId} not found in ${collection}`);
        }
        if (existingDoc.status !== payroll_configuration_enums_1.ConfigStatus.DRAFT) {
            throw new common_1.BadRequestException(`Configuration can only be edited when status is ${payroll_configuration_enums_1.ConfigStatus.DRAFT}`);
        }
        const sanitizedPayload = this.sanitizePayload(payload);
        const updatedDoc = await model
            .findByIdAndUpdate(configId, sanitizedPayload, {
            new: true,
        })
            .lean();
        return updatedDoc;
    }
    async approveConfiguration(collection, configId, approverId) {
        if (collection === 'insuranceBrackets') {
            return this.approveInsuranceBracket(configId, approverId);
        }
        if (!approverId) {
            throw new common_1.BadRequestException('approverId is required');
        }
        const model = this.getModel(collection);
        const approvedDoc = await model
            .findByIdAndUpdate(configId, {
            status: payroll_configuration_enums_1.ConfigStatus.APPROVED,
            approvedBy: approverId,
            approvedAt: new Date(),
        }, { new: true })
            .lean();
        if (!approvedDoc) {
            throw new common_1.NotFoundException(`Configuration ${configId} not found in ${collection}`);
        }
        return approvedDoc;
    }
    async deleteConfiguration(collection, configId) {
        if (collection === 'insuranceBrackets') {
            return this.deleteInsuranceBracket(configId);
        }
        const model = this.getModel(collection);
        const deletedDoc = await model.findByIdAndDelete(configId).lean();
        if (!deletedDoc) {
            throw new common_1.NotFoundException(`Configuration ${configId} not found in ${collection}`);
        }
        return deletedDoc;
    }
    async rejectInsuranceBracket(configId, reviewerId) {
        if (!reviewerId) {
            throw new common_1.BadRequestException('reviewerId is required');
        }
        const doc = await this.findInsuranceBracketOrThrow(configId);
        if (doc.status === payroll_configuration_enums_1.ConfigStatus.REJECTED) {
            throw new common_1.BadRequestException('Insurance bracket already rejected.');
        }
        doc.status = payroll_configuration_enums_1.ConfigStatus.REJECTED;
        doc.approvedBy = undefined;
        doc.approvedAt = undefined;
        await doc.save();
        return doc.toObject();
    }
    async listInsuranceBrackets(status) {
        const model = this.getModel('insuranceBrackets');
        const filter = {};
        if (status) {
            filter.status = status;
        }
        return model.find(filter).sort({ createdAt: -1 }).lean();
    }
    async getInsuranceBracket(configId) {
        const doc = await this.getInsuranceBracketLean(configId);
        if (!doc) {
            throw new common_1.NotFoundException(`Configuration ${configId} not found in insuranceBrackets`);
        }
        return doc;
    }
    async createInsuranceBracket(payload) {
        const model = this.getModel('insuranceBrackets');
        const newInsuranceBracket = new model({
            ...payload,
            status: payroll_configuration_enums_1.ConfigStatus.DRAFT,
        });
        return (await newInsuranceBracket.save()).toObject();
    }
    async updateInsuranceBracket(configId, payload) {
        if (!payload || Object.keys(payload).length === 0) {
            throw new common_1.BadRequestException('Update payload is required');
        }
        const sanitizedPayload = this.ensureEditableInsuranceFields(payload);
        if (Object.keys(sanitizedPayload).length === 0) {
            throw new common_1.BadRequestException('No editable fields provided');
        }
        const doc = await this.findInsuranceBracketOrThrow(configId);
        if (doc.status !== payroll_configuration_enums_1.ConfigStatus.DRAFT) {
            throw new common_1.BadRequestException(`Insurance bracket can only be edited when status is ${payroll_configuration_enums_1.ConfigStatus.DRAFT}`);
        }
        doc.set(sanitizedPayload);
        await doc.save();
        return doc.toObject();
    }
    async approveInsuranceBracket(configId, approverId) {
        if (!approverId) {
            throw new common_1.BadRequestException('approverId is required');
        }
        const doc = await this.findInsuranceBracketOrThrow(configId);
        if (doc.status === payroll_configuration_enums_1.ConfigStatus.APPROVED) {
            throw new common_1.BadRequestException('Insurance bracket already approved.');
        }
        doc.status = payroll_configuration_enums_1.ConfigStatus.APPROVED;
        doc.approvedBy = approverId;
        doc.approvedAt = new Date();
        await doc.save();
        return doc.toObject();
    }
    async deleteInsuranceBracket(configId) {
        const doc = await this.findInsuranceBracketOrThrow(configId);
        if (doc.status === payroll_configuration_enums_1.ConfigStatus.APPROVED) {
            throw new common_1.ForbiddenException('Approved insurance brackets cannot be deleted.');
        }
        const plainDoc = doc.toObject();
        await doc.deleteOne();
        return plainDoc;
    }
    async getInsuranceBracketLean(configId) {
        const model = this.getModel('insuranceBrackets');
        return model.findById(configId).lean();
    }
    async findInsuranceBracketOrThrow(configId) {
        const model = this.getModel('insuranceBrackets');
        const doc = await model.findById(configId);
        if (!doc) {
            throw new common_1.NotFoundException(`Configuration ${configId} not found in insuranceBrackets`);
        }
        return doc;
    }
    ensureEditableInsuranceFields(payload) {
        const sanitizedPayload = { ...payload };
        [
            'status',
            'approvedBy',
            'approvedAt',
            '_id',
            'createdAt',
            'updatedAt',
        ].forEach((field) => delete sanitizedPayload[field]);
        return sanitizedPayload;
    }
    sanitizePayload(payload) {
        const sanitizedPayload = { ...payload };
        [
            'status',
            'approvedBy',
            'approvedAt',
            '_id',
            'createdAt',
            'updatedAt',
        ].forEach((field) => delete sanitizedPayload[field]);
        return sanitizedPayload;
    }
    async createPayrollPolicy(payload) {
        const model = this.getModel('payrollPolicies');
        const newPolicy = new model({
            ...payload,
            status: payroll_configuration_enums_1.ConfigStatus.DRAFT,
        });
        return (await newPolicy.save()).toObject();
    }
    async updatePayrollPolicy(configId, payload) {
        if (!payload || Object.keys(payload).length === 0) {
            throw new common_1.BadRequestException('Update payload is required');
        }
        const sanitizedPayload = this.sanitizePayload(payload);
        if (Object.keys(sanitizedPayload).length === 0) {
            throw new common_1.BadRequestException('No editable fields provided');
        }
        return this.editConfiguration('payrollPolicies', configId, sanitizedPayload);
    }
    async getPayrollPolicy(configId) {
        const model = this.getModel('payrollPolicies');
        const doc = await model.findById(configId).lean();
        if (!doc) {
            throw new common_1.NotFoundException(`Payroll policy ${configId} not found`);
        }
        return doc;
    }
    async listPayrollPolicies(status) {
        const model = this.getModel('payrollPolicies');
        const filter = {};
        if (status) {
            filter.status = status;
        }
        return model.find(filter).sort({ createdAt: -1 }).lean();
    }
    async createPayGrade(payload) {
        const model = this.getModel('payGrade');
        const newPayGrade = new model({
            ...payload,
            status: payroll_configuration_enums_1.ConfigStatus.DRAFT,
        });
        return (await newPayGrade.save()).toObject();
    }
    async updatePayGrade(configId, payload) {
        if (!payload || Object.keys(payload).length === 0) {
            throw new common_1.BadRequestException('Update payload is required');
        }
        const sanitizedPayload = this.sanitizePayload(payload);
        if (Object.keys(sanitizedPayload).length === 0) {
            throw new common_1.BadRequestException('No editable fields provided');
        }
        return this.editConfiguration('payGrade', configId, sanitizedPayload);
    }
    async getPayGrade(configId) {
        const model = this.getModel('payGrade');
        const doc = await model.findById(configId).lean();
        if (!doc) {
            throw new common_1.NotFoundException(`Pay grade ${configId} not found`);
        }
        return doc;
    }
    async listPayGrades(status) {
        const model = this.getModel('payGrade');
        const filter = {};
        if (status) {
            filter.status = status;
        }
        return model.find(filter).sort({ createdAt: -1 }).lean();
    }
    async createPayType(payload) {
        const model = this.getModel('payType');
        const newPayType = new model({
            ...payload,
            status: payroll_configuration_enums_1.ConfigStatus.DRAFT,
        });
        return (await newPayType.save()).toObject();
    }
    async updatePayType(configId, payload) {
        if (!payload || Object.keys(payload).length === 0) {
            throw new common_1.BadRequestException('Update payload is required');
        }
        const sanitizedPayload = this.sanitizePayload(payload);
        if (Object.keys(sanitizedPayload).length === 0) {
            throw new common_1.BadRequestException('No editable fields provided');
        }
        return this.editConfiguration('payType', configId, sanitizedPayload);
    }
    async getPayType(configId) {
        const model = this.getModel('payType');
        const doc = await model.findById(configId).lean();
        if (!doc) {
            throw new common_1.NotFoundException(`Pay type ${configId} not found`);
        }
        return doc;
    }
    async listPayTypes(status) {
        const model = this.getModel('payType');
        const filter = {};
        if (status) {
            filter.status = status;
        }
        return model.find(filter).sort({ createdAt: -1 }).lean();
    }
    async createAllowance(payload) {
        const model = this.getModel('allowance');
        const newAllowance = new model({
            ...payload,
            status: payroll_configuration_enums_1.ConfigStatus.DRAFT,
        });
        return (await newAllowance.save()).toObject();
    }
    async updateAllowance(configId, payload) {
        if (!payload || Object.keys(payload).length === 0) {
            throw new common_1.BadRequestException('Update payload is required');
        }
        const sanitizedPayload = this.sanitizePayload(payload);
        if (Object.keys(sanitizedPayload).length === 0) {
            throw new common_1.BadRequestException('No editable fields provided');
        }
        return this.editConfiguration('allowance', configId, sanitizedPayload);
    }
    async getAllowance(configId) {
        const model = this.getModel('allowance');
        const doc = await model.findById(configId).lean();
        if (!doc) {
            throw new common_1.NotFoundException(`Allowance ${configId} not found`);
        }
        return doc;
    }
    async listAllowances(status) {
        const model = this.getModel('allowance');
        const filter = {};
        if (status) {
            filter.status = status;
        }
        return model.find(filter).sort({ createdAt: -1 }).lean();
    }
    async createSigningBonus(payload) {
        const model = this.getModel('signingBonus');
        const newSigningBonus = new model({
            ...payload,
            status: payroll_configuration_enums_1.ConfigStatus.DRAFT,
        });
        return (await newSigningBonus.save()).toObject();
    }
    async updateSigningBonus(configId, payload) {
        if (!payload || Object.keys(payload).length === 0) {
            throw new common_1.BadRequestException('Update payload is required');
        }
        const sanitizedPayload = this.sanitizePayload(payload);
        if (Object.keys(sanitizedPayload).length === 0) {
            throw new common_1.BadRequestException('No editable fields provided');
        }
        return this.editConfiguration('signingBonus', configId, sanitizedPayload);
    }
    async getSigningBonus(configId) {
        const model = this.getModel('signingBonus');
        const doc = await model.findById(configId).lean();
        if (!doc) {
            throw new common_1.NotFoundException(`Signing bonus ${configId} not found`);
        }
        return doc;
    }
    async listSigningBonuses(status) {
        const model = this.getModel('signingBonus');
        const filter = {};
        if (status) {
            filter.status = status;
        }
        return model.find(filter).sort({ createdAt: -1 }).lean();
    }
    async createTerminationResignationBenefits(payload) {
        const model = this.getModel('terminationAndResignationBenefits');
        const newBenefit = new model({
            ...payload,
            status: payroll_configuration_enums_1.ConfigStatus.DRAFT,
        });
        return (await newBenefit.save()).toObject();
    }
    async updateTerminationResignationBenefits(configId, payload) {
        if (!payload || Object.keys(payload).length === 0) {
            throw new common_1.BadRequestException('Update payload is required');
        }
        const sanitizedPayload = this.sanitizePayload(payload);
        if (Object.keys(sanitizedPayload).length === 0) {
            throw new common_1.BadRequestException('No editable fields provided');
        }
        return this.editConfiguration('terminationAndResignationBenefits', configId, sanitizedPayload);
    }
    async getTerminationResignationBenefits(configId) {
        const model = this.getModel('terminationAndResignationBenefits');
        const doc = await model.findById(configId).lean();
        if (!doc) {
            throw new common_1.NotFoundException(`Termination/Resignation benefit ${configId} not found`);
        }
        return doc;
    }
    async listTerminationResignationBenefits(status) {
        const model = this.getModel('terminationAndResignationBenefits');
        const filter = {};
        if (status) {
            filter.status = status;
        }
        return model.find(filter).sort({ createdAt: -1 }).lean();
    }
    async createCompanyWideSettings(payload) {
        const model = this.getModel('CompanyWideSettings');
        if (!payload.payDate) {
            throw new common_1.BadRequestException('payDate is required');
        }
        if (!payload.timeZone) {
            throw new common_1.BadRequestException('timeZone is required');
        }
        if (!payload.currency) {
            throw new common_1.BadRequestException('currency is required');
        }
        const existingSettings = await model.findOne().lean();
        if (existingSettings) {
            throw new common_1.BadRequestException('Company-wide settings already exist. Use update endpoint to modify existing settings.');
        }
        const newSettings = new model({
            ...payload,
        });
        return (await newSettings.save()).toObject();
    }
    async updateCompanyWideSettings(configId, payload) {
        if (!payload || Object.keys(payload).length === 0) {
            throw new common_1.BadRequestException('Update payload is required');
        }
        const sanitizedPayload = this.sanitizePayload(payload);
        if (Object.keys(sanitizedPayload).length === 0) {
            throw new common_1.BadRequestException('No editable fields provided');
        }
        const model = this.getModel('CompanyWideSettings');
        const existingDoc = await model.findById(configId).lean();
        if (!existingDoc) {
            throw new common_1.NotFoundException(`Company-wide settings ${configId} not found`);
        }
        const updatedDoc = await model
            .findByIdAndUpdate(configId, sanitizedPayload, {
            new: true,
        })
            .lean();
        return updatedDoc;
    }
    async getCompanyWideSettings(configId) {
        const model = this.getModel('CompanyWideSettings');
        const doc = await model.findById(configId).lean();
        if (!doc) {
            throw new common_1.NotFoundException(`Company-wide settings ${configId} not found`);
        }
        return doc;
    }
    async listCompanyWideSettings() {
        const model = this.getModel('CompanyWideSettings');
        return model.find().sort({ createdAt: -1 }).lean();
    }
    async getActiveCompanyWideSettings() {
        const model = this.getModel('CompanyWideSettings');
        const settings = await model.findOne().sort({ createdAt: -1 }).lean();
        if (!settings) {
            throw new common_1.NotFoundException('No company-wide settings found');
        }
        return settings;
    }
    async createTaxRule(payload) {
        const model = this.getModel('taxRules');
        const newTaxRule = new model({
            ...payload,
            status: payroll_configuration_enums_1.ConfigStatus.DRAFT,
        });
        return (await newTaxRule.save()).toObject();
    }
    async updateTaxRule(configId, payload) {
        if (!payload || Object.keys(payload).length === 0) {
            throw new common_1.BadRequestException('Update payload is required');
        }
        const sanitizedPayload = this.sanitizePayload(payload);
        if (Object.keys(sanitizedPayload).length === 0) {
            throw new common_1.BadRequestException('No editable fields provided');
        }
        return this.editConfiguration('taxRules', configId, sanitizedPayload);
    }
    async getTaxRule(configId) {
        const model = this.getModel('taxRules');
        const doc = await model.findById(configId).lean();
        if (!doc) {
            throw new common_1.NotFoundException(`Tax rule ${configId} not found`);
        }
        return doc;
    }
    async listTaxRules(status) {
        const model = this.getModel('taxRules');
        const filter = {};
        if (status) {
            filter.status = status;
        }
        return model.find(filter).sort({ createdAt: -1 }).lean();
    }
    getModel(collection) {
        if (!this.connection) {
            throw new common_1.InternalServerErrorException('Database connection unavailable');
        }
        if (!this.isSupportedCollection(collection)) {
            throw new common_1.BadRequestException(`Unsupported collection "${collection}".`);
        }
        const modelName = COLLECTION_MODEL_NAMES[collection];
        return this.connection.model(modelName);
    }
    isSupportedCollection(collection) {
        return collection in COLLECTION_MODEL_NAMES;
    }
};
exports.PayrollConfigurationService = PayrollConfigurationService;
exports.PayrollConfigurationService = PayrollConfigurationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Optional)()),
    __param(0, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Connection])
], PayrollConfigurationService);
//# sourceMappingURL=payroll-configuration.service.js.map