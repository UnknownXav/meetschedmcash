"use client";
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
import { z } from "zod";
import { companyInfoSchema } from "./_lib/schema/companyInfo.schema";
import { meetingInfoSchema } from "./_lib/schema/meetingInfo.schema";
import { InsertClientDto } from "@/lib/dto/Client.dto";
import {
	MeetingStatusEnum,
	ReferalStatusEnum,
} from "@/lib/types/MeetingStatus.enum";
import { UserType } from "@/lib/dto/User.dto";
import { saveClient } from "@/lib/services/client.service";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

enum InfoRoute {
	COMPANY_INFO = "COMPANY_INFO",
	MEETING_INFO = "MEETING_INFO",
}

type CompanyInfoData = z.infer<
	typeof companyInfoSchema
>;

type MeetingInfoData = z.infer<
	typeof meetingInfoSchema
>;

export default function CreateClient() {
	const [infoRoute, setInfoRoute] =
		useState<InfoRoute>(
			InfoRoute.COMPANY_INFO
		);
	const [isLoading, setIsLoading] =
		useState<boolean>(false);
	const [companyInfo, setCompanyInfo] =
		useState<CompanyInfoData>({
			companyName: "",
			payrollStatus: "",
			payrollStatusOthers:
				clientPayrollStatus[0].value,
			contactNumber: "",
			contactPerson: "",
			email: "",
			estimatedNumberOfEmployee: 0,
		});

	const [meetingInfo, setMeetingInfo] =
		useState<MeetingInfoData>({
			meetingDate: "",
			meetingTime: "",
			clientEmail: "",
			rms: "",
		});

	const [errors, setErrors] = useState<
		Partial<
			Record<
				keyof CompanyInfoData,
				string
			>
		>
	>({});

	const [
		meetingError,
		setMeetingErros,
	] = useState<
		Partial<
			Record<
				keyof MeetingInfoData,
				string
			>
		>
	>({});

	const handleCompanyChangeInfo = (
		field: keyof CompanyInfoData,
		value: string | number
	) => {
		// Update form state first
		setCompanyInfo((prev) => {
			const updatedForm = {
				...prev,
				[field]: value,
			};

			// Validate using the updated form state
			const result =
				companyInfoSchema.safeParse(
					updatedForm
				);

			if (!result.success) {
				const issue =
					result.error.format();
				setErrors({
					companyName:
						issue.companyName
							?._errors?.[0] || "",
					payrollStatus:
						issue.payrollStatus
							?._errors?.[0] || "",
					payrollStatusOthers:
						issue.payrollStatusOthers
							?._errors?.[0] || "",
					contactNumber:
						issue.contactNumber
							?._errors?.[0] || "",
					contactPerson:
						issue.contactPerson
							?._errors?.[0] || "",
					email:
						issue.email?._errors?.[0] ||
						"",
					estimatedNumberOfEmployee:
						issue?._errors?.[0] || "",
				});
			} else {
				setErrors({});
			}

			return updatedForm;
		});
	};

	const handleChangeMeetingInfo = (
		field: keyof MeetingInfoData,
		value: string
	) => {
		setMeetingInfo((prev) => {
			const updateForm = {
				...prev,
				[field]: value,
			};

			const result =
				meetingInfoSchema.safeParse(
					updateForm
				);

			if (!result.success) {
				const issue =
					result.error.format();
				setMeetingErros({
					meetingDate:
						issue.meetingDate
							?._errors?.[0] || "",
					meetingTime:
						issue?.meetingTime
							?._errors?.[0] || "",
					clientEmail:
						issue?.clientEmail
							?._errors?.[0] || "",
					rms:
						issue?.rms?._errors?.[0] ||
						"",
				});
			} else {
				setMeetingErros({});
			}

			return updateForm;
		});
	};

	function handleNext() {
		const result =
			companyInfoSchema.safeParse(
				companyInfo
			);
		console.log(result);
		if (!result.success) {
			const issue =
				result.error.format();
			console.log(issue);
			setErrors({
				companyName:
					issue.companyName
						?._errors?.[0] || "",
				payrollStatus:
					issue.payrollStatus
						?._errors?.[0] || "",
				payrollStatusOthers:
					issue.payrollStatusOthers
						?._errors?.[0] || "",
				contactNumber:
					issue.contactNumber
						?._errors?.[0] || "",
				contactPerson:
					issue.contactPerson
						?._errors?.[0] || "",
				email:
					issue.email?._errors?.[0] ||
					"",
				estimatedNumberOfEmployee:
					issue?._errors?.[0] || "",
			});
			return;
		}

		setInfoRoute(
			InfoRoute.MEETING_INFO
		);
	}

	async function handleConfirm() {
		const result = meetingInfoSchema.safeParse(meetingInfo);

		if (!result.success) {
			const issue = result.error.format();
			setMeetingErros({
				meetingDate: issue.meetingDate?._errors?.[0] || "",
				meetingTime: issue.meetingTime?._errors?.[0] || "",
				clientEmail: issue.clientEmail?._errors?.[0] || "",
				rms: issue.rms?._errors?.[0] || "",
			});
			return;
		}

		try {
			setIsLoading(true);
			const time =
				meetingScheduleTemplate
					.slice(0, 1)
					.map((val) => val.value);
			const meetingBy = time.includes(
				meetingInfo.meetingTime
			)
				? UserType.SPBD
				: UserType.MCASH;
			const payload: InsertClientDto = {
				company: {
					name: companyInfo.companyName,
					email: companyInfo.email,
					contactNumber: companyInfo.contactNumber,
					contactPerson: companyInfo.contactPerson,
					payrollStatus: companyInfo.payrollStatus,
					estimatedNumberEmployee: companyInfo.estimatedNumberOfEmployee,
				},
				meetings: {
					date: meetingInfo.meetingDate,
					time: meetingInfo.meetingTime,
					rmsEmail: meetingInfo.rms,
					clientEmail: meetingInfo.clientEmail,
				},
				meetingStatus: MeetingStatusEnum.PENDING,
				referalStatus: ReferalStatusEnum.NONE,
				dateCreated: new Date().toISOString(),
				dateUpdate: new Date().toISOString(),
				dateOnboarded: null,
				dateStarted: null,
				referedBy: {
					id: "1234",
					email: "rmsample@gmail.com",
				},
				meetingBy: meetingBy,
				remarks: "",
				enrolledEmployees: 0
			};

			const resp = await saveClient(
				payload
			);

			if (resp) {
				toast.success(
					"Successfully Added"
				);
				setCompanyInfo({
					companyName: "",
					payrollStatus: "",
					payrollStatusOthers: "",
					contactNumber: "",
					contactPerson: "",
					email: "",
					estimatedNumberOfEmployee: 0,
				});
				setMeetingInfo({
					meetingDate: "",
					meetingTime: "",
					clientEmail: "",
					rms: "",
				});
				setInfoRoute(
					InfoRoute.COMPANY_INFO
				);
				return;
			} else {
				toast.error(
					"Something went wrong"
				);
			}
		} catch (error) {
			toast.error(
				"Something went wrong"
			);
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<div className="flex justify-center mt-10 mb-19">
			<div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
				<div className=" flex  items-center  flex-row justify-between mb-6">
					<Link href="/dashboard">
						<ChevronLeft size={20} />
					</Link>

					<h2 className="text-xl font-bold  text-center">
						Schedule a Virtual Demo
					</h2>
					<div className=" w-[18px]" />
				</div>

				{infoRoute ===
					InfoRoute.COMPANY_INFO && (
					<div className="flex flex-col gap-4 w-full">
						<h1 className=" text-lg font-semibold">
							Company Information
						</h1>
						<Input
							className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-300"
							placeholder="Company Name"
							value={
								companyInfo.companyName
							}
							onChange={(e) =>
								handleCompanyChangeInfo(
									"companyName",
									e.target.value
								)
							}
							error={errors.companyName}
						/>
						<Input
							className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-300"
							placeholder="Email"
							value={companyInfo.email}
							onChange={(e) =>
								handleCompanyChangeInfo(
									"email",
									e.target.value
								)
							}
							error={errors.email}
						/>

						<Select
							className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-50"
							value={
								companyInfo.payrollStatus
							}
							onChange={(e) => {
								handleCompanyChangeInfo(
									"payrollStatus",
									e.target.value
								);
							}}
							error={
								errors.payrollStatus
							}
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
						{companyInfo.payrollStatus.toLowerCase() ===
							"others" && (
							<Input
								className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-300"
								placeholder="Enter custom payroll status"
								value={
									companyInfo.payrollStatusOthers
								}
								onChange={(e) => {
									handleCompanyChangeInfo(
										"payrollStatusOthers",
										e.target.value
									);
								}}
								error={
									errors.payrollStatusOthers
								}
							/>
						)}
						<Input
							className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-300"
							placeholder="Number of employee"
							value={
								companyInfo.estimatedNumberOfEmployee
							}
							onChange={(e) =>
								handleCompanyChangeInfo(
									"estimatedNumberOfEmployee",
									Number(e.target.value)
								)
							}
							error={
								errors.estimatedNumberOfEmployee
							}
						/>
						<Input
							className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-300"
							placeholder="Contact Person"
							value={
								companyInfo.contactPerson
							}
							onChange={(e) =>
								handleCompanyChangeInfo(
									"contactPerson",
									e.target.value
								)
							}
							error={
								errors.contactPerson
							}
						/>
						<Input
							className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-300"
							placeholder="Contact Number"
							value={
								companyInfo.contactNumber
							}
							onChange={(e) =>
								handleCompanyChangeInfo(
									"contactNumber",
									e.target.value
								)
							}
							error={
								errors.contactNumber
							}
						/>
						<Button
							className="  w-fit self-end"
							onClick={() =>
								handleNext()
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
							value={
								meetingInfo.meetingDate
							}
							onChange={(e) =>
								handleChangeMeetingInfo(
									"meetingDate",
									e.target.value
								)
							}
							error={
								meetingError.meetingDate
							}
						/>
						<Select
							className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-300"
							value={
								meetingInfo.meetingTime
							}
							onChange={(e) =>
								handleChangeMeetingInfo(
									"meetingTime",
									e.target.value
								)
							}
							error={
								meetingError.meetingTime
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
							value={
								meetingInfo.clientEmail
							}
							onChange={(e) =>
								handleChangeMeetingInfo(
									"clientEmail",
									e.target.value
								)
							}
							error={
								meetingError.clientEmail
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
							value={meetingInfo.rms}
							onChange={(e) =>
								handleChangeMeetingInfo(
									"rms",
									e.target.value
								)
							}
							error={meetingError.rms}
						/>
						<p className="text-xs text-gray-700">
							Example: 123@gmail.com,
							abc@gmail.com,
							xyz@gmail.com
						</p>

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
								disabled={isLoading}
								onClick={() =>
									handleConfirm()
								}
							>
								{isLoading
									? "Loading"
									: "Submit"}
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
