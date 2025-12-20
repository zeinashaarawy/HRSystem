import { CreateEmployeeDto } from './create-employee.dto';
import { SystemRole } from '../enums/employee-profile.enums';
declare const UpdateEmployeeDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateEmployeeDto>>;
export declare class UpdateEmployeeDto extends UpdateEmployeeDto_base {
    roles: SystemRole[];
}
export {};
