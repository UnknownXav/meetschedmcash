"use client";
import { toast } from "sonner";
import Button, {
	ButtonType,
} from "@/lib/component/Button";
import Input from "@/lib/component/Input";
import Select from "@/lib/component/Select";
import {
	clientPayrollStatus,
	meetingScheduleTemplate,
} from "@/lib/constant/meetingtime";
import { useState } from "react";

enum InfoRoute {
	COMPANY_INFO = "COMPANY_INFO",
	MEETING_INFO = "MEETING_INFO",
}

export default function CreateClient() {
	const [companyName, setCompanyName] =
		useState<string>("");
	const [
		contactPerson,
		setContactPerson,
	] = useState<string>("");
	const [
		contactNumber,
		setContactNumber,
	] = useState<string>("");
	const [meetingDate, setMeetingDate] =
		useState<string>("");
	const [meetingTime, setMeetingTime] =
		useState<string>("");
	const [status, setStatus] = useState<
		| "Pending"
		| "Confirmed"
		| "Endorsed"
		| "Rescheduled"
	>("Pending");
	const [
		payrollStatus,
		setPayrollStatus,
	] = useState<string>(
		"No system, payroll is computed manually and paid in cash"
	);
	const [
		otherPayrollStatus,
		setOtherPayrollStatus,
	] = useState<string>(""); // State for custom status
	const [
		clientEmails,
		setClientEmails,
	] = useState<string>("");
	const [rmEmails, setRmEmails] =
		useState<string>("");

	const [infoRoute, setInfoRoute] =
		useState<InfoRoute>(
			InfoRoute.COMPANY_INFO
		);

	function handleConfirm() {
		toast("test");
	}

	return (
		<div className="flex justify-center mt-10 mb-19">
			<div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6 text-center">
					Schedule a Virtual Demo
				</h2>
				{infoRoute ===
					InfoRoute.COMPANY_INFO && (
					<div className="flex flex-col gap-4">
						<h1 className=" text-lg font-semibold">
							Company Information
						</h1>
						<Input
							className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-300"
							placeholder="Company Name"
							onChange={(e) =>
								setCompanyName(
									e.target.value
								)
							}
						/>
						<Select
							className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-50"
							value={payrollStatus}
							onChange={(e) => {
								setPayrollStatus(
									e.target.value
								);
							}}
						>
							{clientPayrollStatus.map(
								(val) => {
									return (
										<option
											key={val.label}
											value={val.value}
										>
											{val.label}
										</option>
									);
								}
							)}
						</Select>

						{payrollStatus.toLowerCase() ===
							"others" && (
							<Input
								className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-300"
								placeholder="Enter custom payroll status"
								onChange={(e) => {
									console.log(
										e.target.value
									);
									setOtherPayrollStatus(
										e.target.value
									);
								}}
							/>
						)}

						<Input
							className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-300"
							placeholder="Contact Person"
							onChange={(e) =>
								setContactPerson(
									e.target.value
								)
							}
						/>
						<Input
							className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-300"
							placeholder="Contact Number"
							onChange={(e) =>
								setContactNumber(
									e.target.value
								)
							}
						/>
						<Button
							className="  w-fit self-end"
							onClick={() =>
								setInfoRoute(
									InfoRoute.MEETING_INFO
								)
							}
						>
							Next
						</Button>
					</div>
				)}
				{infoRoute ===
					InfoRoute.MEETING_INFO && (
					<div className="flex flex-col gap-4">
						<h1 className=" text-lg font-semibold mt-3">
							Meeting Schedule
						</h1>
						<Input
							type="date"
							className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-300"
							min="2025-01-01"
							onChange={(e) =>
								setMeetingDate(
									e.target.value
								)
							}
						/>
						<Select
							className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-300"
							onChange={(e) =>
								setMeetingTime(
									e.target.value
								)
							}
						>
							<option value="">
								Select Meeting Time
							</option>
							{meetingScheduleTemplate.map(
								(val) => {
									return (
										<option
											value={val.value}
										>
											{val.label}
										</option>
									);
								}
							)}
						</Select>

						<Input
							className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-300"
							placeholder="Client Team Members' Email Addresses joining the meeting"
							onChange={(e) =>
								setClientEmails(
									e.target.value
								)
							}
						/>
						<p className="text-xs text-gray-700">
							Example: 123@gmail.com,
							abc@gmail.com,
							xyz@gmail.com
						</p>
						<Input
							className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-300"
							placeholder="RMs/AMs Team Members' Email Addresses joining the meeting"
							onChange={(e) =>
								setRmEmails(
									e.target.value
								)
							}
						/>
						<p className="text-xs text-gray-700">
							Example: 123@gmail.com,
							abc@gmail.com,
							xyz@gmail.com
						</p>
						<div className=" w-full flex flex-row justify-between">
							<button className=""></button>
						</div>
						{/* <button
						onClick={() => {
							setIsClicked(true); // Set clicked state to true
							handleSubmit();
						}}
						className={`p-3 rounded-md text-white transition-all 
                  ${
										isClicked
											? "bg-red-600"
											: "bg-red-500 hover:bg-red-100"
									}`}
					>
						Submit
					</button>*/}
						<div className=" flex flex-row w-full justify-between">
							<Button
								buttonType={
									ButtonType.OUTLINE
								}
								onClick={() =>
									setInfoRoute(
										InfoRoute.COMPANY_INFO
									)
								}
							>
								Back
							</Button>
							<Button
								onClick={() =>
									handleConfirm()
								}
							>
								Submit
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
