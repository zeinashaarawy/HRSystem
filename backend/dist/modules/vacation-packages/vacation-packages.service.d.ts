import { Model } from 'mongoose';
import { VacationPackage, VacationPackageDocument } from './schemas/vacation-package.schema';
import { CreateVacationPackageDto } from './dto/create-vacation-package.dto';
import { UpdateVacationPackageDto } from './dto/update-vacation-package.dto';
export declare class VacationPackagesService {
    private vacationPackageModel;
    constructor(vacationPackageModel: Model<VacationPackageDocument>);
    create(createVacationPackageDto: CreateVacationPackageDto): Promise<VacationPackage>;
    findAll(): Promise<VacationPackage[]>;
    findActive(): Promise<VacationPackage[]>;
    findOne(id: string): Promise<VacationPackage>;
    findByCode(code: string): Promise<VacationPackage>;
    findByContractType(contractType: string): Promise<VacationPackage[]>;
    update(id: string, updateVacationPackageDto: UpdateVacationPackageDto): Promise<VacationPackage>;
    remove(id: string): Promise<void>;
    deactivate(id: string): Promise<VacationPackage>;
    activate(id: string): Promise<VacationPackage>;
}
