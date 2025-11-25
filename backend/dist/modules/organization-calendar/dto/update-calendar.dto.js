"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCalendarDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_calendar_dto_1 = require("./create-calendar.dto");
class UpdateCalendarDto extends (0, mapped_types_1.PartialType)(create_calendar_dto_1.CreateCalendarDto) {
}
exports.UpdateCalendarDto = UpdateCalendarDto;
//# sourceMappingURL=update-calendar.dto.js.map