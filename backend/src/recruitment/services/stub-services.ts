import { Injectable, Logger } from '@nestjs/common';
import { IOnboardingService } from '../../shared/interfaces/onboarding.interface';
import { IEmployeeProfileService } from '../../shared/interfaces/employee-profile.interface';
import { IOrganizationStructureService } from '../../shared/interfaces/organization-structure.interface';

/**
 * Stub implementations for cross-subsystem services
 * These allow the recruitment module to work standalone.
 * When other subsystems are integrated, replace these with real implementations.
 */
@Injectable()
export class StubOnboardingService implements IOnboardingService {
  private readonly logger = new Logger(StubOnboardingService.name);

  async triggerOnboarding(
    candidateId: string,
    offerId: string,
    offerDetails: {
      role: string;
      department: string;
      grossSalary: number;
      startDate?: Date;
    },
  ): Promise<{ onboardingId: string; tasks: any[] }> {
    this.logger.warn(
      `[STUB] Onboarding triggered for candidate ${candidateId} - Real onboarding module not yet integrated`,
    );
    this.logger.log(`[STUB] Offer ID: ${offerId}, Role: ${offerDetails.role}, Department: ${offerDetails.department}`);

    // Return stub response - in real implementation, this would call the onboarding subsystem
    return {
      onboardingId: `stub-onboarding-${candidateId}`,
      tasks: [
        { name: 'Upload ID', department: 'HR', status: 'pending' },
        { name: 'Set up Email', department: 'IT', status: 'pending' },
        { name: 'Complete Payroll Forms', department: 'HR', status: 'pending' },
      ],
    };
  }
}

@Injectable()
export class StubEmployeeProfileService implements IEmployeeProfileService {
  private readonly logger = new Logger(StubEmployeeProfileService.name);

  async createEmployeeFromCandidate(
    candidateId: string,
    offerDetails: {
      fullName: string;
      email: string;
      role: string;
      department: string;
      startDate: Date;
    },
  ): Promise<{ employeeId: string }> {
    this.logger.warn(
      `[STUB] Creating employee profile for candidate ${candidateId} - Real employee profile module not yet integrated`,
    );
    this.logger.log(`[STUB] Employee: ${offerDetails.fullName}, Role: ${offerDetails.role}`);

    // Return stub response - in real implementation, this would create an employee profile
    return {
      employeeId: `stub-employee-${candidateId}`,
    };
  }
}

@Injectable()
export class StubOrganizationStructureService implements IOrganizationStructureService {
  private readonly logger = new Logger(StubOrganizationStructureService.name);

  async validateDepartment(departmentId: string): Promise<boolean> {
    this.logger.warn(
      `[STUB] Validating department ${departmentId} - Real organization structure module not yet integrated`,
    );
    // Stub: always return true for now
    // In real implementation, this would check against the organization structure
    return true;
  }

  async getDepartment(departmentId: string): Promise<{ id: string; name: string; managerId?: string } | null> {
    this.logger.warn(
      `[STUB] Getting department ${departmentId} - Real organization structure module not yet integrated`,
    );
    // Stub: return mock department
    return {
      id: departmentId,
      name: departmentId,
      managerId: undefined,
    };
  }
}

