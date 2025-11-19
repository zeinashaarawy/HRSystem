"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    getAllJobs() {
        return [
            {
                postingId: 'JP123',
                requisitionId: 'REQ001',
                templateId: 'TEMPL42',
                channel: 'external',
                status: 'published',
                branding: {
                    heroTitle: 'Join Our Team!',
                    employerValueProps: ['Great culture', 'Health insurance'],
                    mediaAssets: ['img1.jpg'],
                    footerText: 'Be part of our success.'
                },
                previewUrl: 'https://careers.example.com/jobs/JP123',
                publishedAt: new Date(),
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
                seo: {
                    slug: 'software-engineer',
                    keywords: ['typescript', 'node.js', 'backend'],
                    metaDescription: 'Hiring software engineers.'
                }
            }
        ];
    }
    getOnboardingChecklists() {
        return [
            {
                checklistId: 'ONBCHK001',
                employeeId: 'EMP342',
                templateCode: 'DEV-2024',
                tasks: [
                    {
                        taskId: 'TASK1',
                        title: 'Submit ID documents',
                        responsible: 'newHire',
                        status: 'completed',
                        dueDate: new Date(),
                        completedAt: new Date(),
                        dependencies: [],
                        reminders: []
                    }
                ],
                documentsRequired: ['ID Card'],
                status: 'completed',
                startDate: new Date(),
                endDate: new Date(),
                provisioningPlanId: 'PROV-1'
            }
        ];
    }
    getOffboardingChecklists() {
        return [
            {
                checklistId: 'OFFCHK123',
                employeeId: 'EMP342',
                exitType: 'resignation',
                tasks: [
                    {
                        taskId: 'TASK-X1',
                        title: 'Return Laptop',
                        department: 'IT',
                        status: 'pending',
                        dueDate: new Date(),
                    },
                ],
                assetReturnPlanId: 'ASSET42',
                clearanceSignOffId: 'CLS42',
                finalSettlementId: 'FS-99'
            }
        ];
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map