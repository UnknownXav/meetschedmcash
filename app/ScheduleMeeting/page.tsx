"use client";

import { saveMeeting } from "@/lib/serviceclient/meeting.service";
import { SaveMeetingType } from "@/lib/types/meeting.type";
import { ArrowLeft } from "lucide-react";
// Import the correct Button from your UI components, not react-day-picker
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ScheduleMeeting() {
  const [companyName, setCompanyName] = useState<string>("");
  const [contactPerson, setContactPerson] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [meetingDate, setMeetingDate] = useState<string>("");
  const [meetingTime, setMeetingTime] = useState<string>("");
  const [status, setStatus] = useState<"Pending" | "Confirmed" | "Endorsed" | "Rescheduled">("Pending");
  const [payrollStatus, setPayrollStatus] = useState<
    | "No system, payroll is computed manually and paid in cash"
    | "Payroll system in place, but a disbursement channel is needed for cash payroll"
    | "No system, but only a disbursement channel is needed for salary payments"
    | "others"
  >("No system, payroll is computed manually and paid in cash");
  const [otherPayrollStatus, setOtherPayrollStatus] = useState<string>("");
  const [clientEmails, setClientEmails] = useState<string>("");
  const [rmEmails, setRmEmails] = useState<string>("");
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const router = useRouter();

  async function handleSubmit() {
    try {
      if (!companyName || !contactPerson || !contactNumber || !meetingDate || !meetingTime) {
        alert("All fields are required");
        return;
      }

      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');  // Ensures two digits (e.g., '02')
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');  // Month (0-11), +1 for 1-12, ensures two digits
      const year = currentDate.getFullYear();  // Full year (e.g., 2025)

      const formattedDate = `${day}-${month}-${year}`;
      const payload: SaveMeetingType = {
        companyName: companyName,
        contactPerson: contactPerson,
        contactNumber: contactNumber,
        meetingDate: meetingDate,
        meetingTime: meetingTime,
        status: status,
        payrollStatus: payrollStatus,
        dateSubmitted: formattedDate,
        clientEmails: clientEmails,
        rmEmails: rmEmails,
        toLowerCase: function (): unknown {
          throw new Error("Function not implemented.");
        }
      };

      const resp = await saveMeeting(payload);

      if (resp.status === 200) {
        if (confirm("Successfully added")) {
          window.location.reload();
        }
      }
    } catch (error) {
      alert("Internal server error");
    }
  }

  return (
    <div className="flex bg-white-200 justify-center mt-10">
      
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
      <Button
        variant="outline"
        onClick={() => router.push("/dashboard")}
        className="mb-4 flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Back
      </Button>
        <h2 className="text-2xl font-bold mb-6 text-center">Schedule a Virtual Demo</h2>
        <div className="flex flex-col gap-4">
          <input
            className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-300"
            placeholder="Company Name"
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <select
            className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-300"
            value={payrollStatus}
            onChange={(e) =>
              setPayrollStatus(
                e.target.value as
                  | "No system, payroll is computed manually and paid in cash"
                  | "Payroll system in place, but a disbursement channel is needed for cash payroll"
                  | "No system, but only a disbursement channel is needed for salary payments"
                  | "others"
              )
            }
          >
            <option value="No system, payroll is computed manually and paid in cash">
              No system, payroll is computed manually and paid in cash
            </option>
            <option value="Payroll system in place, but a disbursement channel is needed for cash payroll">
              Payroll system in place, but a disbursement channel is needed for cash payroll
            </option>
            <option value="No system, but only a disbursement channel is needed for salary payments">
              No system, but only a disbursement channel is needed for salary payments
            </option>
            <option value="others">Others</option>
          </select>

          {payrollStatus === "others" && (
            <input
              className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-300"
              placeholder="Enter custom payroll status"
              onChange={(e) => setOtherPayrollStatus(e.target.value)}
            />
          )}

          <input
            className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-300"
            placeholder="Contact Person"
            onChange={(e) => setContactPerson(e.target.value)}
          />
          <input
            className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-300"
            placeholder="Contact Number"
            onChange={(e) => setContactNumber(e.target.value)}
          />
          <input
            type="date"
            className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-300"
            min="2025-01-01"
            onChange={(e) => setMeetingDate(e.target.value)}
          />
          <select
            className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-300"
            onChange={(e) => setMeetingTime(e.target.value)}
          >
            <option value="">Select Meeting Time</option>
            <option value="08:00-09:30">8:00 AM - 9:30 AM</option>
            <option value="09:00-10:30">9:00 AM - 10:30 AM</option>
            <option value="10:30-12:00">10:30 AM - 12:00 PM</option>
            <option value="13:00-14:30">1:00 PM - 2:30 PM</option>
            <option value="14:30-16:00">2:30 PM - 4:00 PM</option>
            <option value="16:00-17:30">4:00 PM - 5:30 PM</option>
          </select>

          <input
            className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-300"
            placeholder="Client Team Members' Email Addresses joining the meeting"
            onChange={(e) => setClientEmails(e.target.value)}
          />
          <p className="text-xs text-gray-700">
            Example: 123@gmail.com, abc@gmail.com, xyz@gmail.com
          </p>
          <input
            className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-300"
            placeholder="RMs/AMs Team Members' Email Addresses joining the meeting"
            onChange={(e) => setRmEmails(e.target.value)}
          />
          <p className="text-xs text-gray-700">
            Example: 123@gmail.com, abc@gmail.com, xyz@gmail.com
          </p>
          <button
            onClick={() => {
              setIsClicked(true);
              handleSubmit();
            }}
            className={`p-3 rounded-md text-white transition-all ${
              isClicked ? "bg-red-600" : "bg-red-500 hover:bg-red-100"
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}