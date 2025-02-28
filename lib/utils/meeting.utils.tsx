import { MeetingStatusEnum } from "../types/MeetingStatus.enum"

export const displayMeetingByStatus = (status: MeetingStatusEnum) => {
  if (status === MeetingStatusEnum.PENDING) {
    return "Pending"
  }

  if (status === MeetingStatusEnum.ENDORSE) {
    return "Endorse"
  }

  if (status === MeetingStatusEnum.RESCHEDULE) return "Rescheduled"
}
