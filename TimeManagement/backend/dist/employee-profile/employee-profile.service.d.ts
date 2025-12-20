import { Model, Types } from 'mongoose';
import { EmployeeProfile, EmployeeProfileDocument } from './models/employee-profile.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { SelfUpdateDto } from './dto/self-update.dto';
import { EmployeeProfileChangeRequest } from './models/ep-change-request.schema';
import { CreateChangeRequestDto } from './dto/create-change-request.dto';
import { ProfileChangeStatus } from './enums/employee-profile.enums';
import { EmployeeStatus } from './enums/employee-profile.enums';
import { SystemRole } from './enums/employee-profile.enums';
import { EmployeeSystemRole, EmployeeSystemRoleDocument } from './models/employee-system-role.schema';
import { CreateManagerDto } from './dto/create-manager.dto';
export declare class EmployeeProfileService {
    private readonly employeeModel;
    private readonly employeeSystemRoleModel;
    private readonly roleModel;
    private readonly changeRequestModel;
    constructor(employeeModel: Model<EmployeeProfileDocument>, employeeSystemRoleModel: Model<EmployeeSystemRole>, roleModel: Model<EmployeeSystemRoleDocument>, changeRequestModel: Model<EmployeeProfileChangeRequest>);
    findByEmployeeId(employeeId: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, EmployeeSystemRole, {}, {}> & EmployeeSystemRole & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    updateRoles(employeeId: string, dto: UpdateEmployeeDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, EmployeeSystemRole, {}, {}> & EmployeeSystemRole & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, EmployeeSystemRole, {}, {}> & EmployeeSystemRole & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    create(createDto: CreateEmployeeDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    findAll(page: number, limit: number, role?: SystemRole): Promise<{
        items: {
            role: string;
            _id: Types.ObjectId;
            $assertPopulated: <Paths = {}>(path: string | string[], values?: Partial<Paths> | undefined) => Omit<import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            }, keyof Paths> & Paths;
            $clearModifiedPaths: () => import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            };
            $clone: () => import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            };
            $createModifiedPathsSnapshot: () => import("mongoose").ModifiedPathsSnapshot;
            $getAllSubdocs: () => import("mongoose").Document[];
            $ignore: (path: string) => void;
            $isDefault: (path?: string) => boolean;
            $isDeleted: (val?: boolean) => boolean;
            $getPopulatedDocs: () => import("mongoose").Document[];
            $inc: (path: string | string[], val?: number) => import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            };
            $isEmpty: (path: string) => boolean;
            $isValid: (path: string) => boolean;
            $locals: import("mongoose").FlattenMaps<Record<string, unknown>>;
            $markValid: (path: string) => void;
            $model: {
                <ModelType = Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown, {}, {}> & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }, any>>(name: string): ModelType;
                <ModelType = Model<EmployeeProfile, {}, {}, {}, import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }, any>>(): ModelType;
            };
            $op: "save" | "validate" | "remove" | null;
            $restoreModifiedPathsSnapshot: (snapshot: import("mongoose").ModifiedPathsSnapshot) => import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            };
            $session: (session?: import("mongoose").ClientSession | null) => import("mongoose").ClientSession | null;
            $set: {
                (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                };
                (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                };
                (value: string | Record<string, any>): import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                };
            };
            $where: import("mongoose").FlattenMaps<Record<string, unknown>>;
            baseModelName?: string | undefined;
            collection: import("mongoose").FlattenMaps<import("mongoose").Collection<import("bson").Document>>;
            db: import("mongoose").FlattenMaps<import("mongoose").Connection>;
            deleteOne: (options?: import("mongoose").QueryOptions) => import("mongoose").Query<import("mongodb").DeleteResult, import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            }, {}, EmployeeProfile, "deleteOne", Record<string, never>>;
            depopulate: <Paths = {}>(path?: string | string[]) => import("mongoose").MergeType<import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            }, Paths>;
            directModifiedPaths: () => Array<string>;
            equals: (doc: import("mongoose").Document<unknown, any, any, Record<string, any>, {}>) => boolean;
            errors?: import("mongoose").Error.ValidationError | undefined;
            get: {
                <T extends keyof EmployeeProfile>(path: T, type?: any, options?: any): EmployeeProfile[T];
                (path: string, type?: any, options?: any): any;
            };
            getChanges: () => import("mongoose").UpdateQuery<import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            }>;
            id?: any;
            increment: () => import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            };
            init: (obj: import("mongoose").AnyObject, opts?: import("mongoose").AnyObject) => import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            };
            invalidate: {
                <T extends keyof EmployeeProfile>(path: T, errorMsg: string | NativeError, value?: any, kind?: string): NativeError | null;
                (path: string, errorMsg: string | NativeError, value?: any, kind?: string): NativeError | null;
            };
            isDirectModified: {
                <T extends keyof EmployeeProfile>(path: T | T[]): boolean;
                (path: string | Array<string>): boolean;
            };
            isDirectSelected: {
                <T extends keyof EmployeeProfile>(path: T): boolean;
                (path: string): boolean;
            };
            isInit: {
                <T extends keyof EmployeeProfile>(path: T): boolean;
                (path: string): boolean;
            };
            isModified: {
                <T extends keyof EmployeeProfile>(path?: T | T[] | undefined, options?: {
                    ignoreAtomics?: boolean;
                } | null): boolean;
                (path?: string | Array<string>, options?: {
                    ignoreAtomics?: boolean;
                } | null): boolean;
            };
            isNew: boolean;
            isSelected: {
                <T extends keyof EmployeeProfile>(path: T): boolean;
                (path: string): boolean;
            };
            markModified: {
                <T extends keyof EmployeeProfile>(path: T, scope?: any): void;
                (path: string, scope?: any): void;
            };
            model: {
                <ModelType = Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown, {}, {}> & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }, any>>(name: string): ModelType;
                <ModelType = Model<EmployeeProfile, {}, {}, {}, import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }, any>>(): ModelType;
            };
            modifiedPaths: (options?: {
                includeChildren?: boolean;
            }) => Array<string>;
            overwrite: (obj: import("mongoose").AnyObject) => import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            };
            $parent: () => import("mongoose").Document | undefined;
            populate: {
                <Paths = {}>(path: string | import("mongoose").PopulateOptions | (string | import("mongoose").PopulateOptions)[]): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }, Paths>>;
                <Paths = {}>(path: string, select?: string | import("mongoose").AnyObject, model?: Model<any>, match?: import("mongoose").AnyObject, options?: import("mongoose").PopulateOptions): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }, Paths>>;
            };
            populated: (path: string) => any;
            replaceOne: (replacement?: import("mongoose").AnyObject, options?: import("mongoose").QueryOptions | null) => import("mongoose").Query<any, import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            }, {}, unknown, "find", Record<string, never>>;
            save: (options?: import("mongoose").SaveOptions) => Promise<import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            }>;
            schema: import("mongoose").FlattenMaps<import("mongoose").Schema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
                [x: number]: unknown;
                [x: symbol]: unknown;
                [x: string]: unknown;
            }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
                [x: number]: unknown;
                [x: symbol]: unknown;
                [x: string]: unknown;
            }>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
                [x: number]: unknown;
                [x: symbol]: unknown;
                [x: string]: unknown;
            }> & Required<{
                _id: unknown;
            }> & {
                __v: number;
            }>>;
            set: {
                <T extends keyof EmployeeProfile>(path: T, val: EmployeeProfile[T], type: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                };
                (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                };
                (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                };
                (value: string | Record<string, any>): import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                };
            };
            toJSON: {
                (options: import("mongoose").ToObjectOptions & {
                    versionKey: false;
                    virtuals: true;
                    flattenObjectIds: true;
                }): Omit<{
                    employeeNumber: string;
                    dateOfHire: Date;
                    workEmail?: string | undefined;
                    biography?: string | undefined;
                    contractStartDate?: Date | undefined;
                    contractEndDate?: Date | undefined;
                    bankName?: string | undefined;
                    bankAccountNumber?: string | undefined;
                    contractType?: import("./enums/employee-profile.enums").ContractType | undefined;
                    workType?: import("./enums/employee-profile.enums").WorkType | undefined;
                    status: EmployeeStatus;
                    statusEffectiveFrom?: Date | undefined;
                    primaryPositionId?: string | undefined;
                    primaryDepartmentId?: string | undefined;
                    supervisorPositionId?: string | undefined;
                    payGradeId?: string | undefined;
                    lastAppraisalRecordId?: string | undefined;
                    lastAppraisalCycleId?: string | undefined;
                    lastAppraisalTemplateId?: string | undefined;
                    lastAppraisalDate?: Date | undefined;
                    lastAppraisalScore?: number | undefined;
                    lastAppraisalRatingLabel?: string | undefined;
                    lastAppraisalScaleType?: import("../performance/enums/performance.enums").AppraisalRatingScaleType | undefined;
                    lastDevelopmentPlanSummary?: string | undefined;
                    firstName: string;
                    middleName?: string | undefined;
                    lastName: string;
                    fullName?: string | undefined;
                    nationalId: string;
                    password?: string | undefined;
                    gender?: import("./enums/employee-profile.enums").Gender | undefined;
                    maritalStatus?: import("./enums/employee-profile.enums").MaritalStatus | undefined;
                    dateOfBirth?: Date | undefined;
                    personalEmail?: string | undefined;
                    mobilePhone?: string | undefined;
                    homePhone?: string | undefined;
                    address?: {
                        city?: string | undefined;
                        streetAddress?: string | undefined;
                        country?: string | undefined;
                    } | undefined;
                    profilePictureUrl?: string | undefined;
                    accessProfileId?: string | undefined;
                    _id: string;
                }, "__v">;
                (options: import("mongoose").ToObjectOptions & {
                    virtuals: true;
                    flattenObjectIds: true;
                }): {
                    employeeNumber: string;
                    dateOfHire: Date;
                    workEmail?: string | undefined;
                    biography?: string | undefined;
                    contractStartDate?: Date | undefined;
                    contractEndDate?: Date | undefined;
                    bankName?: string | undefined;
                    bankAccountNumber?: string | undefined;
                    contractType?: import("./enums/employee-profile.enums").ContractType | undefined;
                    workType?: import("./enums/employee-profile.enums").WorkType | undefined;
                    status: EmployeeStatus;
                    statusEffectiveFrom?: Date | undefined;
                    primaryPositionId?: string | undefined;
                    primaryDepartmentId?: string | undefined;
                    supervisorPositionId?: string | undefined;
                    payGradeId?: string | undefined;
                    lastAppraisalRecordId?: string | undefined;
                    lastAppraisalCycleId?: string | undefined;
                    lastAppraisalTemplateId?: string | undefined;
                    lastAppraisalDate?: Date | undefined;
                    lastAppraisalScore?: number | undefined;
                    lastAppraisalRatingLabel?: string | undefined;
                    lastAppraisalScaleType?: import("../performance/enums/performance.enums").AppraisalRatingScaleType | undefined;
                    lastDevelopmentPlanSummary?: string | undefined;
                    firstName: string;
                    middleName?: string | undefined;
                    lastName: string;
                    fullName?: string | undefined;
                    nationalId: string;
                    password?: string | undefined;
                    gender?: import("./enums/employee-profile.enums").Gender | undefined;
                    maritalStatus?: import("./enums/employee-profile.enums").MaritalStatus | undefined;
                    dateOfBirth?: Date | undefined;
                    personalEmail?: string | undefined;
                    mobilePhone?: string | undefined;
                    homePhone?: string | undefined;
                    address?: {
                        city?: string | undefined;
                        streetAddress?: string | undefined;
                        country?: string | undefined;
                    } | undefined;
                    profilePictureUrl?: string | undefined;
                    accessProfileId?: string | undefined;
                    _id: string;
                    __v: number;
                };
                (options: import("mongoose").ToObjectOptions & {
                    versionKey: false;
                    virtuals: true;
                }): Omit<EmployeeProfile & {
                    _id: Types.ObjectId;
                }, "__v">;
                (options: import("mongoose").ToObjectOptions & {
                    versionKey: false;
                    flattenObjectIds: true;
                }): {
                    _id: string;
                    status: EmployeeStatus;
                    firstName: string;
                    middleName?: string | undefined;
                    lastName: string;
                    fullName?: string | undefined;
                    nationalId: string;
                    password?: string | undefined;
                    gender?: import("./enums/employee-profile.enums").Gender | undefined;
                    maritalStatus?: import("./enums/employee-profile.enums").MaritalStatus | undefined;
                    dateOfBirth?: Date | undefined;
                    personalEmail?: string | undefined;
                    mobilePhone?: string | undefined;
                    homePhone?: string | undefined;
                    address?: {
                        city?: string | undefined;
                        streetAddress?: string | undefined;
                        country?: string | undefined;
                    } | undefined;
                    profilePictureUrl?: string | undefined;
                    accessProfileId?: string | undefined;
                    employeeNumber: string;
                    dateOfHire: Date;
                    workEmail?: string | undefined;
                    biography?: string | undefined;
                    contractStartDate?: Date | undefined;
                    contractEndDate?: Date | undefined;
                    bankName?: string | undefined;
                    bankAccountNumber?: string | undefined;
                    contractType?: import("./enums/employee-profile.enums").ContractType | undefined;
                    workType?: import("./enums/employee-profile.enums").WorkType | undefined;
                    statusEffectiveFrom?: Date | undefined;
                    primaryPositionId?: string | undefined;
                    primaryDepartmentId?: string | undefined;
                    supervisorPositionId?: string | undefined;
                    payGradeId?: string | undefined;
                    lastAppraisalRecordId?: string | undefined;
                    lastAppraisalCycleId?: string | undefined;
                    lastAppraisalTemplateId?: string | undefined;
                    lastAppraisalDate?: Date | undefined;
                    lastAppraisalScore?: number | undefined;
                    lastAppraisalRatingLabel?: string | undefined;
                    lastAppraisalScaleType?: import("../performance/enums/performance.enums").AppraisalRatingScaleType | undefined;
                    lastDevelopmentPlanSummary?: string | undefined;
                };
                (options: import("mongoose").ToObjectOptions & {
                    virtuals: true;
                }): EmployeeProfile & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                };
                (options: import("mongoose").ToObjectOptions & {
                    versionKey: false;
                }): Omit<EmployeeProfile & {
                    _id: Types.ObjectId;
                }, "__v">;
                (options?: import("mongoose").ToObjectOptions & {
                    flattenMaps?: true;
                    flattenObjectIds?: false;
                }): import("mongoose").FlattenMaps<EmployeeProfile & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }>;
                (options: import("mongoose").ToObjectOptions & {
                    flattenObjectIds: false;
                }): import("mongoose").FlattenMaps<EmployeeProfile & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }>;
                (options: import("mongoose").ToObjectOptions & {
                    flattenObjectIds: true;
                }): {
                    employeeNumber: string;
                    dateOfHire: Date;
                    workEmail?: string | undefined;
                    biography?: string | undefined;
                    contractStartDate?: Date | undefined;
                    contractEndDate?: Date | undefined;
                    bankName?: string | undefined;
                    bankAccountNumber?: string | undefined;
                    contractType?: import("./enums/employee-profile.enums").ContractType | undefined;
                    workType?: import("./enums/employee-profile.enums").WorkType | undefined;
                    status: EmployeeStatus;
                    statusEffectiveFrom?: Date | undefined;
                    primaryPositionId?: string | undefined;
                    primaryDepartmentId?: string | undefined;
                    supervisorPositionId?: string | undefined;
                    payGradeId?: string | undefined;
                    lastAppraisalRecordId?: string | undefined;
                    lastAppraisalCycleId?: string | undefined;
                    lastAppraisalTemplateId?: string | undefined;
                    lastAppraisalDate?: Date | undefined;
                    lastAppraisalScore?: number | undefined;
                    lastAppraisalRatingLabel?: string | undefined;
                    lastAppraisalScaleType?: import("../performance/enums/performance.enums").AppraisalRatingScaleType | undefined;
                    lastDevelopmentPlanSummary?: string | undefined;
                    firstName: string;
                    middleName?: string | undefined;
                    lastName: string;
                    fullName?: string | undefined;
                    nationalId: string;
                    password?: string | undefined;
                    gender?: import("./enums/employee-profile.enums").Gender | undefined;
                    maritalStatus?: import("./enums/employee-profile.enums").MaritalStatus | undefined;
                    dateOfBirth?: Date | undefined;
                    personalEmail?: string | undefined;
                    mobilePhone?: string | undefined;
                    homePhone?: string | undefined;
                    address?: {
                        city?: string | undefined;
                        streetAddress?: string | undefined;
                        country?: string | undefined;
                    } | undefined;
                    profilePictureUrl?: string | undefined;
                    accessProfileId?: string | undefined;
                    _id: string;
                    __v: number;
                };
                (options: import("mongoose").ToObjectOptions & {
                    flattenMaps: false;
                }): EmployeeProfile & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                };
                (options: import("mongoose").ToObjectOptions & {
                    flattenMaps: false;
                    flattenObjectIds: true;
                }): {
                    employeeNumber: string;
                    dateOfHire: Date;
                    workEmail?: string | undefined;
                    biography?: string | undefined;
                    contractStartDate?: Date | undefined;
                    contractEndDate?: Date | undefined;
                    bankName?: string | undefined;
                    bankAccountNumber?: string | undefined;
                    contractType?: import("./enums/employee-profile.enums").ContractType | undefined;
                    workType?: import("./enums/employee-profile.enums").WorkType | undefined;
                    status: EmployeeStatus;
                    statusEffectiveFrom?: Date | undefined;
                    primaryPositionId?: string | undefined;
                    primaryDepartmentId?: string | undefined;
                    supervisorPositionId?: string | undefined;
                    payGradeId?: string | undefined;
                    lastAppraisalRecordId?: string | undefined;
                    lastAppraisalCycleId?: string | undefined;
                    lastAppraisalTemplateId?: string | undefined;
                    lastAppraisalDate?: Date | undefined;
                    lastAppraisalScore?: number | undefined;
                    lastAppraisalRatingLabel?: string | undefined;
                    lastAppraisalScaleType?: import("../performance/enums/performance.enums").AppraisalRatingScaleType | undefined;
                    lastDevelopmentPlanSummary?: string | undefined;
                    firstName: string;
                    middleName?: string | undefined;
                    lastName: string;
                    fullName?: string | undefined;
                    nationalId: string;
                    password?: string | undefined;
                    gender?: import("./enums/employee-profile.enums").Gender | undefined;
                    maritalStatus?: import("./enums/employee-profile.enums").MaritalStatus | undefined;
                    dateOfBirth?: Date | undefined;
                    personalEmail?: string | undefined;
                    mobilePhone?: string | undefined;
                    homePhone?: string | undefined;
                    address?: {
                        city?: string | undefined;
                        streetAddress?: string | undefined;
                        country?: string | undefined;
                    } | undefined;
                    profilePictureUrl?: string | undefined;
                    accessProfileId?: string | undefined;
                    _id: string;
                    __v: number;
                };
                <T = EmployeeProfile & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }>(options?: import("mongoose").ToObjectOptions & {
                    flattenMaps?: true;
                    flattenObjectIds?: false;
                }): import("mongoose").FlattenMaps<T>;
                <T = EmployeeProfile & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }>(options: import("mongoose").ToObjectOptions & {
                    flattenObjectIds: false;
                }): import("mongoose").FlattenMaps<T>;
                <T = EmployeeProfile & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }>(options: import("mongoose").ToObjectOptions & {
                    flattenObjectIds: true;
                }): import("mongoose").ObjectIdToString<import("mongoose").FlattenMaps<T>>;
                <T = EmployeeProfile & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }>(options: import("mongoose").ToObjectOptions & {
                    flattenMaps: false;
                }): T;
                <T = EmployeeProfile & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }>(options: import("mongoose").ToObjectOptions & {
                    flattenMaps: false;
                    flattenObjectIds: true;
                }): import("mongoose").ObjectIdToString<T>;
            };
            toObject: {
                (options: import("mongoose").ToObjectOptions & {
                    versionKey: false;
                    virtuals: true;
                    flattenObjectIds: true;
                }): Omit<{
                    employeeNumber: string;
                    dateOfHire: Date;
                    workEmail?: string | undefined;
                    biography?: string | undefined;
                    contractStartDate?: Date | undefined;
                    contractEndDate?: Date | undefined;
                    bankName?: string | undefined;
                    bankAccountNumber?: string | undefined;
                    contractType?: import("./enums/employee-profile.enums").ContractType | undefined;
                    workType?: import("./enums/employee-profile.enums").WorkType | undefined;
                    status: EmployeeStatus;
                    statusEffectiveFrom?: Date | undefined;
                    primaryPositionId?: string | undefined;
                    primaryDepartmentId?: string | undefined;
                    supervisorPositionId?: string | undefined;
                    payGradeId?: string | undefined;
                    lastAppraisalRecordId?: string | undefined;
                    lastAppraisalCycleId?: string | undefined;
                    lastAppraisalTemplateId?: string | undefined;
                    lastAppraisalDate?: Date | undefined;
                    lastAppraisalScore?: number | undefined;
                    lastAppraisalRatingLabel?: string | undefined;
                    lastAppraisalScaleType?: import("../performance/enums/performance.enums").AppraisalRatingScaleType | undefined;
                    lastDevelopmentPlanSummary?: string | undefined;
                    firstName: string;
                    middleName?: string | undefined;
                    lastName: string;
                    fullName?: string | undefined;
                    nationalId: string;
                    password?: string | undefined;
                    gender?: import("./enums/employee-profile.enums").Gender | undefined;
                    maritalStatus?: import("./enums/employee-profile.enums").MaritalStatus | undefined;
                    dateOfBirth?: Date | undefined;
                    personalEmail?: string | undefined;
                    mobilePhone?: string | undefined;
                    homePhone?: string | undefined;
                    address?: {
                        city?: string | undefined;
                        streetAddress?: string | undefined;
                        country?: string | undefined;
                    } | undefined;
                    profilePictureUrl?: string | undefined;
                    accessProfileId?: string | undefined;
                    _id: string;
                }, "__v">;
                (options: import("mongoose").ToObjectOptions & {
                    virtuals: true;
                    flattenObjectIds: true;
                }): {
                    employeeNumber: string;
                    dateOfHire: Date;
                    workEmail?: string | undefined;
                    biography?: string | undefined;
                    contractStartDate?: Date | undefined;
                    contractEndDate?: Date | undefined;
                    bankName?: string | undefined;
                    bankAccountNumber?: string | undefined;
                    contractType?: import("./enums/employee-profile.enums").ContractType | undefined;
                    workType?: import("./enums/employee-profile.enums").WorkType | undefined;
                    status: EmployeeStatus;
                    statusEffectiveFrom?: Date | undefined;
                    primaryPositionId?: string | undefined;
                    primaryDepartmentId?: string | undefined;
                    supervisorPositionId?: string | undefined;
                    payGradeId?: string | undefined;
                    lastAppraisalRecordId?: string | undefined;
                    lastAppraisalCycleId?: string | undefined;
                    lastAppraisalTemplateId?: string | undefined;
                    lastAppraisalDate?: Date | undefined;
                    lastAppraisalScore?: number | undefined;
                    lastAppraisalRatingLabel?: string | undefined;
                    lastAppraisalScaleType?: import("../performance/enums/performance.enums").AppraisalRatingScaleType | undefined;
                    lastDevelopmentPlanSummary?: string | undefined;
                    firstName: string;
                    middleName?: string | undefined;
                    lastName: string;
                    fullName?: string | undefined;
                    nationalId: string;
                    password?: string | undefined;
                    gender?: import("./enums/employee-profile.enums").Gender | undefined;
                    maritalStatus?: import("./enums/employee-profile.enums").MaritalStatus | undefined;
                    dateOfBirth?: Date | undefined;
                    personalEmail?: string | undefined;
                    mobilePhone?: string | undefined;
                    homePhone?: string | undefined;
                    address?: {
                        city?: string | undefined;
                        streetAddress?: string | undefined;
                        country?: string | undefined;
                    } | undefined;
                    profilePictureUrl?: string | undefined;
                    accessProfileId?: string | undefined;
                    _id: string;
                    __v: number;
                };
                (options: import("mongoose").ToObjectOptions & {
                    versionKey: false;
                    flattenObjectIds: true;
                }): Omit<{
                    employeeNumber: string;
                    dateOfHire: Date;
                    workEmail?: string | undefined;
                    biography?: string | undefined;
                    contractStartDate?: Date | undefined;
                    contractEndDate?: Date | undefined;
                    bankName?: string | undefined;
                    bankAccountNumber?: string | undefined;
                    contractType?: import("./enums/employee-profile.enums").ContractType | undefined;
                    workType?: import("./enums/employee-profile.enums").WorkType | undefined;
                    status: EmployeeStatus;
                    statusEffectiveFrom?: Date | undefined;
                    primaryPositionId?: string | undefined;
                    primaryDepartmentId?: string | undefined;
                    supervisorPositionId?: string | undefined;
                    payGradeId?: string | undefined;
                    lastAppraisalRecordId?: string | undefined;
                    lastAppraisalCycleId?: string | undefined;
                    lastAppraisalTemplateId?: string | undefined;
                    lastAppraisalDate?: Date | undefined;
                    lastAppraisalScore?: number | undefined;
                    lastAppraisalRatingLabel?: string | undefined;
                    lastAppraisalScaleType?: import("../performance/enums/performance.enums").AppraisalRatingScaleType | undefined;
                    lastDevelopmentPlanSummary?: string | undefined;
                    firstName: string;
                    middleName?: string | undefined;
                    lastName: string;
                    fullName?: string | undefined;
                    nationalId: string;
                    password?: string | undefined;
                    gender?: import("./enums/employee-profile.enums").Gender | undefined;
                    maritalStatus?: import("./enums/employee-profile.enums").MaritalStatus | undefined;
                    dateOfBirth?: Date | undefined;
                    personalEmail?: string | undefined;
                    mobilePhone?: string | undefined;
                    homePhone?: string | undefined;
                    address?: {
                        city?: string | undefined;
                        streetAddress?: string | undefined;
                        country?: string | undefined;
                    } | undefined;
                    profilePictureUrl?: string | undefined;
                    accessProfileId?: string | undefined;
                    _id: string;
                }, "__v">;
                (options: import("mongoose").ToObjectOptions & {
                    versionKey: false;
                    virtuals: true;
                }): Omit<EmployeeProfile & {
                    _id: Types.ObjectId;
                }, "__v">;
                (options: import("mongoose").ToObjectOptions & {
                    virtuals: true;
                }): EmployeeProfile & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                };
                (options: import("mongoose").ToObjectOptions & {
                    versionKey: false;
                }): Omit<EmployeeProfile & {
                    _id: Types.ObjectId;
                }, "__v">;
                (options: import("mongoose").ToObjectOptions & {
                    flattenObjectIds: true;
                }): {
                    employeeNumber: string;
                    dateOfHire: Date;
                    workEmail?: string | undefined;
                    biography?: string | undefined;
                    contractStartDate?: Date | undefined;
                    contractEndDate?: Date | undefined;
                    bankName?: string | undefined;
                    bankAccountNumber?: string | undefined;
                    contractType?: import("./enums/employee-profile.enums").ContractType | undefined;
                    workType?: import("./enums/employee-profile.enums").WorkType | undefined;
                    status: EmployeeStatus;
                    statusEffectiveFrom?: Date | undefined;
                    primaryPositionId?: string | undefined;
                    primaryDepartmentId?: string | undefined;
                    supervisorPositionId?: string | undefined;
                    payGradeId?: string | undefined;
                    lastAppraisalRecordId?: string | undefined;
                    lastAppraisalCycleId?: string | undefined;
                    lastAppraisalTemplateId?: string | undefined;
                    lastAppraisalDate?: Date | undefined;
                    lastAppraisalScore?: number | undefined;
                    lastAppraisalRatingLabel?: string | undefined;
                    lastAppraisalScaleType?: import("../performance/enums/performance.enums").AppraisalRatingScaleType | undefined;
                    lastDevelopmentPlanSummary?: string | undefined;
                    firstName: string;
                    middleName?: string | undefined;
                    lastName: string;
                    fullName?: string | undefined;
                    nationalId: string;
                    password?: string | undefined;
                    gender?: import("./enums/employee-profile.enums").Gender | undefined;
                    maritalStatus?: import("./enums/employee-profile.enums").MaritalStatus | undefined;
                    dateOfBirth?: Date | undefined;
                    personalEmail?: string | undefined;
                    mobilePhone?: string | undefined;
                    homePhone?: string | undefined;
                    address?: {
                        city?: string | undefined;
                        streetAddress?: string | undefined;
                        country?: string | undefined;
                    } | undefined;
                    profilePictureUrl?: string | undefined;
                    accessProfileId?: string | undefined;
                    _id: string;
                    __v: number;
                };
                (options?: import("mongoose").ToObjectOptions): EmployeeProfile & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                };
                <T>(options?: import("mongoose").ToObjectOptions): import("mongoose").Require_id<T> & {
                    __v: number;
                };
            };
            unmarkModified: {
                <T extends keyof EmployeeProfile>(path: T): void;
                (path: string): void;
            };
            updateOne: (update?: import("mongoose").UpdateWithAggregationPipeline | import("mongoose").UpdateQuery<import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            }> | undefined, options?: import("mongoose").QueryOptions | null) => import("mongoose").Query<any, import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            }, {}, unknown, "find", Record<string, never>>;
            validate: {
                <T extends keyof EmployeeProfile>(pathsToValidate?: T | T[] | undefined, options?: import("mongoose").AnyObject): Promise<void>;
                (pathsToValidate?: import("mongoose").pathsToValidate, options?: import("mongoose").AnyObject): Promise<void>;
                (options: {
                    pathsToSkip?: import("mongoose").pathsToSkip;
                }): Promise<void>;
            };
            validateSync: {
                (options: {
                    pathsToSkip?: import("mongoose").pathsToSkip;
                    [k: string]: any;
                }): import("mongoose").Error.ValidationError | null;
                <T extends keyof EmployeeProfile>(pathsToValidate?: T | T[] | undefined, options?: import("mongoose").AnyObject): import("mongoose").Error.ValidationError | null;
                (pathsToValidate?: import("mongoose").pathsToValidate, options?: import("mongoose").AnyObject): import("mongoose").Error.ValidationError | null;
            };
            employeeNumber: string;
            dateOfHire: Date;
            workEmail?: string | undefined;
            biography?: string | undefined;
            contractStartDate?: Date | undefined;
            contractEndDate?: Date | undefined;
            bankName?: string | undefined;
            bankAccountNumber?: string | undefined;
            contractType?: import("./enums/employee-profile.enums").ContractType | undefined;
            workType?: import("./enums/employee-profile.enums").WorkType | undefined;
            status: EmployeeStatus;
            statusEffectiveFrom?: Date | undefined;
            primaryPositionId?: Types.ObjectId | undefined;
            primaryDepartmentId?: Types.ObjectId | undefined;
            supervisorPositionId?: Types.ObjectId | undefined;
            payGradeId?: Types.ObjectId | undefined;
            lastAppraisalRecordId?: Types.ObjectId | undefined;
            lastAppraisalCycleId?: Types.ObjectId | undefined;
            lastAppraisalTemplateId?: Types.ObjectId | undefined;
            lastAppraisalDate?: Date | undefined;
            lastAppraisalScore?: number | undefined;
            lastAppraisalRatingLabel?: string | undefined;
            lastAppraisalScaleType?: import("../performance/enums/performance.enums").AppraisalRatingScaleType | undefined;
            lastDevelopmentPlanSummary?: string | undefined;
            firstName: string;
            middleName?: string | undefined;
            lastName: string;
            fullName?: string | undefined;
            nationalId: string;
            password?: string | undefined;
            gender?: import("./enums/employee-profile.enums").Gender | undefined;
            maritalStatus?: import("./enums/employee-profile.enums").MaritalStatus | undefined;
            dateOfBirth?: Date | undefined;
            personalEmail?: string | undefined;
            mobilePhone?: string | undefined;
            homePhone?: string | undefined;
            address?: import("mongoose").FlattenMaps<import("./models/user-schema").Address> | undefined;
            profilePictureUrl?: string | undefined;
            accessProfileId?: Types.ObjectId | undefined;
            __v: number;
        }[];
        total: number;
    }>;
    getAllManagers(): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    getDepartmentManagers(departmentId: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    createManager(dto: CreateManagerDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    findOne(id: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    setPassword(id: string, password: string): Promise<{
        message: string;
        id: string;
    }>;
    update(id: string, updateDto: UpdateEmployeeDto): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    deactivate(id: string): Promise<{
        message: string;
        id: string;
        oldStatus: EmployeeStatus;
        newStatus: EmployeeStatus;
        updatedEmployee: (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: Types.ObjectId;
        }>) | null;
    }>;
    selfUpdate(employeeId: string, dto: SelfUpdateDto): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    createChangeRequest(employeeId: string, dto: CreateChangeRequestDto): Promise<import("mongoose").Document<unknown, {}, EmployeeProfileChangeRequest, {}, {}> & EmployeeProfileChangeRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getEmployeeChangeRequests(employeeProfileId: string): Promise<(import("mongoose").FlattenMaps<{
        requestId: string;
        employeeProfileId: Types.ObjectId;
        requestDescription: string;
        reason?: string | undefined;
        status: ProfileChangeStatus;
        submittedAt: Date;
        processedAt?: Date | undefined;
    }> & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    approveChangeRequest(changeRequestMongoId: string): Promise<{
        message: string;
    }>;
    rejectChangeRequest(id: string, reason: string): Promise<import("mongoose").Document<unknown, {}, EmployeeProfileChangeRequest, {}, {}> & EmployeeProfileChangeRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getTeamSummaryForManager(managerId: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    getTeamEmployeeSummary(managerId: string, employeeId: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>) | null>;
    getAllChangeRequests(): Promise<(import("mongoose").FlattenMaps<{
        requestId: string;
        employeeProfileId: Types.ObjectId;
        requestDescription: string;
        reason?: string | undefined;
        status: ProfileChangeStatus;
        submittedAt: Date;
        processedAt?: Date | undefined;
    }> & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findChangeRequestByUUID(requestId: string): Promise<import("mongoose").FlattenMaps<{
        requestId: string;
        employeeProfileId: Types.ObjectId;
        requestDescription: string;
        reason?: string | undefined;
        status: ProfileChangeStatus;
        submittedAt: Date;
        processedAt?: Date | undefined;
    }> & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    submitDispute(dto: {
        employeeProfileId: string;
        originalRequestId: string;
        dispute: string;
    }): Promise<import("mongoose").Document<unknown, {}, EmployeeProfileChangeRequest, {}, {}> & EmployeeProfileChangeRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    withdrawChangeRequest(id: string): Promise<{
        message: string;
        requestId: string;
        status: ProfileChangeStatus.REJECTED;
    }>;
    resolveDispute(id: string, resolution: string): Promise<import("mongoose").Document<unknown, {}, EmployeeProfileChangeRequest, {}, {}> & EmployeeProfileChangeRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    approveDispute(id: string, resolution: string): Promise<import("mongoose").Document<unknown, {}, EmployeeProfileChangeRequest, {}, {}> & EmployeeProfileChangeRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getMyProfile(userId: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    getDepartmentHeads(): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    assignManager(employeeId: string, managerId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, EmployeeProfile, {}, {}> & EmployeeProfile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>) | null>;
}
