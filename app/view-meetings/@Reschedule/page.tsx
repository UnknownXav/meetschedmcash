"use client";

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import Button from "@/lib/component/Button";
import Input from "@/lib/component/Input";
import Select from "@/lib/component/Select";
import { meetingScheduleTemplate } from "@/lib/constant/meetingtime";
import { RescheduleMeetingDto } from "@/lib/dto/Client.dto";
import { UserType } from "@/lib/dto/User.dto";
import { rescheduleMeeting } from "@/lib/services/meeting.service";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
	children: React.ReactNode;
	date: string;
	time: string;
	updatedBy: UserType;
	id: string;
};

export default function Reschedule(
	props: Props
) {
	const [isLoading, setIsLoading] =
		useState<boolean>(false);
	const [date, setDate] =
		useState<string>(props.date);
	const [time, setTime] =
		useState<string>(props.time);
	const handleSubmit = async () => {
		try {
			setIsLoading(true);

			if (
				date === props.date &&
				time === props.time
			) {
				toast.error(
					"You doesn't change anything"
				);
				return;
			}
			const payload: RescheduleMeetingDto =
				{
					date: date,
					time: time,
					updatedBy: props.updatedBy,
				};

			const resp =
				await rescheduleMeeting(
					props.id,
					payload
				);

			if (resp) {
				window.location.reload();
				toast.success(
					"Successfully Updated"
				);
				return;
			}
		} catch (error) {
			toast.error(
				"Something went wrong"
			);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				{props.children}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						Reschedule Meeting
					</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col">
					<div className=" flex flex-col gap-4">
						<Input
							type="date"
							value={date}
							onChange={(e) =>
								setDate(e.target.value)
							}
						/>
						<Select
							value={time}
							onChange={(e) =>
								setTime(e.target.value)
							}
						>
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
					</div>
				</div>
				<DialogFooter>
					<Button
						onClick={() =>
							handleSubmit()
						}
					>
						{isLoading
							? "Loading..."
							: "Change Schedule"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
