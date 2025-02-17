
import { Timestamp } from "firebase/firestore";

export type UserRole = "McashDivision" | "SpbdDivision" | "RegionalManager";

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  name?: string;
  active: boolean;
  createdAt: Timestamp;
  lastLogin?: Timestamp;
  createdBy?: string;
  
}

export interface ClientAccount {
  id: string;
  username: string;
  password: string;
  email: string;
  companyName: string;
  dateCreated: string;
  active: boolean;
  lastLogin?: string;
  createdBy: string;
}

export interface Meeting {
  id: string
  companyName: string
  contactPerson: string
  contactNumber: string
  meetingDate: string
  meetingTime: string
  meetingTimeOption2?: string
  status: "Pending" | "Confirmed" | "Endorsed" | "Rescheduled"
  payrollStatus: "No system; payroll is computed manually and paid in cash" | "Payroll system in place, but a disbursement channel is needed for cash payroll" | "No system, but only a disbursement channel is needed for salary payments" | "others"
  dateSubmitted: string
  clientEmails: string
  rmEmails: string
  createdAt: Timestamp
  updatedAt: Timestamp
  createdBy: string
  notes?: string
}

export interface Referral {
  id: string;
  referrerId: string;
  referredUserId: string;
  status: string;
  dateStarted?: string;
  companyName: string;
  dateOnboarded: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}
