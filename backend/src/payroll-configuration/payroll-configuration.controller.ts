import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { SystemRole } from '../employee-profile/enums/employee-profile.enums';

import { PayrollConfigurationService } from './payroll-configuration.service';
import { ConfigStatus } from './enums/payroll-configuration-enums';
import {
  ApproveInsuranceBracketDto,
  CreateConfigurationDto,
  RejectInsuranceBracketDto,
  UpdateConfigurationDto,
  UpdateInsuranceBracketDto,
} from './dto/payroll-configuration.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('payroll-configuration')
export class PayrollConfigurationController {
  constructor(
    private readonly payrollConfigurationService: PayrollConfigurationService,
  ) { }

  // Insurance Brackets
  @Roles(SystemRole.HR_MANAGER, SystemRole.SYSTEM_ADMIN)
  @Post('insurance-brackets')
  createInsuranceBracket(@Body() payload: CreateConfigurationDto) {
    return this.payrollConfigurationService.createInsuranceBracket(payload);
  }

  @Roles(
    SystemRole.DEPARTMENT_HEAD,
    SystemRole.HR_MANAGER,
    SystemRole.SYSTEM_ADMIN,
  )
  @Get('insurance-brackets')
  listInsuranceBrackets(@Query('status') status?: string) {
    const normalizedStatus = this.normalizeStatusFilter(status);
    return this.payrollConfigurationService.listInsuranceBrackets(
      normalizedStatus,
    );
  }

  @Roles(
    SystemRole.DEPARTMENT_HEAD,
    SystemRole.HR_MANAGER,
    SystemRole.SYSTEM_ADMIN,
  )
  @Get('insurance-brackets/:configId')
  getInsuranceBracket(@Param('configId') configId: string) {
    return this.payrollConfigurationService.getInsuranceBracket(configId);
  }

  @Roles(SystemRole.HR_MANAGER, SystemRole.SYSTEM_ADMIN)
  @Patch('insurance-brackets/:configId')
  editInsuranceBracket(
    @Param('configId') configId: string,
    @Body() { payload }: UpdateInsuranceBracketDto,
  ) {
    return this.payrollConfigurationService.updateInsuranceBracket(
      configId,
      payload,
    );
  }

  @Roles(SystemRole.HR_MANAGER, SystemRole.SYSTEM_ADMIN)
  @Patch('insurance-brackets/:configId/approve')
  approveInsuranceBracket(
    @Param('configId') configId: string,
    @Body() { approverId }: ApproveInsuranceBracketDto,
  ) {
    return this.payrollConfigurationService.approveInsuranceBracket(
      configId,
      approverId,
    );
  }

  @Roles(SystemRole.HR_MANAGER, SystemRole.SYSTEM_ADMIN)
  @Patch('insurance-brackets/:configId/reject')
  rejectInsuranceBracket(
    @Param('configId') configId: string,
    @Body() { reviewerId }: RejectInsuranceBracketDto,
  ) {
    return this.payrollConfigurationService.rejectInsuranceBracket(
      configId,
      reviewerId,
    );
  }

  @Roles(SystemRole.HR_MANAGER, SystemRole.SYSTEM_ADMIN)
  @Delete('insurance-brackets/:configId')
  deleteInsuranceBracket(@Param('configId') configId: string) {
    return this.payrollConfigurationService.deleteInsuranceBracket(configId);
  }

  // Payroll Policies Configuration Endpoints
  @Roles(SystemRole.HR_MANAGER)
  @Post('payroll-policies')
  createPayrollPolicy(@Body() payload: CreateConfigurationDto) {
    return this.payrollConfigurationService.createPayrollPolicy(payload);
  }

  @Roles(
    SystemRole.DEPARTMENT_HEAD,
    SystemRole.HR_MANAGER,
    SystemRole.SYSTEM_ADMIN,
  )
  @Get('payroll-policies')
  listPayrollPolicies(@Query('status') status?: string) {
    const normalizedStatus = this.normalizeStatusFilter(status);
    return this.payrollConfigurationService.listPayrollPolicies(
      normalizedStatus,
    );
  }

  @Roles(
    SystemRole.DEPARTMENT_HEAD,
    SystemRole.HR_MANAGER,
    SystemRole.SYSTEM_ADMIN,
  )
  @Get('payroll-policies/:configId')
  getPayrollPolicy(@Param('configId') configId: string) {
    return this.payrollConfigurationService.getPayrollPolicy(configId);
  }

  @Roles(SystemRole.HR_MANAGER)
  @Patch('payroll-policies/:configId/approve')
  approvePayrollPolicy(
    @Param('configId') configId: string,
    @Body() { approverId }: ApproveInsuranceBracketDto,
  ) {
    return this.payrollConfigurationService.approveConfiguration(
      'payrollPolicies',
      configId,
      approverId,
    );
  }

  @Roles(SystemRole.HR_MANAGER)
  @Patch('payroll-policies/:configId/reject')
  rejectPayrollPolicy(
    @Param('configId') configId: string,
    @Body() { reviewerId }: RejectInsuranceBracketDto,
  ) {
    return this.payrollConfigurationService.rejectConfiguration(
      'payrollPolicies',
      configId,
      reviewerId,
    );
  }

  @Roles(SystemRole.HR_MANAGER)
  @Patch('payroll-policies/:configId')
  updatePayrollPolicy(
    @Param('configId') configId: string,
    @Body() { payload }: UpdateConfigurationDto,
  ) {
    return this.payrollConfigurationService.updatePayrollPolicy(
      configId,
      payload,
    );
  }

  @Roles(SystemRole.HR_MANAGER)
  @Delete('payroll-policies/:configId')
  deletePayrollPolicy(@Param('configId') configId: string) {
    return this.payrollConfigurationService.deleteConfiguration(
      'payrollPolicies',
      configId,
    );
  }

  // Pay Grades Configuration Endpoints
  @Roles(SystemRole.HR_MANAGER)
  @Post('pay-grades')
  createPayGrade(@Body() payload: CreateConfigurationDto) {
    return this.payrollConfigurationService.createPayGrade(payload);
  }

  @Roles(
    SystemRole.DEPARTMENT_EMPLOYEE,
    SystemRole.DEPARTMENT_HEAD,
    SystemRole.HR_MANAGER,
    SystemRole.SYSTEM_ADMIN,
  )
  @Get('pay-grades')
  listPayGrades(@Query('status') status?: string) {
    const normalizedStatus = this.normalizeStatusFilter(status);
    return this.payrollConfigurationService.listPayGrades(normalizedStatus);
  }

  @Roles(
    SystemRole.DEPARTMENT_EMPLOYEE,
    SystemRole.DEPARTMENT_HEAD,
    SystemRole.HR_MANAGER,
    SystemRole.SYSTEM_ADMIN,
  )
  @Get('pay-grades/:configId')
  getPayGrade(@Param('configId') configId: string) {
    return this.payrollConfigurationService.getPayGrade(configId);
  }

  @Roles(SystemRole.HR_MANAGER)
  @Patch('pay-grades/:configId/approve')
  approvePayGrade(
    @Param('configId') configId: string,
    @Body() { approverId }: ApproveInsuranceBracketDto,
  ) {
    return this.payrollConfigurationService.approveConfiguration(
      'payGrade',
      configId,
      approverId,
    );
  }

  @Roles(SystemRole.HR_MANAGER)
  @Patch('pay-grades/:configId/reject')
  rejectPayGrade(
    @Param('configId') configId: string,
    @Body() { reviewerId }: RejectInsuranceBracketDto,
  ) {
    return this.payrollConfigurationService.rejectConfiguration(
      'payGrade',
      configId,
      reviewerId,
    );
  }

  @Roles(SystemRole.HR_MANAGER)
  @Patch('pay-grades/:configId')
  updatePayGrade(
    @Param('configId') configId: string,
    @Body() { payload }: UpdateConfigurationDto,
  ) {
    return this.payrollConfigurationService.updatePayGrade(configId, payload);
  }

  @Roles(SystemRole.HR_MANAGER)
  @Delete('pay-grades/:configId')
  deletePayGrade(@Param('configId') configId: string) {
    return this.payrollConfigurationService.deleteConfiguration(
      'payGrade',
      configId,
    );
  }

  // Pay Types Configuration Endpoints
  @Roles(SystemRole.HR_MANAGER)
  @Post('pay-types')
  createPayType(@Body() payload: CreateConfigurationDto) {
    return this.payrollConfigurationService.createPayType(payload);
  }

  @Roles(
    SystemRole.DEPARTMENT_EMPLOYEE,
    SystemRole.DEPARTMENT_HEAD,
    SystemRole.HR_MANAGER,
    SystemRole.SYSTEM_ADMIN,
  )
  @Get('pay-types')
  listPayTypes(@Query('status') status?: string) {
    const normalizedStatus = this.normalizeStatusFilter(status);
    return this.payrollConfigurationService.listPayTypes(normalizedStatus);
  }

  @Roles(
    SystemRole.DEPARTMENT_EMPLOYEE,
    SystemRole.DEPARTMENT_HEAD,
    SystemRole.HR_MANAGER,
    SystemRole.SYSTEM_ADMIN,
  )
  @Get('pay-types/:configId')
  getPayType(@Param('configId') configId: string) {
    return this.payrollConfigurationService.getPayType(configId);
  }

  @Roles(SystemRole.HR_MANAGER)
  @Patch('pay-types/:configId/approve')
  approvePayType(
    @Param('configId') configId: string,
    @Body() { approverId }: ApproveInsuranceBracketDto,
  ) {
    return this.payrollConfigurationService.approveConfiguration(
      'payType',
      configId,
      approverId,
    );
  }

  @Roles(SystemRole.HR_MANAGER)
  @Patch('pay-types/:configId/reject')
  rejectPayType(
    @Param('configId') configId: string,
    @Body() { reviewerId }: RejectInsuranceBracketDto,
  ) {
    return this.payrollConfigurationService.rejectConfiguration(
      'payType',
      configId,
      reviewerId,
    );
  }

  @Roles(SystemRole.HR_MANAGER)
  @Patch('pay-types/:configId')
  updatePayType(
    @Param('configId') configId: string,
    @Body() { payload }: UpdateConfigurationDto,
  ) {
    return this.payrollConfigurationService.updatePayType(configId, payload);
  }

  @Roles(SystemRole.HR_MANAGER)
  @Delete('pay-types/:configId')
  deletePayType(@Param('configId') configId: string) {
    return this.payrollConfigurationService.deleteConfiguration(
      'payType',
      configId,
    );
  }

  // Allowance Configuration Endpoints
  @Roles(SystemRole.DEPARTMENT_HEAD, SystemRole.HR_MANAGER)
  @Post('allowances')
  createAllowance(@Body() payload: CreateConfigurationDto) {
    return this.payrollConfigurationService.createAllowance(payload);
  }

  @Roles(
    SystemRole.DEPARTMENT_EMPLOYEE,
    SystemRole.DEPARTMENT_HEAD,
    SystemRole.HR_MANAGER,
    SystemRole.SYSTEM_ADMIN,
  )
  @Get('allowances')
  listAllowances(@Query('status') status?: string) {
    const normalizedStatus = this.normalizeStatusFilter(status);
    return this.payrollConfigurationService.listAllowances(normalizedStatus);
  }

  @Roles(
    SystemRole.DEPARTMENT_EMPLOYEE,
    SystemRole.DEPARTMENT_HEAD,
    SystemRole.HR_MANAGER,
    SystemRole.SYSTEM_ADMIN,
  )
  @Get('allowances/:configId')
  getAllowance(@Param('configId') configId: string) {
    return this.payrollConfigurationService.getAllowance(configId);
  }

  @Roles(SystemRole.HR_MANAGER)
  @Patch('allowances/:configId/approve')
  approveAllowance(
    @Param('configId') configId: string,
    @Body() { approverId }: ApproveInsuranceBracketDto,
  ) {
    return this.payrollConfigurationService.approveConfiguration(
      'allowance',
      configId,
      approverId,
    );
  }

  @Roles(SystemRole.HR_MANAGER)
  @Patch('allowances/:configId/reject')
  rejectAllowance(
    @Param('configId') configId: string,
    @Body() { reviewerId }: RejectInsuranceBracketDto,
  ) {
    return this.payrollConfigurationService.rejectConfiguration(
      'allowance',
      configId,
      reviewerId,
    );
  }

  @Roles(SystemRole.DEPARTMENT_HEAD, SystemRole.HR_MANAGER)
  @Patch('allowances/:configId')
  updateAllowance(
    @Param('configId') configId: string,
    @Body() { payload }: UpdateConfigurationDto,
  ) {
    return this.payrollConfigurationService.updateAllowance(configId, payload);
  }

  @Roles(SystemRole.HR_MANAGER)
  @Delete('allowances/:configId')
  deleteAllowance(@Param('configId') configId: string) {
    return this.payrollConfigurationService.deleteConfiguration(
      'allowance',
      configId,
    );
  }

  // Signing Bonus Configuration Endpoints
  @Roles(SystemRole.DEPARTMENT_HEAD, SystemRole.HR_MANAGER)
  @Post('signing-bonuses')
  createSigningBonus(@Body() payload: CreateConfigurationDto) {
    return this.payrollConfigurationService.createSigningBonus(payload);
  }

  @Roles(
    SystemRole.DEPARTMENT_HEAD,
    SystemRole.HR_MANAGER,
    SystemRole.SYSTEM_ADMIN,
  )
  @Get('signing-bonuses')
  listSigningBonuses(@Query('status') status?: string) {
    const normalizedStatus = this.normalizeStatusFilter(status);
    return this.payrollConfigurationService.listSigningBonuses(
      normalizedStatus,
    );
  }

  @Roles(
    SystemRole.DEPARTMENT_HEAD,
    SystemRole.HR_MANAGER,
    SystemRole.SYSTEM_ADMIN,
  )
  @Get('signing-bonuses/:configId')
  getSigningBonus(@Param('configId') configId: string) {
    return this.payrollConfigurationService.getSigningBonus(configId);
  }

  @Roles(SystemRole.HR_MANAGER)
  @Patch('signing-bonuses/:configId/approve')
  approveSigningBonus(
    @Param('configId') configId: string,
    @Body() { approverId }: ApproveInsuranceBracketDto,
  ) {
    return this.payrollConfigurationService.approveConfiguration(
      'signingBonus',
      configId,
      approverId,
    );
  }

  @Roles(SystemRole.HR_MANAGER)
  @Patch('signing-bonuses/:configId/reject')
  rejectSigningBonus(
    @Param('configId') configId: string,
    @Body() { reviewerId }: RejectInsuranceBracketDto,
  ) {
    return this.payrollConfigurationService.rejectConfiguration(
      'signingBonus',
      configId,
      reviewerId,
    );
  }

  @Roles(SystemRole.DEPARTMENT_HEAD, SystemRole.HR_MANAGER)
  @Patch('signing-bonuses/:configId')
  updateSigningBonus(
    @Param('configId') configId: string,
    @Body() { payload }: UpdateConfigurationDto,
  ) {
    return this.payrollConfigurationService.updateSigningBonus(
      configId,
      payload,
    );
  }

  @Roles(SystemRole.HR_MANAGER)
  @Delete('signing-bonuses/:configId')
  deleteSigningBonus(@Param('configId') configId: string) {
    return this.payrollConfigurationService.deleteConfiguration(
      'signingBonus',
      configId,
    );
  }

  // Termination and Resignation Benefits Configuration Endpoints
  @Roles(SystemRole.DEPARTMENT_HEAD, SystemRole.HR_MANAGER)
  @Post('termination-resignation-benefits')
  createTerminationResignationBenefits(@Body() payload: CreateConfigurationDto) {
    return this.payrollConfigurationService.createTerminationResignationBenefits(
      payload,
    );
  }

  @Roles(
    SystemRole.DEPARTMENT_HEAD,
    SystemRole.HR_MANAGER,
    SystemRole.SYSTEM_ADMIN,
  )
  @Get('termination-resignation-benefits')
  listTerminationResignationBenefits(@Query('status') status?: string) {
    const normalizedStatus = this.normalizeStatusFilter(status);
    return this.payrollConfigurationService.listTerminationResignationBenefits(
      normalizedStatus,
    );
  }

  @Roles(
    SystemRole.DEPARTMENT_HEAD,
    SystemRole.HR_MANAGER,
    SystemRole.SYSTEM_ADMIN,
  )
  @Get('termination-resignation-benefits/:configId')
  getTerminationResignationBenefits(@Param('configId') configId: string) {
    return this.payrollConfigurationService.getTerminationResignationBenefits(
      configId,
    );
  }

  @Roles(SystemRole.HR_MANAGER)
  @Patch('termination-resignation-benefits/:configId/approve')
  approveTerminationResignationBenefits(
    @Param('configId') configId: string,
    @Body() { approverId }: ApproveInsuranceBracketDto,
  ) {
    return this.payrollConfigurationService.approveConfiguration(
      'terminationAndResignationBenefits',
      configId,
      approverId,
    );
  }

  @Roles(SystemRole.HR_MANAGER)
  @Patch('termination-resignation-benefits/:configId/reject')
  rejectTerminationResignationBenefits(
    @Param('configId') configId: string,
    @Body() { reviewerId }: RejectInsuranceBracketDto,
  ) {
    return this.payrollConfigurationService.rejectConfiguration(
      'terminationAndResignationBenefits',
      configId,
      reviewerId,
    );
  }

  @Roles(SystemRole.DEPARTMENT_HEAD, SystemRole.HR_MANAGER)
  @Patch('termination-resignation-benefits/:configId')
  updateTerminationResignationBenefits(
    @Param('configId') configId: string,
    @Body() { payload }: UpdateConfigurationDto,
  ) {
    return this.payrollConfigurationService.updateTerminationResignationBenefits(
      configId,
      payload,
    );
  }

  @Roles(SystemRole.HR_MANAGER)
  @Delete('termination-resignation-benefits/:configId')
  deleteTerminationResignationBenefits(@Param('configId') configId: string) {
    return this.payrollConfigurationService.deleteConfiguration(
      'terminationAndResignationBenefits',
      configId,
    );
  }

  // Company-Wide Settings Configuration Endpoints
  @Roles(SystemRole.SYSTEM_ADMIN)
  @Post('company-wide-settings')
  createCompanyWideSettings(@Body() payload: CreateConfigurationDto) {
    return this.payrollConfigurationService.createCompanyWideSettings(payload);
  }

  @Roles(SystemRole.HR_MANAGER, SystemRole.SYSTEM_ADMIN)
  @Get('company-wide-settings/active')
  getActiveCompanyWideSettings() {
    return this.payrollConfigurationService.getActiveCompanyWideSettings();
  }

  @Roles(SystemRole.SYSTEM_ADMIN)
  @Get('company-wide-settings')
  listCompanyWideSettings() {
    return this.payrollConfigurationService.listCompanyWideSettings();
  }

  @Roles(SystemRole.SYSTEM_ADMIN)
  @Get('company-wide-settings/:configId')
  getCompanyWideSettings(@Param('configId') configId: string) {
    return this.payrollConfigurationService.getCompanyWideSettings(configId);
  }

  @Roles(SystemRole.SYSTEM_ADMIN)
  @Patch('company-wide-settings/:configId')
  updateCompanyWideSettings(
    @Param('configId') configId: string,
    @Body() { payload }: UpdateConfigurationDto,
  ) {
    return this.payrollConfigurationService.updateCompanyWideSettings(
      configId,
      payload,
    );
  }

  @Roles(SystemRole.SYSTEM_ADMIN)
  @Delete('company-wide-settings/:configId')
  deleteCompanyWideSettings(@Param('configId') configId: string) {
    return this.payrollConfigurationService.deleteConfiguration(
      'CompanyWideSettings',
      configId,
    );
  }

  // Tax Rules Configuration Endpoints
  @Roles(SystemRole.SYSTEM_ADMIN)
  @Post('tax-rules')
  createTaxRule(@Body() payload: CreateConfigurationDto) {
    return this.payrollConfigurationService.createTaxRule(payload);
  }

  @Roles(
    SystemRole.DEPARTMENT_EMPLOYEE,
    SystemRole.DEPARTMENT_HEAD,
    SystemRole.HR_MANAGER,
    SystemRole.SYSTEM_ADMIN,
  )
  @Get('tax-rules')
  listTaxRules(@Query('status') status?: string) {
    const normalizedStatus = this.normalizeStatusFilter(status);
    return this.payrollConfigurationService.listTaxRules(normalizedStatus);
  }

  @Roles(
    SystemRole.DEPARTMENT_EMPLOYEE,
    SystemRole.DEPARTMENT_HEAD,
    SystemRole.HR_MANAGER,
    SystemRole.SYSTEM_ADMIN,
  )
  @Get('tax-rules/:configId')
  getTaxRule(@Param('configId') configId: string) {
    return this.payrollConfigurationService.getTaxRule(configId);
  }

  @Roles(SystemRole.SYSTEM_ADMIN)
  @Patch('tax-rules/:configId/approve')
  approveTaxRule(
    @Param('configId') configId: string,
    @Body() { approverId }: ApproveInsuranceBracketDto,
  ) {
    return this.payrollConfigurationService.approveConfiguration(
      'taxRules',
      configId,
      approverId,
    );
  }

  @Roles(SystemRole.SYSTEM_ADMIN)
  @Patch('tax-rules/:configId/reject')
  rejectTaxRule(
    @Param('configId') configId: string,
    @Body() { reviewerId }: RejectInsuranceBracketDto,
  ) {
    return this.payrollConfigurationService.rejectConfiguration(
      'taxRules',
      configId,
      reviewerId,
    );
  }

  @Roles(SystemRole.SYSTEM_ADMIN)
  @Patch('tax-rules/:configId')
  updateTaxRule(
    @Param('configId') configId: string,
    @Body() { payload }: UpdateConfigurationDto,
  ) {
    return this.payrollConfigurationService.updateTaxRule(configId, payload);
  }

  @Roles(SystemRole.SYSTEM_ADMIN)
  @Delete('tax-rules/:configId')
  deleteTaxRule(@Param('configId') configId: string) {
    return this.payrollConfigurationService.deleteConfiguration(
      'taxRules',
      configId,
    );
  }

  private normalizeStatusFilter(
    rawStatus?: string,
  ): ConfigStatus | undefined {
    if (!rawStatus) {
      return undefined;
    }

    const lowerCased = rawStatus.toLowerCase();
    const allowedStatuses = Object.values(ConfigStatus);
    if (!allowedStatuses.includes(lowerCased as ConfigStatus)) {
      throw new BadRequestException(
        `Unsupported status filter "${rawStatus}". Allowed statuses: ${allowedStatuses.join(
          ', ',
        )}`,
      );
    }

    return lowerCased as ConfigStatus;
  }
}
