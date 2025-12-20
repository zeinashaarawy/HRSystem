"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ShiftExpiryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftExpiryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const shift_expiry_notification_schema_1 = require("../schemas/shift-expiry-notification.schema");
const shift_schema_1 = require("../schemas/shift.schema");
const schedule_assignment_schema_1 = require("../schemas/schedule-assignment.schema");
let ShiftExpiryService = ShiftExpiryService_1 = class ShiftExpiryService {
    shiftExpiryNotificationModel;
    shiftTemplateModel;
    scheduleAssignmentModel;
    logger = new common_1.Logger(ShiftExpiryService_1.name);
    constructor(shiftExpiryNotificationModel, shiftTemplateModel, scheduleAssignmentModel) {
        this.shiftExpiryNotificationModel = shiftExpiryNotificationModel;
        this.shiftTemplateModel = shiftTemplateModel;
        this.scheduleAssignmentModel = scheduleAssignmentModel;
    }
    async getNotifications(status) {
        try {
            if (!this.shiftExpiryNotificationModel) {
                this.logger.error('shiftExpiryNotificationModel is not injected');
                return [];
            }
            const query = {};
            if (status) {
                query.status = status;
            }
            this.logger.log('Querying notifications with query:', query);
            let notifications = [];
            try {
                const result = await this.shiftExpiryNotificationModel
                    .find(query)
                    .lean()
                    .exec();
                notifications = result || [];
                this.logger.log(`Found ${notifications.length} raw notifications`);
                if (notifications.length > 0) {
                    notifications = notifications.sort((a, b) => {
                        const dateA = a.expiryDate ? new Date(a.expiryDate).getTime() : 0;
                        const dateB = b.expiryDate ? new Date(b.expiryDate).getTime() : 0;
                        return dateA - dateB;
                    });
                }
            }
            catch (findError) {
                this.logger.error('Find failed:', findError);
                this.logger.error('Find error details:', {
                    message: findError?.message,
                    stack: findError?.stack,
                    name: findError?.name,
                });
                return [];
            }
            this.logger.log('Found notifications count:', notifications?.length || 0);
            if (notifications.length === 0) {
                this.logger.log('No notifications to transform, returning empty array');
                return [];
            }
            this.logger.log('Starting transformation of notifications...');
            const transformedNotifications = [];
            for (let i = 0; i < notifications.length; i++) {
                const n = notifications[i];
                try {
                    this.logger.log(`Transforming notification ${i + 1}/${notifications.length}, ID: ${n._id}`);
                    const transformed = {
                        _id: n._id ? String(n._id) : 'unknown',
                        status: n.status || 'pending',
                        notificationSent: Boolean(n.notificationSent),
                        notifiedTo: Array.isArray(n.notifiedTo)
                            ? n.notifiedTo
                                .map((id) => {
                                try {
                                    return String(id);
                                }
                                catch {
                                    return null;
                                }
                            })
                                .filter(Boolean)
                            : [],
                    };
                    if (n.shiftTemplateId) {
                        try {
                            transformed.shiftTemplateId = String(n.shiftTemplateId);
                        }
                        catch (err) {
                            this.logger.warn(`Failed to convert shiftTemplateId for notification ${n._id}:`, err);
                        }
                    }
                    if (n.scheduleAssignmentId) {
                        try {
                            transformed.scheduleAssignmentId = String(n.scheduleAssignmentId);
                        }
                        catch (err) {
                            this.logger.warn(`Failed to convert scheduleAssignmentId for notification ${n._id}:`, err);
                        }
                    }
                    if (n.expiryDate) {
                        try {
                            transformed.expiryDate =
                                n.expiryDate instanceof Date
                                    ? n.expiryDate.toISOString()
                                    : new Date(n.expiryDate).toISOString();
                        }
                        catch (err) {
                            this.logger.warn(`Failed to convert expiryDate for notification ${n._id}:`, err);
                            transformed.expiryDate = null;
                        }
                    }
                    if (n.notificationSentAt) {
                        try {
                            transformed.notificationSentAt =
                                n.notificationSentAt instanceof Date
                                    ? n.notificationSentAt.toISOString()
                                    : new Date(n.notificationSentAt).toISOString();
                        }
                        catch (err) {
                            this.logger.warn(`Failed to convert notificationSentAt for notification ${n._id}:`, err);
                        }
                    }
                    if (n.resolvedAt) {
                        try {
                            transformed.resolvedAt =
                                n.resolvedAt instanceof Date
                                    ? n.resolvedAt.toISOString()
                                    : new Date(n.resolvedAt).toISOString();
                        }
                        catch (err) {
                            this.logger.warn(`Failed to convert resolvedAt for notification ${n._id}:`, err);
                        }
                    }
                    if (n.createdAt) {
                        try {
                            transformed.createdAt =
                                n.createdAt instanceof Date
                                    ? n.createdAt.toISOString()
                                    : new Date(n.createdAt).toISOString();
                        }
                        catch (err) {
                            this.logger.warn(`Failed to convert createdAt for notification ${n._id}:`, err);
                        }
                    }
                    if (n.updatedAt) {
                        try {
                            transformed.updatedAt =
                                n.updatedAt instanceof Date
                                    ? n.updatedAt.toISOString()
                                    : new Date(n.updatedAt).toISOString();
                        }
                        catch (err) {
                            this.logger.warn(`Failed to convert updatedAt for notification ${n._id}:`, err);
                        }
                    }
                    if (n.resolutionNotes) {
                        transformed.resolutionNotes = String(n.resolutionNotes);
                    }
                    try {
                        JSON.stringify(transformed);
                        this.logger.log(`✅ Notification ${i + 1} is JSON-serializable`);
                    }
                    catch (serializeErr) {
                        this.logger.error(`❌ Notification ${i + 1} is NOT JSON-serializable:`, serializeErr);
                        this.logger.error(`   Notification data:`, transformed);
                    }
                    transformedNotifications.push(transformed);
                }
                catch (err) {
                    this.logger.error(`Error transforming notification ${i + 1}:`, err);
                    this.logger.error('Notification raw data:', n);
                    transformedNotifications.push({
                        _id: n._id ? String(n._id) : 'unknown',
                        status: 'pending',
                        notificationSent: false,
                        notifiedTo: [],
                    });
                }
            }
            this.logger.log(`Successfully transformed ${transformedNotifications.length} notifications`);
            try {
                const testJson = JSON.stringify(transformedNotifications);
                this.logger.log(`✅ All ${transformedNotifications.length} notifications are JSON-serializable (${testJson.length} bytes)`);
            }
            catch (finalErr) {
                this.logger.error(`❌ Final serialization test failed:`, finalErr);
                this.logger.error(`   Error message:`, finalErr?.message);
                return [];
            }
            return transformedNotifications;
        }
        catch (error) {
            this.logger.error('Error fetching notifications:', error);
            this.logger.error('Error details:', {
                message: error?.message || 'Unknown error',
                stack: error?.stack,
                name: error?.name,
                modelAvailable: !!this.shiftExpiryNotificationModel,
            });
            return [];
        }
    }
    async resolveNotification(id, resolutionNotes) {
        if (!this.shiftExpiryNotificationModel) {
            throw new Error('shiftExpiryNotificationModel is not injected');
        }
        const notification = await this.shiftExpiryNotificationModel
            .findById(id)
            .exec();
        if (!notification) {
            throw new Error(`Notification with ID ${id} not found`);
        }
        notification.status = 'resolved';
        notification.resolvedAt = new Date();
        if (resolutionNotes) {
            notification.resolutionNotes = resolutionNotes;
        }
        return await notification.save();
    }
    async detectExpiringShifts(daysBeforeExpiry = 30) {
        this.logger.log('🔍 detectExpiringShifts method called!');
        this.logger.log(`   Parameter daysBeforeExpiry: ${daysBeforeExpiry}`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const expiryThreshold = new Date();
        expiryThreshold.setDate(today.getDate() + daysBeforeExpiry);
        expiryThreshold.setHours(23, 59, 59, 999);
        this.logger.log('🔍 Starting expiry detection');
        this.logger.log(`  Today: ${today.toISOString()}`);
        this.logger.log(`  Threshold (${daysBeforeExpiry} days): ${expiryThreshold.toISOString()}`);
        this.logger.log('🔍 Expiry Detection - Date Range:');
        this.logger.log(`  Today (start): ${today.toISOString()}`);
        this.logger.log(`  Threshold (end): ${expiryThreshold.toISOString()}`);
        this.logger.log(`  Looking for assignments with effectiveTo between these dates`);
        let notificationCount = 0;
        const expiringTemplates = await this.shiftTemplateModel
            .find({
            expirationDate: { $lte: expiryThreshold, $gte: today },
            status: 'Active',
        })
            .exec();
        for (const template of expiringTemplates) {
            const existingNotification = await this.shiftExpiryNotificationModel
                .findOne({
                shiftTemplateId: template._id,
                status: { $in: ['pending', 'sent'] },
            })
                .exec();
            if (!existingNotification && template.expirationDate) {
                await this.shiftExpiryNotificationModel.create({
                    shiftTemplateId: template._id,
                    expiryDate: template.expirationDate,
                    notificationSent: false,
                    status: 'pending',
                });
                notificationCount++;
            }
        }
        const allActiveAssignments = await this.scheduleAssignmentModel
            .find({
            status: 'Active',
            effectiveTo: { $exists: true, $ne: null },
        })
            .exec();
        this.logger.log(`📊 Total Active assignments with effectiveTo: ${allActiveAssignments.length}`);
        allActiveAssignments.forEach((assignment) => {
            const effectiveToDate = assignment.effectiveTo instanceof Date
                ? assignment.effectiveTo
                : new Date(assignment.effectiveTo);
            const isInRange = effectiveToDate &&
                effectiveToDate >= today &&
                effectiveToDate <= expiryThreshold;
            const daysUntilExpiry = effectiveToDate
                ? Math.ceil((effectiveToDate.getTime() - today.getTime()) /
                    (1000 * 60 * 60 * 24))
                : null;
            this.logger.log(`  - Assignment ID: ${assignment._id}`);
            this.logger.log(`    effectiveTo (raw): ${assignment.effectiveTo}`);
            this.logger.log(`    effectiveTo (parsed): ${effectiveToDate.toISOString()}`);
            this.logger.log(`    Today: ${today.toISOString()}`);
            this.logger.log(`    Threshold: ${expiryThreshold.toISOString()}`);
            this.logger.log(`    In range? ${isInRange ? '✅ YES' : '❌ NO'}`);
            if (daysUntilExpiry !== null) {
                this.logger.log(`    Days until expiry: ${daysUntilExpiry}`);
            }
        });
        const query = {
            status: 'Active',
            effectiveTo: {
                $exists: true,
                $ne: null,
                $gte: today,
                $lte: expiryThreshold,
            },
        };
        this.logger.log('🔍 Query for expiring assignments:');
        this.logger.log(`  status: 'Active'`);
        this.logger.log(`  effectiveTo: { $exists: true, $ne: null, $gte: ${today.toISOString()}, $lte: ${expiryThreshold.toISOString()} }`);
        const expiringAssignments = await this.scheduleAssignmentModel
            .find(query)
            .exec();
        this.logger.log(`📋 Query returned ${expiringAssignments.length} expiring assignments`);
        if (expiringAssignments.length > 0) {
            expiringAssignments.forEach((assignment) => {
                const effectiveToDate = assignment.effectiveTo instanceof Date
                    ? assignment.effectiveTo
                    : new Date(assignment.effectiveTo);
                const daysUntilExpiry = Math.ceil((effectiveToDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                this.logger.log(`  ✅ Found: Assignment ${assignment._id}, expires ${effectiveToDate.toISOString()} (${daysUntilExpiry} days)`);
            });
        }
        else {
            this.logger.log(`  ❌ No assignments found by query. Checking all active assignments...`);
        }
        this.logger.log(`📋 Found ${expiringAssignments.length} expiring assignments matching query`);
        if (expiringAssignments.length > 0) {
            expiringAssignments.forEach((assignment) => {
                const effectiveToDate = assignment.effectiveTo instanceof Date
                    ? assignment.effectiveTo
                    : new Date(assignment.effectiveTo);
                const daysUntilExpiry = Math.ceil((effectiveToDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                this.logger.log(`  ✅ Assignment ID: ${assignment._id}`);
                this.logger.log(`     effectiveTo: ${effectiveToDate.toISOString()}`);
                this.logger.log(`     status: ${assignment.status}`);
                this.logger.log(`     days until expiry: ${daysUntilExpiry}`);
            });
        }
        else {
            this.logger.log('❌ No assignments found. Possible reasons:');
            this.logger.log('   1. All assignments have effectiveTo dates in the past');
            this.logger.log('   2. All assignments have effectiveTo dates more than 30 days away');
            this.logger.log('   3. All assignments have status other than "Active"');
            this.logger.log('   4. All assignments have null/undefined effectiveTo dates');
            this.logger.log(`   Current date range: ${today.toISOString()} to ${expiryThreshold.toISOString()}`);
        }
        for (const assignment of expiringAssignments) {
            try {
                const existingNotification = await this.shiftExpiryNotificationModel
                    .findOne({
                    scheduleAssignmentId: assignment._id,
                    status: { $in: ['pending', 'sent'] },
                })
                    .exec();
                if (existingNotification) {
                    this.logger.log(`⏭️  Skipping assignment ${assignment._id} - notification already exists (status: ${existingNotification.status})`);
                    continue;
                }
                if (!assignment.effectiveTo) {
                    this.logger.log(`⏭️  Skipping assignment ${assignment._id} - no effectiveTo date`);
                    continue;
                }
                const expiryDate = assignment.effectiveTo instanceof Date
                    ? assignment.effectiveTo
                    : new Date(assignment.effectiveTo);
                if (expiryDate < today || expiryDate > expiryThreshold) {
                    this.logger.log(`⏭️  Skipping assignment ${assignment._id} - expiry date ${expiryDate.toISOString()} is outside range`);
                    continue;
                }
                await this.shiftExpiryNotificationModel.create({
                    scheduleAssignmentId: assignment._id,
                    expiryDate: expiryDate,
                    notificationSent: false,
                    status: 'pending',
                });
                notificationCount++;
                this.logger.log(`✅ Created notification for assignment ${assignment._id} expiring on ${expiryDate.toISOString()}`);
            }
            catch (createError) {
                this.logger.error(`❌ Failed to create notification for assignment ${assignment._id}: ${createError.message}`);
                this.logger.error(`   Error stack: ${createError.stack}`);
            }
        }
        this.logger.log(`🎯 Total notifications created: ${notificationCount}`);
        return notificationCount;
    }
};
exports.ShiftExpiryService = ShiftExpiryService;
exports.ShiftExpiryService = ShiftExpiryService = ShiftExpiryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(shift_expiry_notification_schema_1.ShiftExpiryNotification.name)),
    __param(1, (0, mongoose_1.InjectModel)(shift_schema_1.ShiftTemplate.name)),
    __param(2, (0, mongoose_1.InjectModel)(schedule_assignment_schema_1.ScheduleAssignment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ShiftExpiryService);
//# sourceMappingURL=shift-expiry.service.js.map