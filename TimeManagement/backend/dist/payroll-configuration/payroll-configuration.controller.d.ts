import { PayrollConfigurationService } from './payroll-configuration.service';
import { ApproveInsuranceBracketDto, CreateConfigurationDto, RejectInsuranceBracketDto, UpdateConfigurationDto, UpdateInsuranceBracketDto } from './dto/payroll-configuration.dto';
export declare class PayrollConfigurationController {
    private readonly payrollConfigurationService;
    constructor(payrollConfigurationService: PayrollConfigurationService);
    createInsuranceBracket(payload: CreateConfigurationDto): Promise<any>;
    listInsuranceBrackets(status?: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getInsuranceBracket(configId: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | (import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })>;
    editInsuranceBracket(configId: string, { payload }: UpdateInsuranceBracketDto): Promise<any>;
    approveInsuranceBracket(configId: string, { approverId }: ApproveInsuranceBracketDto): Promise<any>;
    rejectInsuranceBracket(configId: string, { reviewerId }: RejectInsuranceBracketDto): Promise<any>;
    deleteInsuranceBracket(configId: string): Promise<any>;
    createPayrollPolicy(payload: CreateConfigurationDto): Promise<any>;
    listPayrollPolicies(status?: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getPayrollPolicy(configId: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | (import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })>;
    updatePayrollPolicy(configId: string, { payload }: UpdateConfigurationDto): Promise<any>;
    createPayGrade(payload: CreateConfigurationDto): Promise<any>;
    listPayGrades(status?: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getPayGrade(configId: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | (import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })>;
    updatePayGrade(configId: string, { payload }: UpdateConfigurationDto): Promise<any>;
    createPayType(payload: CreateConfigurationDto): Promise<any>;
    listPayTypes(status?: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getPayType(configId: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | (import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })>;
    updatePayType(configId: string, { payload }: UpdateConfigurationDto): Promise<any>;
    createAllowance(payload: CreateConfigurationDto): Promise<any>;
    listAllowances(status?: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getAllowance(configId: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | (import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })>;
    updateAllowance(configId: string, { payload }: UpdateConfigurationDto): Promise<any>;
    createSigningBonus(payload: CreateConfigurationDto): Promise<any>;
    listSigningBonuses(status?: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getSigningBonus(configId: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | (import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })>;
    updateSigningBonus(configId: string, { payload }: UpdateConfigurationDto): Promise<any>;
    createTerminationResignationBenefits(payload: CreateConfigurationDto): Promise<any>;
    listTerminationResignationBenefits(status?: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getTerminationResignationBenefits(configId: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | (import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })>;
    updateTerminationResignationBenefits(configId: string, { payload }: UpdateConfigurationDto): Promise<any>;
    createCompanyWideSettings(payload: CreateConfigurationDto): Promise<any>;
    getActiveCompanyWideSettings(): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | (import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })>;
    listCompanyWideSettings(): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getCompanyWideSettings(configId: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | (import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })>;
    updateCompanyWideSettings(configId: string, { payload }: UpdateConfigurationDto): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | (import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    createTaxRule(payload: CreateConfigurationDto): Promise<any>;
    listTaxRules(status?: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getTaxRule(configId: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | (import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })>;
    updateTaxRule(configId: string, { payload }: UpdateConfigurationDto): Promise<any>;
    private normalizeStatusFilter;
}
