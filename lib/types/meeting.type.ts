import { Timestamp } from "firebase/firestore"

export type MeetingType = {
  id: string;
  companyName: string;
  contactPerson: string;
  contactNumber: string;
  meetingDate: string;
  meetingTime: string;
  status: "Pending" | "Confirmed" | "Endorsed" | "Rescheduled";
  payrollStatus: "No system, payroll is computed manually and paid in cash" | "Payroll system in place, but a disbursement channel is needed for cash payroll" | "No system, but only a disbursement channel is needed for salary payments" | "others";
  dateSubmitted: string;
  clientEmails: string;
  rmEmails: string;

}


export type SaveMeetingType = Omit<MeetingType,'id'>;

export type GetMeetingResponse = MeetingType;