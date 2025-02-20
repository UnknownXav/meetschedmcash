"use client"; 

import { saveMeeting } from "@/lib/serviceclient/meeting.service";
import { SaveMeetingType } from "@/lib/types/meeting.type";
import { useState } from "react";
import { Timestamp } from "firebase/firestore";

export default function ScheduleMeeting() {
	const [companyName, setCompanyName] = useState<string>("");
	const [contactPerson, setContactPerson] = useState<string>("");
	const [contactNumber, setContactNumber] = useState<string>("");
	const [meetingDate, setMeetingDate] = useState<string>("");
	const [meetingTime, setMeetingTime] = useState<string>("");
	const [status, setStatus] = useState<"Pending" | "Confirmed" | "Endorsed" | "Rescheduled">("Pending");
	const [payrollStatus, setPayrollStatus] = useState<"No system, payroll is computed manually and paid in cash" | "Payroll system in place, but a disbursement channel is needed for cash payroll" | "No system, but only a disbursement channel is needed for salary payments" | "others">("No system, payroll is computed manually and paid in cash");
	const [otherPayrollStatus, setOtherPayrollStatus] = useState<string>(""); // State for custom status
	const [clientEmails, setClientEmails] = useState<string>("");
	const [rmEmails, setRmEmails] = useState<string>("");

	async function handleSubmit() {
		try {
			if (!companyName || !contactPerson || !contactNumber || !meetingDate || !meetingTime) {
				alert("All fields are required");
				return;
			}

			// Use otherPayrollStatus if "Others" is selected, otherwise use the selected payrollStatus
			const finalPayrollStatus = payrollStatus === "others" ? otherPayrollStatus : payrollStatus;

			const payload: SaveMeetingType = {
                companyName: companyName,
                contactPerson: contactPerson,
                contactNumber: contactNumber,
                meetingDate: meetingDate,
                meetingTime: meetingTime,
                status: status,
                payrollStatus: payrollStatus,
                dateSubmitted: new Date().toISOString(),
                clientEmails: clientEmails,
                rmEmails: rmEmails,
                updatedAt: Timestamp.now(),
                createdBy: "sample user",
                dateCreated: undefined
            };

			const resp = await saveMeeting(payload);

			if (resp.status == 200) {
				if (confirm("Successfully added")) {
					window.location.reload();
				}
			}
		} catch (error) {
			alert("Internal server error");
		}
	}

	return (
		<div className="w-[50%] mx-auto">
			<div className="flex flex-col gap-3">
				<input
					className="p-3 border border-grey-500 w-full rounded-md"
					placeholder="Company Name"
					onChange={(e) => setCompanyName(e.target.value)}
				/>
				<input
					className="p-3 border border-grey-500 w-full rounded-md"
					placeholder="Contact Person"
					onChange={(e) => setContactPerson(e.target.value)}
				/>
				<input
					className="p-3 border border-grey-500 w-full rounded-md"
					placeholder="Contact Number"
					onChange={(e) => setContactNumber(e.target.value)}
				/>
				{/* Date input restricted to 2025 and later */}
				<input
					type="date"
					className="p-3 border border-grey-500 w-full rounded-md"
					min="2025-01-01" // Restrict date selection from 2025 onwards
					onChange={(e) => setMeetingDate(e.target.value)}
				/>
				<select
					className="p-3 border border-grey-500 w-full rounded-md"
					onChange={(e) => setMeetingTime(e.target.value)}
				>
					<option value="">Select Meeting Time</option>
					<option value="08:00-09:30">8:00 AM - 9:30 AM</option>
					<option value="09:00-10:30">9:00 AM - 10:30 AM</option>
					<option value="10:30-12:00">10:30 AM - 12:00 PM</option>
					<option value="13:00-14:30">13:00 PM - 14:30 PM</option>
					<option value="14:30-16:00">14:30 PM - 16:00 PM</option>
					<option value="16:00-17:30">16:00 PM - 17:30 PM</option>
				</select>
				
				<select
					className="p-3 border border-grey-500 w-full rounded-md"
					value={payrollStatus}
					onChange={(e) => setPayrollStatus(e.target.value as "No system, payroll is computed manually and paid in cash" | "Payroll system in place, but a disbursement channel is needed for cash payroll" | "No system, but only a disbursement channel is needed for salary payments" | "others")}
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
				
				{/* Conditionally render custom status input if "Others" is selected */}
				{payrollStatus === "others" && (
					<input
						className="p-3 border border-grey-500 w-full rounded-md"
						placeholder="Enter custom payroll status"
						onChange={(e) => setOtherPayrollStatus(e.target.value)}
					/>
				)}

				<input
					className="p-3 border border-grey-500 w-full rounded-md"
					placeholder="Client Emails"
					onChange={(e) => setClientEmails(e.target.value)}
				/>
                <p className="text-xs text-gray-500">Example: 123@gmail.com, abc@gmail.com, xyz@gmail.com</p>
				<input
					className="p-3 border border-grey-500 w-full rounded-md"
					placeholder="RM Emails"
					onChange={(e) => setRmEmails(e.target.value)}
				/>
                <p className="text-xs text-gray-500">Example: 123@gmail.com, abc@gmail.com, xyz@gmail.com</p>
				<button
					onClick={handleSubmit}
					className="p-3 bg-red-500 text-white rounded-md"
				>
					Submit
				</button>
			</div>
		</div>
	);
}
