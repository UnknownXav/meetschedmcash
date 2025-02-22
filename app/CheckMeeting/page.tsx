import { getAllMeeting } from "@/lib/serviceclient/meeting.service"; 
import ScheduleMeeting from "../ScheduleMeeting/page"; 

export default async function Meeting() {
  const resp = await getAllMeeting();

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-center my-6">Meeting Schedule</h1>
      <div className="flex flex-col justify-center">
        {resp.map((val) => (
          <div key={val.id} className="bg-white shadow-md rounded-lg p-6 my-4 border border-gray-300 w-[50%] mx-auto">
            <h2 className="text-lg font-semibold mb-2">Company Name: {val.companyName}</h2>
            <p className="text-sm">Contact Person: {val.contactPerson}</p>
            <p className="text-sm">Contact Number: {val.contactNumber}</p>
            <p className="text-sm">Meeting Date: {val.meetingDate}</p>
            <p className="text-sm">Meeting Time: {val.meetingTime}</p>
            <p className="text-sm">Status: {val.status}</p>
            <p className="text-sm">
              Payroll Status:{" "}
              {val.payrollStatus === "others" ? val.payrollStatus : val.payrollStatus}
              {/* Display the custom payroll status if "Others" is selected */}
            </p>
            <p className="text-sm">
              Client Team Members' Email Addresses joining the meeting: {val.clientEmails}
            </p>
            <p className="text-sm">
              RM/AM Team Members' Email Addresses joining the meeting: {val.rmEmails}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
