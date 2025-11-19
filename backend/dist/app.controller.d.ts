import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getRoot(): string;
    getAllJobs(): {
        postingId: string;
        requisitionId: string;
        templateId: string;
        channel: string;
        status: string;
        branding: {
            heroTitle: string;
            employerValueProps: string[];
            mediaAssets: string[];
            footerText: string;
        };
        previewUrl: string;
        publishedAt: Date;
        expiresAt: Date;
        seo: {
            slug: string;
            keywords: string[];
            metaDescription: string;
        };
    }[];
    getOnboardingChecklists(): {
        checklistId: string;
        employeeId: string;
        templateCode: string;
        tasks: {
            taskId: string;
            title: string;
            responsible: string;
            status: string;
            dueDate: Date;
            completedAt: Date;
            dependencies: never[];
            reminders: never[];
        }[];
        documentsRequired: string[];
        status: string;
        startDate: Date;
        endDate: Date;
        provisioningPlanId: string;
    }[];
    getOffboardingChecklists(): {
        checklistId: string;
        employeeId: string;
        exitType: string;
        tasks: {
            taskId: string;
            title: string;
            department: string;
            status: string;
            dueDate: Date;
        }[];
        assetReturnPlanId: string;
        clearanceSignOffId: string;
        finalSettlementId: string;
    }[];
}
