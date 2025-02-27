import { MeetingStatusEnum, ReferalStatusEnum } from "../types/MeetingStatus.enum";

export type CompanyDetailsDto = {
    name:string;
    email:string;
    contactNumber:string;
    contactPerson:string;
    payrollStatus:string;
}

export type MeetingDetailsDto = {
    date:string;
    time:string;
}

export type ClientDto = {
    id:string;
    rmEmail:string;
    company:CompanyDetailsDto;
    meetings:MeetingDetailsDto;
    meetingStatus:MeetingStatusEnum;
    referalStatus:ReferalStatusEnum;
    dateCreated:string;
    dateOnboarded:string | null;
    dateStarted:string | null;
}