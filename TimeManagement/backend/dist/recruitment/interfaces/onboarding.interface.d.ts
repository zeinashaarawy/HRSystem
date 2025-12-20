export interface IOnboardingService {
    triggerOnboarding(candidateId: string, offerId: string, offerDetails: {
        role: string;
        department: string;
        grossSalary: number;
        startDate?: Date;
    }): Promise<{
        onboardingId: string;
        tasks: any[];
    }>;
}
