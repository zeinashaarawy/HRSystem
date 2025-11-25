"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVacationPackageDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_vacation_package_dto_1 = require("./create-vacation-package.dto");
class UpdateVacationPackageDto extends (0, mapped_types_1.PartialType)(create_vacation_package_dto_1.CreateVacationPackageDto) {
}
exports.UpdateVacationPackageDto = UpdateVacationPackageDto;
//# sourceMappingURL=update-vacation-package.dto.js.map