import { MeetingStatusEnum, ReferalStatusEnum } from "../types/MeetingStatus.enum";
import { UserType } from "./User.dto"

export type CompanyDetailsDto = {
  name: string
  email: string
  contactNumber: string
  contactPerson: string
  payrollStatus: string
  estimatedNumberEmployee: number
}

export type MeetingDetailsDto = {
  date: string
  time: string
  rmsEmail: string
  clientEmail: string
}

export type ReferBy = {
  id: string
  email: string
}

export type ClientDto = {
  id: string
  referedBy: ReferBy
  company: CompanyDetailsDto
  meetings: MeetingDetailsDto
  meetingStatus: MeetingStatusEnum
  referalStatus: ReferalStatusEnum
  dateCreated: string
  meetingBy: UserType
  dateOnboarded: string | null
  dateStarted: string | null
  dateUpdate: string
  remarks: string
}

export type InsertClientDto = Omit<ClientDto, "id">

export type RescheduleMeetingDto = Pick<MeetingDetailsDto, "date" | "time"> & {
  updatedBy: UserType
}

export type RequestToReschedulePayload = Pick<ClientDto, "remarks"> 