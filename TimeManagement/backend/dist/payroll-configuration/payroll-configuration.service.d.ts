import { Connection } from 'mongoose';
import { ConfigStatus } from './enums/payroll-configuration-enums';
export declare class PayrollConfigurationService {
    private readonly connection?;
    constructor(connection?: Connection | undefined);
    editConfiguration(collection: string, configId: string, payload: Record<string, any>): Promise<any>;
    approveConfiguration(collection: string, configId: string, approverId: string): Promise<any>;
    deleteConfiguration(collection: string, configId: string): Promise<any>;
    rejectInsuranceBracket(configId: string, reviewerId: string): Promise<any>;
    listInsuranceBrackets(status?: ConfigStatus): Promise<(import("mongoose").FlattenMaps<any> & Required<{
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
    createInsuranceBracket(payload: Record<string, any>): Promise<any>;
    updateInsuranceBracket(configId: string, payload: Record<string, any>): Promise<any>;
    approveInsuranceBracket(configId: string, approverId: string): Promise<any>;
    deleteInsuranceBracket(configId: string): Promise<any>;
    private getInsuranceBracketLean;
    private findInsuranceBracketOrThrow;
    private ensureEditableInsuranceFields;
    private sanitizePayload;
    createPayrollPolicy(payload: Record<string, any>): Promise<any>;
    updatePayrollPolicy(configId: string, payload: Record<string, any>): Promise<any>;
    getPayrollPolicy(configId: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | (import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })>;
    listPayrollPolicies(status?: ConfigStatus): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    createPayGrade(payload: Record<string, any>): Promise<any>;
    updatePayGrade(configId: string, payload: Record<string, any>): Promise<any>;
    getPayGrade(configId: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | (import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })>;
    listPayGrades(status?: ConfigStatus): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    createPayType(payload: Record<string, any>): Promise<any>;
    updatePayType(configId: string, payload: Record<string, any>): Promise<any>;
    getPayType(configId: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | (import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })>;
    listPayTypes(status?: ConfigStatus): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    createAllowance(payload: Record<string, any>): Promise<any>;
    updateAllowance(configId: string, payload: Record<string, any>): Promise<any>;
    getAllowance(configId: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | (import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })>;
    listAllowances(status?: ConfigStatus): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    createSigningBonus(payload: Record<string, any>): Promise<any>;
    updateSigningBonus(configId: string, payload: Record<string, any>): Promise<any>;
    getSigningBonus(configId: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | (import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })>;
    listSigningBonuses(status?: ConfigStatus): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    createTerminationResignationBenefits(payload: Record<string, any>): Promise<any>;
    updateTerminationResignationBenefits(configId: string, payload: Record<string, any>): Promise<any>;
    getTerminationResignationBenefits(configId: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | (import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })>;
    listTerminationResignationBenefits(status?: ConfigStatus): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    createCompanyWideSettings(payload: Record<string, any>): Promise<any>;
    updateCompanyWideSettings(configId: string, payload: Record<string, any>): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | (import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    getCompanyWideSettings(configId: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
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
    getActiveCompanyWideSettings(): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | (import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })>;
    createTaxRule(payload: Record<string, any>): Promise<any>;
    updateTaxRule(configId: string, payload: Record<string, any>): Promise<any>;
    getTaxRule(configId: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | (import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })>;
    listTaxRules(status?: ConfigStatus): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    private getModel;
    private isSupportedCollection;
}
