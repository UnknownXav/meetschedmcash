import { MeetingStatusEnum } from "../types/MeetingStatus.enum";

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
