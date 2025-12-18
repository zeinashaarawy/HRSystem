/** Bank account status */
export enum BankStatus {
  VALID = 'valid',
  MISSING = 'missing',
}
/** Bonus payout status */
export enum BonusStatus {
  PENDING = 'pending',
  PAID = 'paid',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

/** Benefit payout status */
export enum BenefitStatus {
  PENDING = 'pending',
  PAID = 'paid',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

/** Payroll lifecycle status */
export enum PayRollStatus {
  DRAFT = 'draft',
  UNDER_REVIEW = 'under review',
  PENDING_FINANCE_APPROVAL = 'pending finance approval',
  REJECTED = 'rejected',
  APPROVED = 'approved',
  LOCKED = 'locked',
  UNLOCKED = 'unlocked',
}
/** Payroll payment status (PAID after finance approval) */
export enum PayRollPaymentStatus {
  PAID = 'paid',
  PENDING = 'pending',
}

/** Payslip bank payment status */
export enum PaySlipPaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
}