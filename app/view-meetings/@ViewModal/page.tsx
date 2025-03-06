"use client";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/data/components/ui/sheet";
import Button, {
	ButtonType,
} from "@/lib/component/Button";
import { ClientDto } from "@/lib/dto/Client.dto";
import { UserType } from "@/lib/dto/User.dto";
import Reschedule from "../@Reschedule/page";
import {
	MeetingStatusEnum,
	ReferalStatusEnum,
} from "@/lib/types/MeetingStatus.enum";
import RequestToReschedule from "../@RequestToReschedule/page";
import ConfirmAlert from "../@ConfirmAlert/page";
import Select from "@/lib/component/Select";
import Alert from "../@Alert/page";
import { useState } from "react";

type Props = {
	children: React.ReactNode;
	id: string;
	userType: UserType;
	data: ClientDto;
};

export default function ViewModal(
	props: Props
) {
	const [status, setStatus] =
		useState<ReferalStatusEnum>(
			ReferalStatusEnum.NONE
		);
	const { data, userType } = props;
	const displayEndorseButton = () => {
		const includedUser = [
			UserType.ADMIN,
			UserType.MCASH,
		];

		if (
			data.meetingStatus ===
			MeetingStatusEnum.DONE
		) {
			return;
		}
		if (
			includedUser.includes(userType) &&
			data.meetingBy === UserType.MCASH
		) {
			return (
				<ConfirmAlert
					id={data.id}
					meetingStatus={
						MeetingStatusEnum.ENDORSE
					}
				>
					<Button
						buttonType={
							ButtonType.OUTLINE
						}
					>
						Endorse
					</Button>
				</ConfirmAlert>
			);
		}
	};

	const displayConfirmButton = () => {
		if (
			data.meetingStatus ===
			MeetingStatusEnum.DONE
		) {
			return;
		}

		const userTypeIncluded = [
			UserType.ADMIN,
			UserType.MCASH,
			UserType.SPBD,
		];
		const meetingStatusIncluded = [
			MeetingStatusEnum.PENDING,
			MeetingStatusEnum.ENDORSE,
		];

		if (
			userType === data.meetingBy &&
			userTypeIncluded.includes(
				userType
			) &&
			meetingStatusIncluded.includes(
				data.meetingStatus
			)
		) {
			return (
				<ConfirmAlert
					meetingStatus={
						MeetingStatusEnum.CONFIRM
					}
					id={data.id}
				>
					<Button>Confirm</Button>
				</ConfirmAlert>
			);
		}
	};

	const displayButtonToReschedule =
		() => {
			const includedStatus = [
				MeetingStatusEnum.RESCHEDULE,
				MeetingStatusEnum.PENDING,
			];
			if (
				userType === UserType.RMS &&
				includedStatus.includes(
					data.meetingStatus
				)
			) {
				return (
					<div className=" flex justify-end mt-3">
						<Reschedule
							date={
								data?.meetings?.date
							}
							updatedBy={userType}
							time={
								data?.meetings?.time
							}
							id={data.id}
						>
							<Button
								className=" w-fit "
								buttonType={
									ButtonType.NEUTRAL
								}
							>
								Reschedule
							</Button>
						</Reschedule>
					</div>
				);
			}
		};

	const displayButtonToRequestToReschedule =
		() => {
			const includedStatus = [
				MeetingStatusEnum.PENDING,
				MeetingStatusEnum.ENDORSE,
			];
			if (
				data.meetingBy === userType &&
				includedStatus.includes(
					data.meetingStatus
				)
			) {
				return (
					<RequestToReschedule
						id={data.id}
					>
						<Button
							className="  "
							buttonType={
								ButtonType.NEUTRAL
							}
						>
							Request to Reschedule
						</Button>
					</RequestToReschedule>
				);
			}
		};

	const displayChangeTheStatus = () => {
		const statusOptions = Object.values(
			ReferalStatusEnum
		).filter(
			(status) =>
				status !==
				ReferalStatusEnum.NONE
		);
		if (
			data.meetingBy === userType &&
			data.meetingStatus ===
				MeetingStatusEnum.CONFIRM
		) {
			return (
				<div className=" w-[100%]">
					<Select
						onChange={(e) =>
							setStatus(
								e.target
									.value as ReferalStatusEnum
							)
						}
						value={status}
					>
						{statusOptions.map(
							(status) => (
								<option
									key={status}
									value={status}
								>
									{status.replace(
										/_/g,
										" "
									)}
								</option>
							)
						)}
					</Select>
					<Alert
						id={data.id}
						status={status}
					>
						<Button>
							Change Status
						</Button>
					</Alert>
				</div>
			);
		}
	};
	return (
		<Sheet>
			<SheetTrigger asChild>
				{props.children}
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>
						{data?.company?.name}
					</SheetTitle>
					<SheetDescription>
						{data?.company?.email}
					</SheetDescription>
				</SheetHeader>
				<div className=" border-t border-t-gray-300 my-2" />
				<p className=" font-bold">
					Company Info
				</p>
				<div className=" h-3" />
				<div className=" flex flex-col gap-2">
					<div className=" flex flex-row justify-between">
						<div>
							<p className=" text-[10px] text-grey">
								Contact Person
							</p>
							<p className=" bg-gray-50 px-3 py-1">
								{
									data?.company
										?.contactPerson
								}
							</p>
						</div>
						<div>
							<p className=" text-[10px] text-grey mt-3">
								Contact No.
							</p>
							<p className=" bg-gray-50 px-3 py-1">
								{
									data?.company
										?.contactNumber
								}
							</p>
						</div>
					</div>

					<div>
						<p className=" text-[10px] text-grey">
							Estimated No. Employee
						</p>
						<p className=" bg-gray-50 px-3 py-1">
							{
								data?.company
									?.estimatedNumberEmployee
							}{" "}
							employees
						</p>
					</div>
					<div>
						<p className=" text-[10px] text-grey">
							Client Payroll Status
						</p>
						<p className=" bg-gray-50 px-3 py-1">
							{
								data?.company
									?.payrollStatus
							}{" "}
							employees
						</p>
					</div>
					<p className=" font-semibold my-3">
						Meeting Information
					</p>
					<div className=" flex flex-row justify-between">
						<div>
							<p className=" text-[10px] text-grey">
								Meeting Date
							</p>
							<p className=" bg-gray-50 px-3 py-1">
								{data?.meetings?.date}
							</p>
						</div>
						<div>
							<p className=" text-[10px] text-grey">
								Time
							</p>
							<p className=" bg-gray-50 px-3 py-1">
								{data?.meetings?.time}
							</p>
						</div>
					</div>

					<div>
						<p className=" text-[10px] text-grey">
							Referred By
						</p>
						<p className=" bg-gray-50 px-3 py-1">
							{data?.referedBy?.email}
						</p>
					</div>
					<div>
						<p className=" text-[10px] text-grey">
							Host By
						</p>
						<p className=" bg-gray-50 px-3 py-1">
							{data?.meetingBy}
						</p>
					</div>
				</div>
				{data?.meetingStatus ===
					MeetingStatusEnum.RESCHEDULE && (
					<div className=" mt-3">
						<p className=" text-[10px] text-grey">
							Reason of request
							reschedule
						</p>
						<p className=" bg-gray-50 px-3 py-1">
							{data?.remarks}
						</p>
					</div>
				)}

				<SheetFooter className=" mt-10">
					{displayEndorseButton()}
					{displayButtonToReschedule()}
					{displayConfirmButton()}
				</SheetFooter>
				<SheetFooter className=" w-full mt-3">
					{displayButtonToRequestToReschedule()}
					{displayChangeTheStatus()}
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
