import { Injectable, Inject, Logger } from '@nestjs/common';
import type { IEmployeeProfileService } from '../interfaces/employee-profile.interface';
import type { IOrganizationStructureService } from '../interfaces/organization-structure.interface';
import type { ITimeManagementService } from '../interfaces/time-management.interface';
import { EmployeeProfileService } from '../../employee-profile/employee-profile.service';
import { OrganizationStructureService } from '../../organization-structure/organization-structure.service';
import { AvailabilityService } from '../../time-management/availability/availability.service';

/**
 * Adapter services bridge real subsystem services with recruitment interfaces.
 * 
 * REQUIREMENTS:
 * - EmployeeProfileService MUST be exported from EmployeeProfileModule
 * - OrganizationStructureService MUST be exported from OrganizationStructureModule
 */

@Injectable()
export class EmployeeProfileServiceAdapter implements IEmployeeProfileService {
  private readonly logger = new Logger(EmployeeProfileServiceAdapter.name);
  private readonly realService: EmployeeProfileService;

  constructor(
    @Inject(EmployeeProfileService) employeeProfileService: EmployeeProfileService,
  ) {
    if (!employeeProfileService) {
      throw new Error(
        'EmployeeProfileService is required. Ensure EmployeeProfileModule exports EmployeeProfileService.'
      );
    }
    this.realService = employeeProfileService;
    this.logger.log('✓ Using REAL EmployeeProfileService');
  }

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
    const nameParts = offerDetails.fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    const employeeNumber = `EMP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const createEmployeeDto = {
      firstName,
      lastName,
      nationalId: `NID-${candidateId}`,
      address: { street: 'TBD', city: 'TBD', country: 'TBD' },
      phone: 'TBD',
      personalEmail: offerDetails.email,
      password: 'TempPassword123!',
      employeeNumber,
      dateOfHire: offerDetails.startDate.toISOString(),
      workEmail: offerDetails.email,
      primaryDepartmentId: offerDetails.department,
    };

    this.logger.log(`Creating employee profile from candidate ${candidateId}`);
    const employee = await this.realService.create(createEmployeeDto as any);
    this.logger.log(`Employee profile created: ${employee._id.toString()}`);
    
    return { employeeId: employee._id.toString() };
  }

  async updateEmployeeStatus(employeeId: string, status: string): Promise<void> {
    this.logger.log(`Updating employee ${employeeId} status to ${status}`);
    
    try {
      // Use the deactivate method if status is INACTIVE or TERMINATED
      if (status === 'INACTIVE' || status === 'TERMINATED') {
        await this.realService.deactivate(employeeId);
        this.logger.log(`Employee ${employeeId} deactivated (status: ${status})`);
      } else {
        // For other status updates, use the update method
        // Note: EmployeeProfileService.update() may need status field in UpdateEmployeeDto
        // For now, we'll use deactivate for TERMINATED and log for others
        this.logger.warn(`Status update to ${status} not fully supported. Using deactivate for now.`);
        await this.realService.deactivate(employeeId);
      }
    } catch (error) {
      this.logger.error(`Failed to update employee status: ${error.message}`);
      throw error;
    }
  }
}

@Injectable()
export class OrganizationStructureServiceAdapter implements IOrganizationStructureService {
  private readonly logger = new Logger(OrganizationStructureServiceAdapter.name);
  private readonly realService: OrganizationStructureService;

  constructor(
    @Inject(OrganizationStructureService) organizationStructureService: OrganizationStructureService,
  ) {
    if (!organizationStructureService) {
      throw new Error(
        'OrganizationStructureService is required. Ensure OrganizationStructureModule exports OrganizationStructureService.'
      );
    }
    this.realService = organizationStructureService;
    this.logger.log('✓ Using REAL OrganizationStructureService');
  }

  async validateDepartment(departmentId: string): Promise<boolean> {
    try {
      const result = await this.realService.validateDepartment(departmentId);
      return result.valid === true;
    } catch (error) {
      this.logger.error(`Error validating department ${departmentId}:`, error);
      return false;
    }
  }

  async getDepartment(
    departmentId: string,
  ): Promise<{ id: string; name: string; managerId?: string } | null> {
    try {
      const department = await this.realService.getDepartmentById(departmentId);
      if (!department) return null;

      return {
        id: department._id.toString(),
        name: department.name,
        managerId: department.headPositionId?.toString(),
      };
    } catch (error) {
      this.logger.error(`Error getting department ${departmentId}:`, error);
      return null;
    }
  }
}

@Injectable()
export class TimeManagementServiceAdapter implements ITimeManagementService {
  private readonly logger = new Logger(TimeManagementServiceAdapter.name);
  private readonly availabilityService: AvailabilityService;

  constructor(
    @Inject(AvailabilityService) availabilityService: AvailabilityService,
  ) {
    if (!availabilityService) {
      throw new Error(
        'AvailabilityService is required. Ensure TimeManagementModule exports AvailabilityService.'
      );
    }
    this.availabilityService = availabilityService;
    this.logger.log('✓ Using REAL AvailabilityService');
  }

  /**
   * Create a calendar event for an interview
   * NOTE: Calendar event creation is not yet implemented in Time Management module.
   * This is a placeholder that logs the event details.
   */
  async createCalendarEvent(eventDetails: {
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    attendees: string[];
    location?: string;
    videoLink?: string;
  }): Promise<{ eventId: string; calendarLink?: string }> {
    // Log the calendar event creation request
    this.logger.log(`Calendar event creation requested: ${eventDetails.title}`);
    this.logger.log(`Start: ${eventDetails.startTime}, End: ${eventDetails.endTime}`);
    this.logger.log(`Attendees: ${eventDetails.attendees.length} panel members`);
    
    // TODO: Implement actual calendar event creation when Time Management module adds this feature
    // For now, return a generated event ID
    const eventId = `CAL-${Date.now()}`;
    this.logger.warn(`Calendar event creation not yet implemented. Generated stub event ID: ${eventId}`);
    
    return {
      eventId,
      calendarLink: `https://calendar.example.com/event/${eventId}`,
    };
  }

  /**
   * Check availability of panel members for a time slot
   * Uses the real AvailabilityService to check each employee's availability
   */
  async checkAvailability(
    employeeIds: string[],
    startTime: Date,
    endTime: Date,
  ): Promise<Array<{ employeeId: string; available: boolean; conflicts?: any[] }>> {
    this.logger.log(`Checking availability for ${employeeIds.length} employees`);
    this.logger.log(`Time slot: ${startTime} to ${endTime}`);

    // Format date as YYYY-MM-DD (AvailabilityService expects this format)
    const dateStr = startTime.toISOString().split('T')[0];

    // Check availability for each employee
    const availabilityResults = await Promise.all(
      employeeIds.map(async (employeeId) => {
        try {
          const result = await this.availabilityService.checkAvailability(
            employeeId,
            dateStr,
          );

          // Check if the employee is available during the interview time slot
          // If they have working hours, check if the interview time overlaps
          let isAvailable = result.available;
          const conflicts: any[] = [];

          if (result.available && result.workingHours) {
            // Parse working hours
            const [workStartHour, workStartMin] = result.workingHours.start.split(':').map(Number);
            const [workEndHour, workEndMin] = result.workingHours.end.split(':').map(Number);
            
            const workStart = new Date(startTime);
            workStart.setHours(workStartHour, workStartMin, 0, 0);
            
            const workEnd = new Date(startTime);
            workEnd.setHours(workEndHour, workEndMin, 0, 0);

            // Check if interview time is within working hours
            if (startTime < workStart || endTime > workEnd) {
              isAvailable = false;
              conflicts.push({
                type: 'OUTSIDE_WORKING_HOURS',
                message: `Interview time (${startTime.toISOString()} - ${endTime.toISOString()}) is outside working hours (${result.workingHours.start} - ${result.workingHours.end})`,
              });
            }
          } else if (!result.available) {
            // Employee is not available - add reason to conflicts
            conflicts.push({
              type: result.reason || 'UNAVAILABLE',
              message: `Employee is not available: ${result.reason || 'Unknown reason'}`,
            });
          }

          return {
            employeeId,
            available: isAvailable,
            conflicts: conflicts.length > 0 ? conflicts : undefined,
          };
        } catch (error) {
          this.logger.error(`Error checking availability for employee ${employeeId}:`, error);
          return {
            employeeId,
            available: false,
            conflicts: [
              {
                type: 'ERROR',
                message: `Failed to check availability: ${error.message}`,
              },
            ],
          };
        }
      }),
    );

    return availabilityResults;
  }

  /**
   * Send calendar invite (iCal format) to attendees
   * NOTE: Calendar invite sending is not yet implemented in Time Management module.
   * This is a placeholder that logs the invite details.
   */
  async sendCalendarInvite(eventId: string, attendeeEmails: string[]): Promise<void> {
    this.logger.log(`Calendar invite requested for event ${eventId}`);
    this.logger.log(`Sending invites to ${attendeeEmails.length} attendees`);
    
    // TODO: Implement actual calendar invite sending when Time Management module adds this feature
    // For now, just log the request
    attendeeEmails.forEach((email) => {
      this.logger.warn(`Would send calendar invite to: ${email} (not yet implemented)`);
    });
  }
}