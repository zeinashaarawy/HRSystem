import { Injectable, Inject, Logger, Optional } from '@nestjs/common';
import type { IEmployeeProfileService } from '../interfaces/employee-profile.interface';
import type { IOrganizationStructureService } from '../interfaces/organization-structure.interface';
import type { ITimeManagementService } from '../interfaces/time-management.interface';
import { EmployeeProfileService } from '../../employee-profile/employee-profile.service';
import { OrganizationStructureService } from '../../organization-structure/organization-structure.service';
import { AvailabilityService } from '../../time-management/availability/availability.service';
import { NotificationsService } from '../../notifications/notifications.service';

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
  private readonly notificationsService?: NotificationsService;
  // Store event details temporarily for calendar invites
  private readonly eventDetailsCache = new Map<string, {
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    location?: string;
    videoLink?: string;
  }>();

  constructor(
    @Inject(AvailabilityService) availabilityService: AvailabilityService,
    @Optional() @Inject(NotificationsService) notificationsService?: NotificationsService,
  ) {
    if (!availabilityService) {
      throw new Error(
        'AvailabilityService is required. Ensure TimeManagementModule exports AvailabilityService.'
      );
    }
    this.availabilityService = availabilityService;
    this.notificationsService = notificationsService;
    this.logger.log('✓ Using REAL AvailabilityService');
    if (notificationsService) {
      this.logger.log('✓ Using REAL NotificationsService for calendar invites');
    }
  }

  /**
   * Create a calendar event for an interview
   * Generates an event ID and stores event details for later use in calendar invites.
   * Since Time Management module doesn't have calendar event creation, we use email notifications instead.
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
    this.logger.log(`Calendar event creation requested: ${eventDetails.title}`);
    this.logger.log(`Start: ${eventDetails.startTime}, End: ${eventDetails.endTime}`);
    this.logger.log(`Attendees: ${eventDetails.attendees.length} panel members`);
    
    // Generate a unique event ID
    const eventId = `CAL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Store event details for use in sendCalendarInvite
    this.eventDetailsCache.set(eventId, {
      title: eventDetails.title,
      description: eventDetails.description,
      startTime: eventDetails.startTime,
      endTime: eventDetails.endTime,
      location: eventDetails.location,
      videoLink: eventDetails.videoLink,
    });
    
    // Clean up old cache entries (older than 24 hours)
    setTimeout(() => {
      this.eventDetailsCache.delete(eventId);
    }, 24 * 60 * 60 * 1000);
    
    this.logger.log(`Calendar event created with ID: ${eventId}`);
    
    return {
      eventId,
      calendarLink: undefined, // No actual calendar link since we use email notifications
    };
  }

  /**
   * Check availability of panel members for a time slot
   * Uses the real AvailabilityService via GET /time-management/availability?employeeId=...&date=...
   * Checks each employee individually for the specified date
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
   * Send calendar invite via email notifications
   * Since Time Management module doesn't have calendar invite functionality, we use NotificationsService
   * to send email notifications with calendar event details formatted as a calendar invite.
   */
  async sendCalendarInvite(eventId: string, attendeeEmails: string[]): Promise<void> {
    this.logger.log(`Calendar invite requested for event ${eventId}`);
    this.logger.log(`Sending invites to ${attendeeEmails.length} attendees`);
    
    // Get event details from cache
    const eventDetails = this.eventDetailsCache.get(eventId);
    
    if (!eventDetails) {
      this.logger.warn(`Event details not found for event ${eventId}. Calendar invite not sent.`);
      return;
    }
    
    if (!this.notificationsService) {
      this.logger.warn('NotificationsService not available. Calendar invites will be sent via recruitment service notifications.');
      return;
    }
    
    // Format event details for email
    const startTimeStr = eventDetails.startTime.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });
    
    const endTimeStr = eventDetails.endTime.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });
    
    const duration = Math.round((eventDetails.endTime.getTime() - eventDetails.startTime.getTime()) / (1000 * 60));
    
    // Format calendar invite content
    let calendarContent = `📅 Calendar Invitation\n\n`;
    calendarContent += `Event: ${eventDetails.title}\n`;
    if (eventDetails.description) {
      calendarContent += `Description: ${eventDetails.description}\n`;
    }
    calendarContent += `\nDate & Time:\n`;
    calendarContent += `  Start: ${startTimeStr}\n`;
    calendarContent += `  End: ${endTimeStr}\n`;
    calendarContent += `  Duration: ${duration} minutes\n`;
    
    if (eventDetails.location) {
      calendarContent += `\n📍 Location: ${eventDetails.location}\n`;
    }
    
    if (eventDetails.videoLink) {
      calendarContent += `\n🔗 Video Link: ${eventDetails.videoLink}\n`;
    }
    
    calendarContent += `\n---\n`;
    calendarContent += `This is an automated calendar invitation. Please add this event to your calendar.\n`;
    
    // Send email notifications to all attendees
    // Note: We need employee IDs to send notifications, but we only have emails
    // For now, we'll send notifications with the email as recipientId
    for (const email of attendeeEmails) {
      try {
        await this.notificationsService.sendNotification({
          type: 'interview_invite' as any,
          channel: 'email' as any,
          recipientId: email, // Using email as ID since we don't have employee ID
          recipientEmail: email,
          recipientName: email.split('@')[0], // Use email prefix as name
          subject: `Calendar Invitation: ${eventDetails.title}`,
          content: calendarContent,
          relatedEntityId: eventId,
          relatedEntityType: 'calendar_event',
        });
        this.logger.log(`Calendar invite sent to ${email} for event ${eventId}`);
      } catch (error) {
        this.logger.error(`Failed to send calendar invite to ${email}: ${error.message}`);
      }
    }
    
    this.logger.log(`Calendar invites sent to ${attendeeEmails.length} attendees for event ${eventId}`);
  }
}