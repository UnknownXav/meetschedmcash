export enum MeetingStatusEnum{
    PENDING = "PENDING",
    CONFIRM = "CONFIRM",
    ENDORSE = "ENDORSE",
    RESCHEDULE='RESCHEDULE',
    DONE='DONE'
}

export enum ReferalStatusEnum {
  NONE = "NONE",
  FOR_PAYROLL_ACCOUNT_ENROLLMENT = "FOR_PAYROLL_ACCOUNT_ENROLLMENT",
  ONBOARDED = "ONBOARDED",
  ACTIVE = "ACTIVE",
  SYSTEM_USER = "SYSTEM_USER",
  FULLY_COMPLIANT = "FULLY_COMPLIANT",
  OTHERS = "OTHERS",
}

export const ReferalStatusColors: Record<ReferalStatusEnum, string> = {
  [ReferalStatusEnum.NONE]: "#808080", // Gray
  [ReferalStatusEnum.FOR_PAYROLL_ACCOUNT_ENROLLMENT]: "#FF9900", // Orange
  [ReferalStatusEnum.ONBOARDED]: "#4CAF50", // Green
  [ReferalStatusEnum.ACTIVE]: "#0088CC", // Blue
  [ReferalStatusEnum.SYSTEM_USER]: "#6A0DAD", // Purple
  [ReferalStatusEnum.FULLY_COMPLIANT]: "#FFD700", // Gold
  [ReferalStatusEnum.OTHERS]: "#D32F2F", // Red
};
