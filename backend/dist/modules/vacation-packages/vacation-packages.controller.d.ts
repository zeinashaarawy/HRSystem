import { VacationPackagesService } from './vacation-packages.service';
import { CreateVacationPackageDto } from './dto/create-vacation-package.dto';
import { UpdateVacationPackageDto } from './dto/update-vacation-package.dto';
export declare class VacationPackagesController {
    private readonly vacationPackagesService;
    constructor(vacationPackagesService: VacationPackagesService);
    create(createVacationPackageDto: CreateVacationPackageDto): Promise<import("./schemas/vacation-package.schema").VacationPackage>;
    findAll(): Promise<import("./schemas/vacation-package.schema").VacationPackage[]>;
    findActive(): Promise<import("./schemas/vacation-package.schema").VacationPackage[]>;
    findByContractType(contractType: string): Promise<import("./schemas/vacation-package.schema").VacationPackage[]>;
    findOne(id: string): Promise<import("./schemas/vacation-package.schema").VacationPackage>;
    findByCode(code: string): Promise<import("./schemas/vacation-package.schema").VacationPackage>;
    update(id: string, updateVacationPackageDto: UpdateVacationPackageDto): Promise<import("./schemas/vacation-package.schema").VacationPackage>;
    remove(id: string): Promise<void>;
    deactivate(id: string): Promise<import("./schemas/vacation-package.schema").VacationPackage>;
    activate(id: string): Promise<import("./schemas/vacation-package.schema").VacationPackage>;
}
