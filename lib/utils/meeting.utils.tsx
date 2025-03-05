import {
	MeetingStatusEnum,
	ReferalStatusEnum,
} from "../types/MeetingStatus.enum";

export const displayMeetingByStatus = (
	status: MeetingStatusEnum
) => {
	if (
		status === MeetingStatusEnum.PENDING
	) {
		return "Pending";
	}

	if (
		status === MeetingStatusEnum.ENDORSE
	) {
		return "Endorsed";
	}

	if (
		status ===
		MeetingStatusEnum.RESCHEDULE
	)
		return "Rescheduled";

	if (
		status === MeetingStatusEnum.CONFIRM
	)
		return "Confirmed";
};

export const displayReferalStatus = (
	status: ReferalStatusEnum
) => {
	if (
		status === ReferalStatusEnum.ACTIVE
	) {
		return "Active";
	}

	if (
		status ===
		ReferalStatusEnum.FOR_PAYROLL_ACCOUNT_ENROLLMENT
	) {
		return "For payroll account enrollment";
	}

	if (
		status ===
		ReferalStatusEnum.FULLY_COMPLIANT
	) {
		return "Fully compliant";
	}

	if (
		status ===
		ReferalStatusEnum.ONBOARDED
	) {
		return "Onboarded";
	}

	if (
		status ===
		ReferalStatusEnum.SYSTEM_USER
	) {
		return "System User";
	}
};
