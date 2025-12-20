"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StubOrganizationStructureService = exports.StubEmployeeProfileService = exports.StubOnboardingService = void 0;
const common_1 = require("@nestjs/common");
let StubOnboardingService = class StubOnboardingService {
    async triggerOnboarding(candidateId, offerId, offerDetails) {
        console.warn('StubOnboardingService.triggerOnboarding called - not implemented');
        return {
            onboardingId: 'stub-onboarding-id',
            tasks: [],
        };
    }
};
exports.StubOnboardingService = StubOnboardingService;
exports.StubOnboardingService = StubOnboardingService = __decorate([
    (0, common_1.Injectable)()
], StubOnboardingService);
let StubEmployeeProfileService = class StubEmployeeProfileService {
    async createEmployeeFromCandidate(candidateId, offerDetails) {
        console.warn('StubEmployeeProfileService.createEmployeeFromCandidate called - not implemented');
        return { employeeId: 'stub-employee-id' };
    }
};
exports.StubEmployeeProfileService = StubEmployeeProfileService;
exports.StubEmployeeProfileService = StubEmployeeProfileService = __decorate([
    (0, common_1.Injectable)()
], StubEmployeeProfileService);
let StubOrganizationStructureService = class StubOrganizationStructureService {
    async validateDepartment(departmentId) {
        console.warn('StubOrganizationStructureService.validateDepartment called - not implemented');
        return true;
    }
    async getDepartment(departmentId) {
        console.warn('StubOrganizationStructureService.getDepartment called - not implemented');
        return { id: departmentId, name: 'Stub Department' };
    }
};
exports.StubOrganizationStructureService = StubOrganizationStructureService;
exports.StubOrganizationStructureService = StubOrganizationStructureService = __decorate([
    (0, common_1.Injectable)()
], StubOrganizationStructureService);
//# sourceMappingURL=stub-services.js.map